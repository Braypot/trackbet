import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Bell, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function TopBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const balance = user?.balance || 0;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-red">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight text-foreground">
            Track<span className="text-primary">Bet</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/wallet">
            <Button variant="ghost" size="sm" className="gap-1.5 text-accent font-semibold text-sm">
              <Wallet className="w-4 h-4" />
              ${balance.toFixed(2)}
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <User className="w-4 h-4 text-muted-foreground" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
