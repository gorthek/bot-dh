import { useState } from 'react';
import { User, Mail, Hash, Calendar, Edit3, Save, X, Star, Trophy, MessageSquare, Award } from 'lucide-react';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';

export default function Profile() {
  const { user, selectedServer } = useApp();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('Passionné de Discord et de gaming ??');

  const stats = [
    { title: 'Niveau', value: '24', icon: Star, color: 'violet', trendValue: '+2 cette semaine', trend: 'up' },
    { title: 'Messages', value: '1,847', icon: MessageSquare, color: 'blue', trendValue: '+124 ce mois', trend: 'up' },
    { title: 'XP Total', value: '48,320', icon: Trophy, color: 'yellow', subtitle: 'Sur ce serveur' },
    { title: 'Classement', value: '#12', icon: Award, color: 'pink', subtitle: 'Dans le serveur' },
  ];

  const recentActivity = [
    { text: 'A atteint le niveau 24', time: 'Il y a 2 heures', type: 'level' },
    { text: '50 messages dans #général', time: 'Aujourd\'hui', type: 'message' },
    { text: 'Rôle "Régulier" attribué', time: 'Hier', type: 'role' },
    { text: 'A rejoint le serveur', time: 'Il y a 3 mois', type: 'join' },
  ];

  const activityColors = { level: 'text-yellow-400', message: 'text-blue-400', role: 'text-violet-400', join: 'text-green-400' };

  const handleSave = () => {
    setEditing(false);
    addToast({ type: 'success', title: 'Profil mis à jour', message: 'Vos modifications ont été sauvegardées.' });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-foreground">Mon Profil</h1>
        <p className="text-muted-foreground mt-1">Gérez votre profil et consultez vos statistiques.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-violet-600/40 via-indigo-600/40 to-blue-600/40 relative">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.3), transparent 60%)' }} />
        </div>
        {/* Avatar + info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 border-4 border-card flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-violet-500/30">
              {user?.username?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-black text-foreground">{user?.username}</h2>
                <span className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-xs font-semibold">Niveau 24</span>
              </div>
              <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                <Hash className="w-3.5 h-3.5" />{user?.discriminator} • {user?.email}
              </p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 border border-border rounded-xl text-sm font-medium transition-all hover:border-violet-500/30"
            >
              <Edit3 className="w-4 h-4" /> Modifier
            </button>
          </div>

          {/* XP Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progression Niveau 25</span>
              <span className="text-sm font-semibold text-violet-400">48,320 / 55,000 XP</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-1000 shadow-lg shadow-violet-500/30"
                style={{ width: '87%' }}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="bg-secondary/50 border border-border rounded-xl p-4">
            <p className="text-sm text-foreground/80 italic">"{bio}"</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Recent activity */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-bold text-foreground mb-4">Activité Récente</h3>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${activityColors[item.type]}`} />
              <p className="text-sm text-foreground/80 flex-1">{item.text}</p>
              <span className="text-xs text-muted-foreground flex-shrink-0 flex items-center gap-1">
                <Calendar className="w-3 h-3" />{item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal open={editing} onClose={() => setEditing(false)} title="Modifier le profil">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-violet-500/50 resize-none h-24"
              placeholder="Décrivez-vous..."
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all">
              <Save className="w-4 h-4" /> Sauvegarder
            </button>
            <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border rounded-xl text-sm font-medium hover:bg-secondary/80 transition-all">
              <X className="w-4 h-4" /> Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}