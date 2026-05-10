import React from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import OddsButton from '@/components/shared/OddsButton';

export default function RacerBetCard({ racer, canBet, selectedBets, onToggleBet }) {
  const isWinnerSelected = selectedBets.some(b => b.racerId === racer.id && b.betType === 'winner');
  const isTop3Selected = selectedBets.some(b => b.racerId === racer.id && b.betType === 'top3');

  return (
    <div className={cn(
      "bg-card border border-border rounded-xl p-4 transition-all duration-200",
      (isWinnerSelected || isTop3Selected) && "border-primary/30"
    )}>
      <div className="flex items-center gap-3">
        {racer.photo ? (
          <img src={racer.photo} alt={racer.name} className="w-12 h-12 rounded-lg object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {racer.number && (
              <span className="text-xs font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                #{racer.number}
              </span>
            )}
            <h3 className="font-heading font-bold text-foreground text-sm truncate">{racer.name}</h3>
          </div>
          {racer.team && <p className="text-xs text-muted-foreground mt-0.5">{racer.team}</p>}
          {racer.total_bets > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">${racer.total_bets.toLocaleString()} wagered</p>
          )}
        </div>

        <div className="flex gap-2">
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground mb-1">WIN</p>
            <OddsButton
              odds={racer.odds}
              selected={isWinnerSelected}
              onClick={() => onToggleBet(racer, 'winner')}
              disabled={!canBet}
            />
          </div>
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground mb-1">TOP 3</p>
            <OddsButton
              odds={getTop3Odds(racer.odds)}
              selected={isTop3Selected}
              onClick={() => onToggleBet(racer, 'top3')}
              disabled={!canBet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function getTop3Odds(winOdds) {
  if (!winOdds) return '-110';
  // Simplistic top3 odds calculation
  const num = parseInt(winOdds.replace('+', '').replace('-', ''));
  if (winOdds.startsWith('+')) {
    return `+${Math.round(num / 3)}`;
  }
  return `-${Math.round(num * 1.5)}`;
}
