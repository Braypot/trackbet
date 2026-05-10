import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Flame, Calendar, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/live', icon: Flame, label: 'Live' },
  { path: '/upcoming', icon: Calendar, label: 'Upcoming' },
  { path: '/leaderboard', icon: Trophy, label: 'Leaders' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabPress = useCallback((path) => {
    const isActive = location.pathname === path || location.pathname.startsWith(path === '/' ? '/__never__' : path);
    if (isActive) {
      // Already on this tab's root — scroll to top for native iOS feel
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  }, [location.pathname, navigate]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path);
          return (
            <button
              key={path}
              onClick={() => handleTabPress(path)}
              className={cn(
                "nav-item flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "drop-shadow-[0_0_8px_hsl(4,90%,58%)]")} />
              <span className="text-[10px] font-medium">{label}</span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
