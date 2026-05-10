import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Flag, Play, Square, Trophy, ChevronDown, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import RacerManager from './RacerManager';

const defaultRace = {
  title: '', track_name: '', race_type: 'stock_car', status: 'upcoming',
  scheduled_start: '', betting_opens: '', betting_closes: '', description: '', featured: false,
};

export default function RaceManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingRace, setEditingRace] = useState(null);
  const [form, setForm] = useState(defaultRace);
  const [expandedRace, setExpandedRace] = useState(null);
  const queryClient = useQueryClient();

  const { data: races = [], isLoading } = useQuery({
    queryKey: ['admin-races'],
    queryFn: () => base44.entities.Race.list('-created_date', 100),
  });

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      if (editingRace) {
        await base44.entities.Race.update(editingRace.id, data);
      } else {
        await base44.entities.Race.create(data);
      }
    },
    onSuccess: () => {
      toast.success(editingRace ? 'Race updated' : 'Race created');
      queryClient.invalidateQueries({ queryKey: ['admin-races'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Race.delete(id),
    onSuccess: () => {
      toast.success('Race deleted');
      queryClient.invalidateQueries({ queryKey: ['admin-races'] });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Race.update(id, { status }),
    onSuccess: () => {
      toast.success('Race status updated');
      queryClient.invalidateQueries({ queryKey: ['admin-races'] });
    },
  });

  const resetForm = () => {
    setForm(defaultRace);
    setEditingRace(null);
    setShowForm(false);
  };

  const handleEdit = (race) => {
    setForm({
      title: race.title || '',
      track_name: race.track_name || '',
      race_type: race.race_type || 'stock_car',
      status: race.status || 'upcoming',
      scheduled_start: race.scheduled_start || '',
      betting_opens: race.betting_opens || '',
      betting_closes: race.betting_closes || '',
      description: race.description || '',
      featured: race.featured || false,
    });
    setEditingRace(race);
    setShowForm(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-heading font-bold text-foreground">Manage Races</h2>
        <Dialog open={showForm} onOpenChange={(open) => { if (!open) resetForm(); setShowForm(open); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 font-heading gap-1">
              <Plus className="w-4 h-4" /> New Race
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">{editingRace ? 'Edit Race' : 'Create Race'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div>
                <Label>Track Name</Label>
                <Input value={form.track_name} onChange={e => setForm({ ...form, track_name: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Race Type</Label>
                  <Select value={form.race_type} onValueChange={v => setForm({ ...form, race_type: v })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[
                        ['outlaw_super_late_model', 'Outlaw Super Late Model'],
                        ['pro_late_model', 'Pro Late Model'],
                        ['modified', 'Modified'],
                        ['b_modified', 'B Modified'],
                        ['c_modified', 'C Modified'],
                        ['winged_sprint', 'Winged Sprint'],
                        ['non_wing_sprint', '500 Sprint (Non-Wing)'],
                        ['late_model_sportsman', 'Late Model Sportsman'],
                        ['truck_series', 'Truck Series'],
                        ['street_stock', 'Street Stock'],
                        ['pure_stock', 'Pure Stock'],
                        ['sport_compact_a', 'Sport Compact A'],
                        ['sport_compact_b', 'Sport Compact B'],
                        ['sport_compact_c', 'Sport Compact C'],
                        ['mini_wedge', 'Mini Wedge'],
                        ['dwarf_car', 'Dwarf Car'],
                        ['figure_8', 'Figure 8'],
                        ['destruction_overload', 'Destruction Overload'],
                      ].map(([val, label]) => (
                        <SelectItem key={val} value={val}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                    <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['upcoming', 'betting_open', 'betting_closed', 'live', 'finished', 'cancelled'].map(s => (
                        <SelectItem key={s} value={s}>{s.replace(/_/g, ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Scheduled Start</Label>
                <Input type="datetime-local" value={form.scheduled_start?.slice(0, 16)} onChange={e => setForm({ ...form, scheduled_start: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Betting Opens</Label>
                  <Input type="datetime-local" value={form.betting_opens?.slice(0, 16)} onChange={e => setForm({ ...form, betting_opens: e.target.value })} className="bg-secondary border-border" />
                </div>
                <div>
                  <Label>Betting Closes</Label>
                  <Input type="datetime-local" value={form.betting_closes?.slice(0, 16)} onChange={e => setForm({ ...form, betting_closes: e.target.value })} className="bg-secondary border-border" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                <Label>Featured Race</Label>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-heading" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving...' : editingRace ? 'Update Race' : 'Create Race'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Race List */}
      <div className="space-y-3">
        {races.map(race => (
          <Collapsible key={race.id} open={expandedRace === race.id} onOpenChange={(open) => setExpandedRace(open ? race.id : null)}>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Flag className="w-4 h-4 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-foreground text-sm truncate">{race.title}</p>
                    <p className="text-xs text-muted-foreground">{race.track_name} · {race.scheduled_start ? format(new Date(race.scheduled_start), 'MMM d, h:mm a') : 'TBD'}</p>
                  </div>
                  <Badge className={cn("border-0 text-[10px] shrink-0",
                    race.status === 'live' ? 'bg-primary/20 text-primary' :
                    race.status === 'betting_open' ? 'bg-accent/20 text-accent' :
                    'bg-muted text-muted-foreground'
                  )}>
                    {race.status?.replace(/_/g, ' ')}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(race)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMutation.mutate(race.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className={cn("w-4 h-4 transition-transform", expandedRace === race.id && "rotate-180")} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>

              <CollapsibleContent>
                <div className="border-t border-border p-4 space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" onClick={() => statusMutation.mutate({ id: race.id, status: 'betting_open' })} className="gap-1 text-accent border-accent/30">
                      <Play className="w-3 h-3" /> Open Betting
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => statusMutation.mutate({ id: race.id, status: 'live' })} className="gap-1 text-primary border-primary/30">
                      <Flag className="w-3 h-3" /> Start Race
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => statusMutation.mutate({ id: race.id, status: 'betting_closed' })} className="gap-1">
                      <Square className="w-3 h-3" /> Close Betting
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => statusMutation.mutate({ id: race.id, status: 'finished' })} className="gap-1 text-chart-3 border-chart-3/30">
                      <Trophy className="w-3 h-3" /> Finish Race
                    </Button>
                  </div>
                  <RacerManager raceId={race.id} />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
        {races.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <Flag className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No races created yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
