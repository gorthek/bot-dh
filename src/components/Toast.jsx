import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  success: 'border-green-500/30 bg-green-500/10 text-green-300',
  error: 'border-red-500/30 bg-red-500/10 text-red-300',
  warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
  info: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
};

function ToastItem({ toast, onRemove }) {
  const Icon = icons[toast.type] || Info;
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-2xl animate-toast-in min-w-[280px] max-w-[380px] ${styles[toast.type] || styles.info}`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        {toast.title && <p className="font-semibold text-sm">{toast.title}</p>}
        {toast.message && <p className="text-sm opacity-80">{toast.message}</p>}
      </div>
      <button onClick={() => onRemove(toast.id)} className="opacity-60 hover:opacity-100 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}