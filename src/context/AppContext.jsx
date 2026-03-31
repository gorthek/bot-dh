import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

// Mock data
const MOCK_USER = {
  id: '123456789',
  username: 'DiscordUser',
  discriminator: '0001',
  avatar: null,
  email: 'user@example.com',
};

const MOCK_SERVERS = [
  { id: '1', name: 'My Awesome Server', icon: null, memberCount: 1247, isAdmin: true, isOwner: false, botPresent: true },
  { id: '2', name: 'Gaming Hub', icon: null, memberCount: 542, isAdmin: true, isOwner: true, botPresent: true },
  { id: '3', name: 'Chill Zone', icon: null, memberCount: 89, isAdmin: false, isOwner: false, botPresent: false },
  { id: '4', name: 'Dev Community', icon: null, memberCount: 3201, isAdmin: true, isOwner: false, botPresent: true },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const login = () => setUser(MOCK_USER);
  const logout = () => { setUser(null); setSelectedServer(null); };
  const selectServer = (server) => setSelectedServer(server);

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      selectedServer,
      selectServer,
      servers: MOCK_SERVERS,
      sidebarCollapsed,
      setSidebarCollapsed,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}