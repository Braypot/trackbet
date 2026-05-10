import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Flame, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const statusConfig = {
  upcoming: { label: 'Upcoming', color: 'bg-muted text-muted-foreground' },
  betting_open: { label: 'Betting Open', color: 'bg-accent/20 text-accent' },
  betting_closed: { label: 'Bets Closed', color: 'bg-yellow-500/20 text-yellow-400' },
  live: { label: 'LIVE', color: 'bg-primary/20 text-primary' },
  finished: { label: 'Finished', color: 'bg-muted text-muted-foreground' },
  cancelled: { label: 'Cancelled', color: 'bg-destructive/20 text-destructive' },
};

const raceTypeLabels = {
  outlaw_super_late_model: 'Outlaw Super Late Model',
  pro_late_model: 'Pro Late Model',
  modified: 'Modified',
  b_modified: 'B Modified',
  c_modified: 'C Modified',
  winged_sprint: 'Winged Sprint',
  non_wing_sprint: '500 Sprint (Non-Wing)',
  late_model_sportsman: 'Late Model Sportsman',
  truck_series: 'Truck Series',
  street_stock: 'Street Stock',
  pure_stock: 'Pure Stock',
  sport_compact_a: 'Sport Compact A',
  sport_compact_b: 'Sport Compact B',
  sport_compact_c: 'Sport Compact C',
  mini_wedge: 'Mini Wedge',
  dwarf_car: 'Dwarf Car',
  figure_8: 'Figure 8',
  destruction_overload: 'Destruction Overload',
};

export default function RaceCard({ race, compact = false }) {
  const status = statusConfig[race.status] || statusConfig.upcoming;
  const isLive = race.status === 'live';
  const isBettingOpen = race.status === 'betting_open';

  return (
    <Link to={`/race/${race.id}`}>
      <div className={cn(
        "group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40",
        isLive && "border-primary/30 glow-red",
        isBettingOpen && "border-accent/30"
      )}>
        {race.cover_image && !compact && (
          <div className="relative h-36 overflow-hidden">
            <img
              src={race.cover_image}
              alt={race.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <Badge className={cn("absolute top-3 left-3", status.color, "border-0")}>
              {isLive && <Flame className="w-3 h-3 mr-1 animate-pulse-glow" />}
              {status.label}
            </Badge>
          </div>
        )}

        <div className={cn("p-4", compact && "py-3")}>
          {(compact || !race.cover_image) && (
            <div className="flex items-center gap-2 mb-2">
              <Badge className={cn(status.color, "border-0 text-[10px]")}>
                {isLive && <Flame className="w-3 h-3 mr-1 animate-pulse-glow" />}
                {status.label}
              </Badge>
              <Badge variant="outline" className="text-[10px] border-border">
                {raceTypeLabels[race.race_type] || 'Race'}
              </Badge>
            </div>
          )}

          <h3 className="font-heading font-bold text-foreground text-sm md:text-base truncate">
            {race.title}
          </h3>

          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {race.track_name}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {race.scheduled_start ? format(new Date(race.scheduled_start), 'MMM d, h:mm a') : 'TBD'}
            </span>
          </div>

          {race.total_pool > 0 && (
            <div className="flex items-center gap-1 mt-2 text-xs">
              <Users className="w-3 h-3 text-primary" />
              <span className="text-primary font-semibold">${race.total_pool.toLocaleString()}</span>
              <span className="text-muted-foreground">pool</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
