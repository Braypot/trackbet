import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function OddsButton({ odds, selected, onClick, disabled, className }) {
  const isPositive = odds?.startsWith('+');

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative px-4 py-2.5 rounded-lg font-heading font-bold text-sm transition-all duration-200",
        "border",
        selected
          ? "bg-primary/20 border-primary text-primary glow-red"
          : "bg-secondary border-border text-foreground hover:border-muted-foreground/40",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span className={cn(
        isPositive && !selected && "text-accent"
      )}>
        {odds}
      </span>
    </motion.button>
  );
}
