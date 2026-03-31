import { HelpCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function HelpBox({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/50 transition-all"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-card border border-border rounded-xl p-4 shadow-2xl shadow-black/50 z-50 animate-fade-up">
          <div className="flex items-start justify-between gap-2 mb-2">
            {title && <p className="text-sm font-semibold text-foreground">{title}</p>}
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{children}</p>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border" />
        </div>
      )}
    </div>
  );
}