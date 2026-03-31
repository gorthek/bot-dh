import { useState } from 'react';
import { Shield, Plus, Trash2, Save, AlertTriangle, Ban, VolumeX, Eye } from 'lucide-react';
import Modal from '../../components/Modal';
import HelpBox from '../../components/HelpBox';
import { useToast } from '../../components/Toast';

const initialRules = [
  { id: 1, type: 'Spam', action: 'Mute 10min', threshold: '5 msg/5s', enabled: true },
  { id: 2, type: 'Liens externes', action: 'Supprimer', threshold: 'Toujours', enabled: true },
  { id: 3, type: 'Mots interdits', action: 'Avertissement', threshold: 'Toujours', enabled: false },
  { id: 4, type: 'Mentions excessives', action: 'Mute 30min', threshold: '5 mentions', enabled: true },
];

export default function Moderation() {
  const { addToast } = useToast();
  const [rules, setRules] = useState(initialRules);
  const [showModal, setShowModal] = useState(false);

  const toggleRule = (id) => {
    setRules(r => r.map(rule => rule.id === id ? { ...rule, enabled: !rule.enabled } : rule));
    addToast({ type: 'success', title: 'Règle mise à jour', message: 'La configuration a été sauvegardée.' });
  };

  const deleteRule = (id) => {
    setRules(r => r.filter(rule => rule.id !== id));
    addToast({ type: 'info', title: 'Règle supprimée' });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
            <Shield className="w-8 h-8 text-violet-400" /> Modération
          </h1>
          <p className="text-muted-foreground mt-1">Configurez les règles d'auto-modération.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25"
        >
          <Plus className="w-4 h-4" /> Nouvelle règle
        </button>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Ban, label: 'Anti-Raid', desc: 'Bloquez les raids automatiquement', color: 'red', enabled: false },
          { icon: VolumeX, label: 'Anti-Spam', desc: 'Limitez le spam de messages', color: 'orange', enabled: true },
          { icon: Eye, label: 'Logs de modération', desc: 'Enregistrez toutes les actions', color: 'blue', enabled: true },
        ].map((item, i) => (
          <div key={i} className={`p-5 rounded-2xl border flex items-start gap-4 ${
            item.enabled ? 'bg-green-500/5 border-green-500/20' : 'bg-card border-border'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              item.enabled ? 'bg-green-500/10 border border-green-500/20' : 'bg-secondary border border-border'
            }`}>
              <item.icon className={`w-5 h-5 ${item.enabled ? 'text-green-400' : 'text-muted-foreground'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <div
                  onClick={() => addToast({ type: 'success', title: `${item.label} ${item.enabled ? 'désactivé' : 'activé'}` })}
                  className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${item.enabled ? 'bg-green-500' : 'bg-secondary border border-border'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${item.enabled ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rules table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-bold text-foreground">Règles d'Auto-Modération</h3>
          <HelpBox title="Auto-Modération">
            Ces règles s'appliquent automatiquement à tous les membres sans rôle de modérateur.
          </HelpBox>
        </div>
        <div className="divide-y divide-border/50">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-4 px-6 py-4 hover:bg-secondary/20 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground text-sm">{rule.type}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                    rule.enabled
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-secondary border-border text-muted-foreground'
                  }`}>
                    {rule.enabled ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Action: <span className="text-violet-400">{rule.action}</span> · Seuil: {rule.threshold}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => toggleRule(rule.id)}
                  className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${rule.enabled ? 'bg-violet-500' : 'bg-secondary border border-border'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${rule.enabled ? 'left-5' : 'left-0.5'}`} />
                </div>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvelle règle d'auto-mod">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Type de règle</label>
            <select className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500/50">
              <option>Spam</option>
              <option>Liens externes</option>
              <option>Mots interdits</option>
              <option>Mentions excessives</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Action</label>
            <select className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500/50">
              <option>Avertissement</option>
              <option>Supprimer</option>
              <option>Mute 10min</option>
              <option>Mute 30min</option>
              <option>Kick</option>
              <option>Ban</option>
            </select>
          </div>
          <button
            onClick={() => { setShowModal(false); addToast({ type: 'success', title: 'Règle créée', message: 'La nouvelle règle est maintenant active.' }); }}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all"
          >
            Créer la règle
          </button>
        </div>
      </Modal>
    </div>
  );
}