import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'violet', trend, trendValue }) {
  const colorMap = {
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', icon: 'text-violet-400', glow: 'shadow-violet-500/20' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-400', glow: 'shadow-blue-500/20' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'text-green-400', glow: 'shadow-green-500/20' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
    pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', icon: 'text-pink-400', glow: 'shadow-pink-500/20' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: 'text-red-400', glow: 'shadow-red-500/20' },
  };
  const c = colorMap[color] || colorMap.violet;

  return (
    <div className={`relative bg-card border ${c.border} rounded-2xl p-5 shadow-lg ${c.glow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden`}>
      {/* Background glow */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${c.bg} blur-xl group-hover:scale-150 transition-transform duration-500`} />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {trendValue !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
              trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-muted-foreground'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : trend === 'down' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
              {trendValue}
            </div>
          )}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${c.icon}`} />
          </div>
        )}
      </div>
    </div>
  );
}