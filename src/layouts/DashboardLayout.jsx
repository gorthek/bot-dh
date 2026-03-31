import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Background from '../components/Background';
import { useApp } from '../context/AppContext';

export default function DashboardLayout() {
  const { user, selectedServer, sidebarCollapsed } = useApp();

  if (!user) return <Navigate to="/login" replace />;
  if (!selectedServer) return <Navigate to="/servers" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Background />
      <Sidebar />
      <main className={`transition-all duration-300 min-h-screen ${sidebarCollapsed ? 'pl-[72px]' : 'pl-64'}`}>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}