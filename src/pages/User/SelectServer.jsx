import { useNavigate } from 'react-router-dom';
import { Plus, Crown, Shield, Users, ExternalLink, CheckCircle } from 'lucide-react';
import Background from '../components/Background';
import { useApp } from '../context/AppContext';

export default function SelectServer() {
  const navigate = useNavigate();
  const { user, servers, selectServer } = useApp();

  if (!user) { navigate('/login'); return null; }

  const handleSelect = (server) => {
    if (!server.botPresent) return;
    selectServer(server);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start p-6 pt-16 font-inter relative overflow-hidden">
      <Background />

      <div className="relative z-10 w-full max-w-2xl animate-fade-up">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Connecté en tant que {user.username}
          </div>
          <h1 className="text-4xl font-black text-foreground mb-2">Sélectionnez un serveur</h1>
          <p className="text-muted-foreground">Choisissez le serveur que vous souhaitez gérer avec NexusBot.</p>
        </div>

        <div className="space-y-3">
          {servers.map((server) => (
            <div
              key={server.id}
              onClick={() => handleSelect(server)}
              className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                server.botPresent
                  ? 'bg-card/60 backdrop-blur-sm border-border hover:border-violet-500/40 hover:bg-card cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/10'
                  : 'bg-card/30 border-border/50 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Server icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0 transition-transform group-hover:scale-110 ${
                server.botPresent
                  ? 'bg-gradient-to-br from-violet-500/30 to-indigo-500/30 border border-violet-500/20 text-violet-300'
                  : 'bg-secondary border border-border text-muted-foreground'
              }`}>
                {server.name.charAt(0)}
              </div>

              {/* Server info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-foreground truncate">{server.name}</p>
                  {server.isOwner && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-xs font-medium">
                      <Crown className="w-3 h-3" /> Propriétaire
                    </span>
                  )}
                  {!server.isOwner && server.isAdmin && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium">
                      <Shield className="w-3 h-3" /> Admin
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {server.memberCount.toLocaleString()} membres
                </p>
              </div>

              {/* Right action */}
              <div className="flex-shrink-0">
                {server.botPresent ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-300 text-sm font-semibold group-hover:bg-violet-500/20 transition-colors">
                    Gérer
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-xl text-muted-foreground text-sm font-medium">
                    <Plus className="w-3.5 h-3.5" />
                    Ajouter
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Vous ne voyez pas votre serveur ?{' '}
          <span className="text-violet-400 cursor-pointer hover:underline">Vérifiez vos permissions</span>
        </p>
      </div>
    </div>
  );
}