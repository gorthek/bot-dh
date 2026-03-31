import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '.tanstack/react-query'
import { queryClientInstance } from './lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from './lib/AuthContext';
import UserNotRegisteredError from './components/UserNotRegisteredError';

// App-specific imports
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './components/Toast';
import DashboardLayout from './layouts/DashboardLayout';

import Landing from './pages/Landing';
import SelectServer from './pages/SelectServer';
import Profile from './pages/Profile';
import Dashboard from './pages/User/Dashboard';
import Leaderboard from './pages/User/Leaderboard';
import Overview from './pages/Admin/Overview';
import Moderation from './pages/Admin/Moderation';
import Commands from './pages/Admin/Commands';
import Levels from './pages/Admin/Levels';
import Welcome from './pages/Admin/Welcome';
import BotStats from './pages/Owner/BotStats';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <AppProvider>
      <ToastProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/servers" element={<SelectServer />} />

          {/* Protected dashboard */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
            <Route path="/admin/overview" element={<Overview />} />
            <Route path="/admin/moderation" element={<Moderation />} />
            <Route path="/admin/commands" element={<Commands />} />
            <Route path="/admin/levels" element={<Levels />} />
            <Route path="/admin/welcome" element={<Welcome />} />
            <Route path="/owner/stats" element={<BotStats />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ToastProvider>
    </AppProvider>
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
  );
}

export default App;