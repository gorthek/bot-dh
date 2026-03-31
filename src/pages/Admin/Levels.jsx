import { useState } from 'react';
import { Star, Plus, Trash2, Gift } from 'lucide-react';
import HelpBox from '../../components/HelpBox';
import { useToast } from '../../components/Toast';

const initialRewards = [
  { level: 5, role: 'Rookie', color: '#6366f1' },
  { level: 10, role: 'Régulier', color: '#7c3aed' },
  { level: 20, role: 'Vétéran', color: '#f59e0b' },
  { level: 35, role: 'Légende', color: '#ef4444' },
];

export default function Levels() {
  const { addToast } = useToast();
  const [xpPerMessage, setXpPerMessage] = useState(15);
  const [cooldown, setCooldown] = useState(60);
  const [rewards, setRewards] = useState(initialRewards);
  const [levelUpMsg, setLevelUpMsg] = useState(true);

  const handleSave = () => {
    addToast({ type: 'success', title: 'Configuration sauvegardée', message: 'Les paramètres de niveaux ont été mis à jour.' });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
          <Star className="w-8 h-8 text-yellow-400" /> Niveaux & XP
        </h1>
        <p className="text-muted-foreground mt-1">Configurez le système de progression de votre serveur.</p>
      </div>

      {/* XP Settings */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <h3 className="font-bold text-foreground">Paramètres XP</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm font-medium text-foreground">XP par message</label>
              <HelpBox title="XP par message">Quantité d'XP gagnée pour chaque message envoyé. Recommandé: 10-25 XP.</HelpBox>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range" min={1} max={100} value={xpPerMessage}
                onChange={e => setXpPerMessage(Number(e.target.value))}
                className="flex-1 accent-violet-500"
              />
              <span className="w-12 text-center font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-lg py-1">{xpPerMessage}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm font-medium text-foreground">Cooldown (secondes)</label>
              <HelpBox title="Cooldown">Temps d'attente entre deux gains d'XP. Évite le spam de messages.</HelpBox>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range" min={0} max={300} step={10} value={cooldown}
                onChange={e => setCooldown(Number(e.target.value))}
                className="flex-1 accent-violet-500"
              />
              <span className="w-12 text-center font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-lg py-1">{cooldown}s</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl border border-border">
          <div>
            <p className="text-sm font-medium text-foreground">Message de niveau supérieur</p>
            <p className="text-xs text-muted-foreground mt-0.5">Annoncer quand un membre monte de niveau</p>
          </div>
          <div
            onClick={() => setLevelUpMsg(!levelUpMsg)}
            className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${levelUpMsg ? 'bg-violet-500' : 'bg-secondary border border-border'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${levelUpMsg ? 'left-5' : 'left-0.5'}`} />
          </div>
        </div>
      </div>

      {/* Level rewards */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-violet-400" />
            <h3 className="font-bold text-foreground">Récompenses de niveau</h3>
          </div>
          <button
            onClick={() => addToast({ type: 'info', title: 'Bientôt disponible', message: 'L\'ajout de récompenses sera disponible prochainement.' })}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-lg text-xs font-medium hover:bg-violet-500/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Ajouter
          </button>
        </div>
        <div className="divide-y divide-border/50">
          {rewards.map((r, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm" style={{ background: `${r.color}20`, border: `1px solid ${r.color}40`, color: r.color }}>
                {r.level}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">Niveau {r.level}</p>
                <p className="text-xs text-muted-foreground">Rôle attribué: <span className="font-medium" style={{ color: r.color }}>@{r.role}</span></p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border border-white/20" style={{ background: r.color }} />
                <button
                  onClick={() => { setRewards(rr => rr.filter((_, ii) => ii !== i)); addToast({ type: 'info', title: 'Récompense supprimée' }); }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25"
      >
        Sauvegarder les paramètres
      </button>
    </div>
  );
}