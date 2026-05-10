import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function CountdownTimer({ targetDate, label = "Starts in", className }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  function getTimeLeft(target) {
    const diff = new Date(target) - new Date();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      <div className="flex gap-1.5">
        {timeLeft.days > 0 && (
          <TimeUnit value={timeLeft.days} unit="d" />
        )}
        <TimeUnit value={timeLeft.hours} unit="h" />
        <TimeUnit value={timeLeft.minutes} unit="m" />
        <TimeUnit value={timeLeft.seconds} unit="s" />
      </div>
    </div>
  );
}

function TimeUnit({ value, unit }) {
  return (
    <div className="flex items-center gap-0.5 bg-secondary rounded-md px-2 py-1">
      <span className="text-sm font-heading font-bold text-foreground tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] text-muted-foreground">{unit}</span>
    </div>
  );
}
