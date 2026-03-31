import { Shield, Users, AlertTriangle, CheckCircle, Hash, Star, Activity } from 'lucide-react';
import StatCard from '../../components/StatCard';
import HelpBox from '../../components/HelpBox';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const commandData = [
  { name: '!play', count: 342 },
  { name: '!rank', count: 289 },
  { name: '!ban', count: 47 },
  { name: '!mute', count: 65 },
  { name: '!help', count: 198 },
  { name: '!xp', count: 156 },
];

const modActions = [
  { type: 'Avertissement', count: 12, user: 'Spammer123', time: 'Il y a 1h', color: 'text-yellow-400' },
  { type: 'Mute', count: 1, user: 'ToxicUser', time: 'Il y a 3h', color: 'text-orange-400' },
  { type: 'Ban', count: 1, user: 'Raider99', time: 'Il y a 5h', color: 'text-red-400' },
  { type: 'Avertissement', count: 1, user: 'SpamBot', time: 'Hier', color: 'text-yellow-400' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-sm">
        <p className="font-semibold text-foreground">{label}: <span className="text-violet-400">{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

export default function Overview() {
  const { selectedServer } = useApp();

  const stats = [
    { title: 'Membres Totaux', value: selectedServer?.memberCount?.toLocaleString() || '0', icon: Users, color: 'violet', trendValue: '+12 cette semaine', trend: 'up' },
    { title: 'Sanctions ce mois', value: '14', icon: Shield, color: 'red', trendValue: '-3 vs mois dernier', trend: 'down' },
    { title: 'Commandes exécutées', value: '2,341', icon: Hash, color: 'green', trendValue: '+18%', trend: 'up' },
    { title: 'Canaux actifs', value: '8', icon: Activity, color: 'blue', subtitle: 'Sur 12 canaux' },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
            <Shield className="w-8 h-8 text-violet-400" /> Administration
          </h1>
          <p className="text-muted-foreground mt-1">Gérez et supervisez votre serveur.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-xl text-sm font-medium text-violet-300">
          <CheckCircle className="w-4 h-4" /> Tout fonctionne normalement
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Commands usage */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-foreground">Commandes les plus utilisées</h3>
              <p className="text-sm text-muted-foreground">7 derniers jours</p>
            </div>
            <HelpBox title="Statistiques commandes">
              Ce graphique affiche le nombre d'utilisations de chaque commande sur les 7 derniers jours.
            </HelpBox>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={commandData} barSize={32}>
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {commandData.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? '#7c3aed' : '#4f46e5'} opacity={i === 0 ? 1 : 0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent moderation */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" /> Actions de Modération Récentes
          </h3>
          <div className="space-y-3">
            {modActions.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                <div className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${
                  a.type === 'Ban' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                  a.type === 'Mute' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                  'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                }`}>{a.type}</div>
                <span className="text-sm text-foreground font-medium flex-1">{a.user}</span>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Server health */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-bold text-foreground mb-4">Santé du Serveur</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Auto-Mod', status: 'Actif', ok: true },
            { label: 'Anti-Spam', status: 'Actif', ok: true },
            { label: 'Logs', status: 'Actif', ok: true },
            { label: 'Anti-Raid', status: 'Inactif', ok: false },
          ].map((item, i) => (
            <div key={i} className={`p-4 rounded-xl border text-center ${item.ok ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
              <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${item.ok ? 'bg-green-400' : 'bg-red-400'}`} />
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className={`text-xs mt-0.5 ${item.ok ? 'text-green-400' : 'text-red-400'}`}>{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}