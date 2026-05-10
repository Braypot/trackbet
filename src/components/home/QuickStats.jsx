import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Flame, Calendar, Trophy, DollarSign } from 'lucide-react';

export default function QuickStats() {
  const { data: races = [] } = useQuery({
    queryKey: ['races-stats'],
    queryFn: () => base44.entities.Race.list('-created_date', 50),
  });

  const live = races.filter(r => r.status === 'live' || r.status === 'betting_open').length;
  const upcoming = races.filter(r => r.status === 'upcoming').length;
  const totalPool = races.reduce((acc, r) => acc + (r.total_pool || 0), 0);

  const stats = [
    { icon: Flame, label: 'Live', value: live, color: 'text-primary' },
    { icon: Calendar, label: 'Upcoming', value: upcoming, color: 'text-chart-5' },
    { icon: DollarSign, label: 'Total Pool', value: `$${(totalPool / 1000).toFixed(1)}k`, color: 'text-accent' },
    { icon: Trophy, label: 'Finished', value: races.filter(r => r.status === 'finished').length, color: 'text-chart-3' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-card border border-border rounded-xl p-3 text-center">
          <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
          <p className="font-heading font-bold text-foreground text-sm">{value}</p>
          <p className="text-[10px] text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}
