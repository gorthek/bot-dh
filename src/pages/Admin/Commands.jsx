import { useState } from 'react';
import { Hash, Plus, Trash2, ToggleLeft, Search } from 'lucide-react';
import Modal from '../../components/Modal';
import { useToast } from '../../components/Toast';

const initialCommands = [
  { id: 1, name: 'play', category: 'Musique', description: 'Joue une musique', enabled: true, uses: 342 },
  { id: 2, name: 'ban', category: 'Modération', description: 'Bannit un membre', enabled: true, uses: 47 },
  { id: 3, name: 'mute', category: 'Modération', description: 'Mute un membre', enabled: true, uses: 65 },
  { id: 4, name: 'rank', category: 'Niveaux', description: 'Affiche le rang', enabled: true, uses: 289 },
  { id: 5, name: 'help', category: 'Général', description: 'Affiche l\'aide', enabled: true, uses: 198 },
  { id: 6, name: 'kick', category: 'Modération', description: 'Expulse un membre', enabled: false, uses: 12 },
  { id: 7, name: 'leaderboard', category: 'Niveaux', description: 'Top membres', enabled: true, uses: 156 },
  { id: 8, name: 'queue', category: 'Musique', description: 'File musicale', enabled: true, uses: 201 },
];

const categoryColors = {
  'Musique': 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  'Modération': 'bg-red-500/10 border-red-500/20 text-red-400',
  'Niveaux': 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  'Général': 'bg-blue-500/10 border-blue-500/20 text-blue-400',
};

export default function Commands() {
  const { addToast } = useToast();
  const [commands, setCommands] = useState(initialCommands);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCmd, setNewCmd] = useState({ name: '', description: '', response: '' });

  const filtered = commands.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id) => {
    setCommands(cmds => cmds.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const handleCreate = () => {
    if (!newCmd.name) return;
    setCommands(cmds => [...cmds, { id: Date.now(), name: newCmd.name, category: 'Général', description: newCmd.description, enabled: true, uses: 0 }]);
    setShowModal(false);
    setNewCmd({ name: '', description: '', response: '' });
    addToast({ type: 'success', title: 'Commande créée', message: `!${newCmd.name} est maintenant active.` });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
            <Hash className="w-8 h-8 text-violet-400" /> Commandes
          </h1>
          <p className="text-muted-foreground mt-1">Activez, désactivez et créez des commandes personnalisées.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25"
        >
          <Plus className="w-4 h-4" /> Nouvelle commande
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher une commande..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      {/* Commands grid */}
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((cmd) => (
          <div key={cmd.id} className={`flex items-center gap-4 p-4 bg-card border rounded-xl transition-all ${cmd.enabled ? 'border-border hover:border-violet-500/30' : 'border-border/50 opacity-60'}`}>
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-violet-400 font-mono text-sm font-bold">!</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono font-bold text-foreground text-sm">!{cmd.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${categoryColors[cmd.category] || 'bg-secondary border-border text-muted-foreground'}`}>
                  {cmd.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{cmd.description} · <span className="text-violet-400/70">{cmd.uses} utilisations</span></p>
            </div>
            <div
              onClick={() => toggle(cmd.id)}
              className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors flex-shrink-0 ${cmd.enabled ? 'bg-violet-500' : 'bg-secondary border border-border'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${cmd.enabled ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Créer une commande personnalisée">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Nom de la commande</label>
            <div className="flex">
              <span className="flex items-center px-3 bg-secondary border border-r-0 border-border rounded-l-xl text-muted-foreground text-sm font-mono">!</span>
              <input
                value={newCmd.name}
                onChange={e => setNewCmd({ ...newCmd, name: e.target.value })}
                className="flex-1 bg-secondary border border-border rounded-r-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500/50"
                placeholder="macommande"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
            <input
              value={newCmd.description}
              onChange={e => setNewCmd({ ...newCmd, description: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500/50"
              placeholder="Ce que fait cette commande..."
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Réponse</label>
            <textarea
              value={newCmd.response}
              onChange={e => setNewCmd({ ...newCmd, response: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-violet-500/50 resize-none h-20"
              placeholder="Bonjour {user} ! Bienvenue sur {server}."
            />
          </div>
          <button
            onClick={handleCreate}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all"
          >
            Créer la commande
          </button>
        </div>
      </Modal>
    </div>
  );
}