import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, User, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function RacerManager({ raceId }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', number: '', odds: '+200', odds_decimal: 3, team: '' });
  const queryClient = useQueryClient();

  const { data: racers = [] } = useQuery({
    queryKey: ['admin-racers', raceId],
    queryFn: () => base44.entities.Racer.filter({ race_id: raceId }),
  });

  const addMutation = useMutation({
    mutationFn: (data) => base44.entities.Racer.create({ ...data, race_id: raceId }),
    onSuccess: () => {
      toast.success('Racer added');
      queryClient.invalidateQueries({ queryKey: ['admin-racers', raceId] });
      setForm({ name: '', number: '', odds: '+200', odds_decimal: 3, team: '' });
      setShowAdd(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Racer.delete(id),
    onSuccess: () => {
      toast.success('Racer removed');
      queryClient.invalidateQueries({ queryKey: ['admin-racers', raceId] });
    },
  });

  const updateOddsMutation = useMutation({
    mutationFn: ({ id, odds, odds_decimal }) => base44.entities.Racer.update(id, { odds, odds_decimal }),
    onSuccess: () => {
      toast.success('Odds updated');
      queryClient.invalidateQueries({ queryKey: ['admin-racers', raceId] });
    },
  });

  const handlePhotoUpload = async (racerId, file) => {
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    await base44.entities.Racer.update(racerId, { photo: file_url });
    queryClient.invalidateQueries({ queryKey: ['admin-racers', raceId] });
    toast.success('Photo uploaded');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-heading font-semibold text-foreground">Racers ({racers.length})</h4>
        <Button size="sm" variant="outline" onClick={() => setShowAdd(!showAdd)} className="gap-1 text-xs">
          <Plus className="w-3 h-3" /> Add Racer
        </Button>
      </div>

      {showAdd && (
        <form onSubmit={(e) => { e.preventDefault(); addMutation.mutate(form); }} className="bg-secondary rounded-lg p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-muted border-border text-sm h-8" />
            <Input placeholder="#Number" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} className="bg-muted border-border text-sm h-8" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="Odds (+200)" value={form.odds} onChange={e => setForm({ ...form, odds: e.target.value })} className="bg-muted border-border text-sm h-8" />
            <Input type="number" step="0.1" placeholder="Decimal odds" value={form.odds_decimal} onChange={e => setForm({ ...form, odds_decimal: Number(e.target.value) })} className="bg-muted border-border text-sm h-8" />
            <Input placeholder="Team" value={form.team} onChange={e => setForm({ ...form, team: e.target.value })} className="bg-muted border-border text-sm h-8" />
          </div>
          <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-xs" disabled={addMutation.isPending}>
            Add Racer
          </Button>
        </form>
      )}

      <div className="space-y-1.5">
        {racers.map(racer => (
          <div key={racer.id} className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2">
            <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center overflow-hidden shrink-0">
              {racer.photo ? (
                <img src={racer.photo} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {racer.number && `#${racer.number} `}{racer.name}
              </p>
              <p className="text-[10px] text-muted-foreground">{racer.odds} · {racer.team || 'No team'}</p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) handlePhotoUpload(racer.id, e.target.files[0]);
                }}
              />
              <Upload className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
            </label>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteMutation.mutate(racer.id)}>
              <Trash2 className="w-3 h-3 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
