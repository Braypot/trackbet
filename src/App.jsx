import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import React, { Suspense, lazy } from 'react';

import AppLayout from '@/components/layout/AppLayout';

// Add page imports here
const Home = lazy(() => import('@/pages/Home'));
const LiveRaces = lazy(() => import('@/pages/LiveRaces'));
const UpcomingRaces = lazy(() => import('@/pages/UpcomingRaces'));
const RaceDetail = lazy(() => import('@/pages/RaceDetail'));
const Wallet = lazy(() => import('@/pages/Wallet'));
const Profile = lazy(() => import('@/pages/Profile'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));
const AdminPanel = lazy(() => import('@/pages/admin/AdminPanel'));
const ResponsibleGambling = lazy(() => import('@/pages/ResponsibleGambling'));
const Terms = lazy(() => import('@/pages/Terms'));

const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
  </div>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-sm font-heading">Loading TrackBet...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<LiveRaces />} />
        <Route path="/upcoming" element={<UpcomingRaces />} />
        <Route path="/race/:id" element={<RaceDetail />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/responsible-gambling" element={<ResponsibleGambling />} />
        <Route path="/terms" element={<Terms />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
