import { useState } from 'react';
import { Zap, Eye } from 'lucide-react';
import { useToast } from '../../components/Toast';
import Modal from '../../components/Modal';

export default function Welcome() {
  const { addToast } = useToast();
  const [enabled, setEnabled] = useState(true);
  const [channel, setChannel] = useState('#bienvenue');
  const [message, setMessage] = useState('Bienvenue sur **{server}**, {user} ! ??\nTu es le membre **#{membercount}** !');
  const [preview, setPreview] = useState(false);

  const handleSave = () => {
    addToast({ type: 'success', title: 'Sauvegardé', message: 'Le message de bienvenue a été mis à jour.' });
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-400" /> Message de Bienvenue
        </h1>
        <p className="text-muted-foreground mt-1">Accueillez vos nouveaux membres avec style.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Config */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Activer les messages</p>
              <p className="text-xs text-muted-foreground mt-0.5">Envoyer un message quand quelqu'un rejoint</p>
            </div>
            <div onClick={() => setEnabled(!enabled)} className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors ${enabled ? 'bg-violet-500' : 'bg-secondary border border-border'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${enabled ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Canal</label>
            <select
              value={channel}
              onChange={e => setChannel(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-violet-500/50"
            >
              <option>#bienvenue</option>
              <option>#général</option>
              <option>#arrivées</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-violet-500/50 resize-none h-28 font-mono"
            />
            <p className="text-xs text-muted-foreground mt-2">Variables: <code className="text-violet-400">{'{user}'}</code>, <code className="text-violet-400">{'{server}'}</code>, <code className="text-violet-400">{'{membercount}'}</code></p>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} className="flex-1 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all">
              Sauvegarder
            </button>
            <button onClick={() => setPreview(true)} className="flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm font-medium hover:bg-secondary/80 transition-all">
              <Eye className="w-4 h-4" /> Aperçu
            </button>
          </div>
        </div>

        {/* Live preview */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Aperçu en direct</h3>
          <div className="bg-[#313338] rounded-xl p-4 font-sans">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold flex-shrink-0">N</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-sm">NexusBot</span>
                  <span className="text-xs bg-[#5865F2] text-white px-1.5 py-0.5 rounded text-[10px] font-semibold">BOT</span>
                  <span className="text-[#949ba4] text-xs">Aujourd'hui à 14:32</span>
                </div>
                <div className="bg-[#2b2d31] rounded-lg p-3 border-l-4 border-violet-500">
                  <p className="text-[#dcddde] text-sm whitespace-pre-line">
                    {message
                      .replace('{user}', '**@Nouveau_Membre**')
                      .replace('{server}', '**Mon Serveur**')
                      .replace('{membercount}', '**1,248**')
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={preview} onClose={() => setPreview(false)} title="Aperçu du message">
        <div className="bg-[#313338] rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold">N</div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-semibold text-sm">NexusBot</span>
                <span className="text-xs bg-[#5865F2] text-white px-1.5 py-0.5 rounded font-semibold">BOT</span>
              </div>
              <p className="text-[#dcddde] text-sm whitespace-pre-line">
                {message.replace('{user}', '@Jean_Dupont').replace('{server}', 'My Server').replace('{membercount}', '1,248')}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}