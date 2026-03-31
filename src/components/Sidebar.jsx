import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, MessageSquare, Shield, Settings,
  Trophy, Music, Zap, LogOut, ChevronLeft, ChevronRight,
  Bot, Star, Bell, Hash
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const userNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Mon Profil', icon: Users, to: '/profile' },
  { label: 'Classement', icon: Trophy, to: '/dashboard/leaderboard' },
];

const adminNav = [
  { label: 'Vue Générale', icon: LayoutDashboard, to: '/admin/overview' },
  { label: 'Modération', icon: Shield, to: '/admin/moderation' },
  { label: 'Commandes', icon: Hash, to: '/admin/commands' },
  { label: 'Niveaux & XP', icon: Star, to: '/admin/levels' },
  { label: 'Musique', icon: Music, to: '/admin/music' },
  { label: 'Notifications', icon: Bell, to: '/admin/notifications' },
  { label: 'Messages Auto', icon: MessageSquare, to: '/admin/automessages' },
  { label: 'Bienvenue', icon: Zap, to: '/admin/welcome' },
];

const ownerNav = [
  { label: 'Statistiques Bot', icon: Bot, to: '/owner/stats' },
  { label: 'Gestion Globale', icon: Settings, to: '/owner/manage' },
];

function NavItem({ item, collapsed }) {
  const location = useLocation();
  const isActive = location.pathname === item.to;
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
        isActive
          ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      }`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-violet-400' : ''}`} />
      {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
      {isActive && !collapsed && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
      )}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
          {item.label}
        </div>
      )}
    </Link>
  );
}

function NavSection({ label, items, collapsed }) {
  return (
    <div className="space-y-1">
      {!collapsed && (
        <p className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
          {label}
        </p>
      )}
      {collapsed && <div className="w-full h-px bg-border/50 my-2" />}
      {items.map(item => (
        <NavItem key={item.to} item={item} collapsed={collapsed} />
      ))}
    </div>
  );
}

export default function Sidebar() {
  const { user, logout, selectedServer, sidebarCollapsed, setSidebarCollapsed } = useApp();
  const collapsed = sidebarCollapsed;

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40 ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 border-b border-sidebar-border ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30">
          <Bot className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-sm text-foreground">NexusBot</p>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        )}
      </div>

      {/* Server Badge */}
      {selectedServer && !collapsed && (
        <div className="mx-3 mt-3 p-3 bg-secondary/50 rounded-xl border border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/40 to-indigo-500/40 flex items-center justify-center text-sm font-bold text-violet-300 flex-shrink-0">
              {selectedServer.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{selectedServer.name}</p>
              <p className="text-xs text-muted-foreground">{selectedServer.memberCount?.toLocaleString()} membres</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4 mt-2">
        <NavSection label="Utilisateur" items={userNav} collapsed={collapsed} />
        <NavSection label="Administration" items={adminNav} collapsed={collapsed} />
        {user?.isOwner && (
          <NavSection label="Propriétaire" items={ownerNav} collapsed={collapsed} />
        )}
      </nav>

      {/* Bottom: user + logout */}
      <div className={`p-3 border-t border-sidebar-border space-y-2`}>
        {user && (
          <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-colors ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {user.username.charAt(0).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.username}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}
          </div>
        )}
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all w-full ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setSidebarCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-violet-500/50 transition-all shadow-lg"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}