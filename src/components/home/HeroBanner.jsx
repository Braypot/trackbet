import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroBanner({ featuredRace }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-card via-background to-card">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative px-4 py-10 md:py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Your Local
            <br />
            <span className="text-primary glow-text-red">Race Track.</span>
            <br />
            <span className="text-accent">Your Bets.</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-md">
            Bet on live local racing events. Stock cars, sprints, drags & more. Real odds, real payouts.
          </p>
          
          <div className="flex gap-3 mt-6">
            <Link to={featuredRace ? `/race/${featuredRace.id}` : '/upcoming'}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold gap-2 glow-red">
                <Flame className="w-4 h-4" />
                {featuredRace ? 'Bet Now' : 'View Races'}
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary font-heading gap-2">
                Leaderboard <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
