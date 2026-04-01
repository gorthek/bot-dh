import { useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';

export default function Login() {
  const { navigateToLogin } = useAuth();

  useEffect(() => {
    navigateToLogin();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin"></div>
    </div>
  );
}
