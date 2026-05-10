import React from 'react';
import { X, Trash2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

export default function BetSlip({ bets, onUpdateBets, onPlaceBets, onClose, isPlacing, balance }) {
  const totalStake = bets.reduce((sum, b) => sum + b.amount, 0);
  const totalPayout = bets.reduce((sum, b) => sum + b.amount * (b.oddsDecimal || 2), 0);
  const canPlace = totalStake > 0 && totalStake <= balance;

  const updateAmount = (index, amount) => {
    const updated = [...bets];
    updated[index] = { ...updated[index], amount: Math.max(0, Number(amount) || 0) };
    onUpdateBets(updated);
  };

  const removeBet = (index) => {
    onUpdateBets(bets.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      exit={{ y: 300 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Bet Slip ({bets.length})
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3 mb-4">
          <AnimatePresence>
            {bets.map((bet, i) => (
              <motion.div
                key={`${bet.racerId}-${bet.betType}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-secondary rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm">{bet.racerName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{bet.betType.replace('_', ' ')} · {bet.odds}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeBet(i)}>
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">$</span>
                  <Input
                    type="number"
                    value={bet.amount}
                    onChange={(e) => updateAmount(i, e.target.value)}
                    className="h-8 bg-muted border-border text-sm font-semibold"
                    min="1"
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    → <span className="text-accent font-semibold">${(bet.amount * (bet.oddsDecimal || 2)).toFixed(2)}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="border-t border-border pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Stake</span>
            <span className="font-heading font-bold text-foreground">${totalStake.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Potential Payout</span>
            <span className="font-heading font-bold text-accent">${totalPayout.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Balance</span>
            <span className={totalStake > balance ? 'text-destructive' : 'text-muted-foreground'}>
              ${balance.toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold glow-red"
          onClick={onPlaceBets}
          disabled={!canPlace || isPlacing}
        >
          {isPlacing ? 'Placing Bets...' : totalStake > balance ? 'Insufficient Balance' : `Place Bets · $${totalStake.toFixed(2)}`}
        </Button>
      </div>
    </motion.div>
  );
}
