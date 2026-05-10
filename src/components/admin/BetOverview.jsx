import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function BetOverview() {
  const { data: bets = [] } = useQuery({
    queryKey: ['admin-bets'],
    queryFn: () => base44.entities.Bet.list('-created_date', 100),
  });

  const totalWagered = bets.reduce((s, b) => s + (b.amount || 0), 0);
  const totalPending = bets.filter(b => b.status === 'pending').reduce((s, b) => s + (b.amount || 0), 0);
  const totalPaidOut = bets.filter(b => b.status === 'won').reduce((s, b) => s + (b.payout || 0), 0);

  const stats = [
    { icon: DollarSign, label: 'Total Wagered', value: `$${totalWagered.toLocaleString()}`, color: 'text-primary' },
    { icon: Target, label: 'Total Bets', value: bets.length, color: 'text-chart-5' },
    { icon: TrendingUp, label: 'Pending', value: `$${totalPending.toLocaleString()}`, color: 'text-chart-3' },
    { icon: Users, label: 'Paid Out', value: `$${totalPaidOut.toLocaleString()}`, color: 'text-accent' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-4">
            <Icon className={cn("w-4 h-4 mb-1", color)} />
            <p className="font-heading font-bold text-lg text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-heading font-bold text-foreground">All Bets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left p-3 font-medium">User</th>
                <th className="text-left p-3 font-medium">Race</th>
                <th className="text-left p-3 font-medium">Racer</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-right p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bets.map(bet => (
                <tr key={bet.id} className="hover:bg-secondary/30">
                  <td className="p-3 text-foreground text-xs">{bet.user_email}</td>
                  <td className="p-3 text-muted-foreground text-xs truncate max-w-[120px]">{bet.race_title}</td>
                  <td className="p-3 text-foreground font-medium text-xs">{bet.racer_name}</td>
                  <td className="p-3 text-xs capitalize">{bet.bet_type?.replace('_', ' ')}</td>
                  <td className="p-3 text-right font-heading font-bold text-xs">${bet.amount?.toFixed(2)}</td>
                  <td className="p-3">
                    <Badge className={cn("text-[10px] border-0",
                      bet.status === 'won' ? 'bg-accent/20 text-accent' :
                      bet.status === 'lost' ? 'bg-muted text-muted-foreground' :
                      'bg-chart-3/20 text-chart-3'
                    )}>{bet.status}</Badge>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(bet.created_date), 'MMM d, h:mm a')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bets.length === 0 && (
            <div className="p-8 text-center text-muted-foreground text-sm">No bets placed yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
