import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Trophy, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const positionColors = {
  1: 'text-yellow-400',
  2: 'text-slate-300',
  3: 'text-amber-600',
};

const positionBg = {
  1: 'bg-yellow-400/10 border-yellow-400/30',
  2: 'bg-slate-300/10 border-slate-300/20',
  3: 'bg-amber-600/10 border-amber-600/20',
};

export default function LiveLeaderboard({ raceId, isLive }) {
  const [racers, setRacers] = useState([]);

  useEffect(() => {
    // Initial load
    base44.entities.Racer.filter({ race_id: raceId }).then(data => {
      setRacers(sortRacers(data));
    });

    // Real-time subscription
    const unsubscribe = base44.entities.Racer.subscribe((event) => {
      setRacers(prev => {
        let updated = [...prev];
        if (event.type === 'create' && event.data.race_id === raceId) {
          updated = [...updated, event.data];
        } else if (event.type === 'update') {
          updated = updated.map(r => r.id === event.id ? event.data : r);
        } else if (event.type === 'delete') {
          updated = updated.filter(r => r.id !== event.id);
        }
        return sortRacers(updated);
      });
    });

    return unsubscribe;
  }, [raceId]);

  function sortRacers(data) {
    return [...data].sort((a, b) => {
      // Sort by finish_position if set, otherwise by total_bets desc
      if (a.finish_position && b.finish_position) return a.finish_position - b.finish_position;
      if (a.finish_position) return -1;
      if (b.finish_position) return 1;
      return (b.total_bets || 0) - (a.total_bets || 0);
    });
  }

  if (racers.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <Trophy className="w-4 h-4 text-yellow-400" />
        <h2 className="font-heading font-bold text-foreground text-sm">
          {isLive ? 'Live Leaderboard' : 'Racer Standings'}
        </h2>
        {isLive && (
          <span className="ml-auto flex items-center gap-1 text-[10px] text-primary font-semibold uppercase tracking-wider">
            <Flame className="w-3 h-3 animate-pulse-glow" /> Live
          </span>
        )}
      </div>

      <div className="divide-y divide-border">
        {racers.map((racer, index) => {
          const pos = racer.finish_position || index + 1;
          const isTop3 = pos <= 3;

          return (
            <div
              key={racer.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3 transition-colors",
                isTop3 && positionBg[pos]
              )}
            >
              {/* Position */}
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold border",
                isTop3 ? `${positionColors[pos]} ${positionBg[pos]}` : 'text-muted-foreground border-border'
              )}>
                {pos}
              </div>

              {/* Photo */}
              {racer.photo ? (
                <img src={racer.photo} alt={racer.name} className="w-8 h-8 rounded-full object-cover border border-border" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {racer.number || racer.name?.[0]}
                </div>
              )}

              {/* Name & team */}
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-semibold truncate", isTop3 ? positionColors[pos] : 'text-foreground')}>
                  {racer.name}
                </p>
                {racer.team && <p className="text-[10px] text-muted-foreground truncate">{racer.team}</p>}
              </div>

              {/* Car number */}
              {racer.number && (
                <span className="text-xs font-heading font-bold text-muted-foreground">#{racer.number}</span>
              )}

              {/* Odds */}
              <span className={cn(
                "text-xs font-semibold",
                racer.odds?.startsWith('+') ? 'text-accent' : 'text-foreground'
              )}>
                {racer.odds}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
