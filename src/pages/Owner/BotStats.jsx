import { Bot, Server, Users, Cpu, Wifi, Clock, Activity } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const latencyData = Array.from({ length: 20 }, (_, i) => ({
  t: i,
  latency: Math.floor(Math.random() * 30) + 40,
}));

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-2 shadow-xl text-xs">
        <p className="text-violet-400 font-semibold">{payload[0].value}ms</p>
      </div>
    );
  }
  return null;
};

export default function BotStats() {
  const stats = [
    { title: 'Serveurs', value: '4,821', icon: Server, color: 'violet', trendValue: '+48 cette semaine', trend: 'up' },
    { title: 'Utilisateurs', value: '2.1M', icon: Users, color: 'blue', trendValue: '+12K ce mois', trend: 'up' },
    { title: 'Latence API', value: '54ms', icon: Wifi, color: 'green', trendValue: 'Excellent', trend: 'up' },
    { title: 'Uptime', value: '99.98%', icon: Clock, color: 'yellow', subtitle: 'Derniers 30 jours' },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-bold mb-4">
          OWNER ONLY
        </div>
        <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
          <Bot className="w-8 h-8 text-violet-400" /> Statistiques Globales
        </h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de la santé et des performances du bot.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Latency chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-foreground">Latence Discord Gateway</h3>
            <p className="text-sm text-muted-foreground">En temps réel (simulé)</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-semibold">54ms</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={latencyData}>
            <XAxis dataKey="t" hide />
            <YAxis hide domain={[20, 120]} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="latency" stroke="#7c3aed" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Shards */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-violet-400" /> Shards
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {Array.from({ length: 8 }, (_, i) => ({
            id: i,
            latency: Math.floor(Math.random() * 40) + 35,
            servers: Math.floor(Math.random() * 200) + 500,
            status: Math.random() > 0.1 ? 'ok' : 'warn',
          })).map((shard) => (
            <div key={shard.id} className={`p-3 rounded-xl border text-center ${shard.status === 'ok' ? 'bg-green-500/5 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
              <p className="text-xs font-bold text-muted-foreground mb-1">#{shard.id}</p>
              <p className={`text-sm font-bold ${shard.status === 'ok' ? 'text-green-400' : 'text-yellow-400'}`}>{shard.latency}ms</p>
              <p className="text-xs text-muted-foreground mt-0.5">{shard.servers}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resource usage */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { label: 'CPU', value: 23, color: '#7c3aed', icon: Cpu },
          { label: 'RAM', value: 67, color: '#4f46e5', icon: Activity },
        ].map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <item.icon className="w-5 h-5 text-violet-400" />
                <span className="font-semibold text-foreground">{item.label}</span>
              </div>
              <span className="text-2xl font-black" style={{ color: item.color }}>{item.value}%</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.value}%`, background: `linear-gradient(to right, ${item.color}, #6366f1)` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}