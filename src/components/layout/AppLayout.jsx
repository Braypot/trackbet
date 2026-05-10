import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from './BottomNav';
import TopBar from './TopBar';

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <main className="flex-1 pb-20 md:pb-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ position: 'relative', zIndex: 0 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
}
