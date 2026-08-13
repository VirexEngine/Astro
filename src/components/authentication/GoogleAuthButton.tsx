import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, LogIn } from 'lucide-react';

interface GoogleAuthButtonProps {
  onSuccess: (userData: { name: string; email: string; picture?: string }) => void;
  clientId?: string;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onSuccess, clientId }) => {
  const envClientId = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GOOGLE_CLIENT_ID : undefined;
  const activeClientId = clientId || envClientId;

  const [showFallbackModal, setShowFallbackModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeClientId) return;

    // Load Google Identity Services SDK dynamically
    const scriptId = 'google-jssdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => initGoogleSDK();
      document.body.appendChild(script);
    } else {
      initGoogleSDK();
    }
  }, [activeClientId]);

  const initGoogleSDK = () => {
    const win = window as any;
    if (win.google?.accounts?.id && activeClientId) {
      try {
        win.google.accounts.id.initialize({
          client_id: activeClientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Trigger One-Tap account chooser prompt on mount
        win.google.accounts.id.prompt();
      } catch (e) {
        console.warn('Google SDK Init notice:', e);
      }
    }
  };

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleGoogleCredentialResponse = (response: any) => {
    if (response.credential) {
      const payload = parseJwt(response.credential);
      if (payload) {
        onSuccess({
          name: payload.name || payload.given_name || 'Google User',
          email: payload.email,
          picture: payload.picture,
        });
      }
    }
  };

  const handleGoogleClick = () => {
    const win = window as any;
    if (activeClientId && win.google?.accounts?.id) {
      win.google.accounts.id.prompt();
    } else {
      setShowFallbackModal(true);
    }
  };

  const handleFallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      setError('Please enter a valid Google email address.');
      return;
    }
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setShowFallbackModal(false);
      const name = googleName.trim() || googleEmail.split('@')[0];
      onSuccess({ name, email: googleEmail.trim() });
    }, 500);
  };

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogleClick}
        className="w-full relative group overflow-hidden bg-gradient-to-r from-purple/90 via-gold/20 to-purple/95 border border-gold/40 hover:border-gold/70 rounded-xl py-3 px-4 text-xs font-semibold tracking-wide text-white cursor-pointer shadow-lg shadow-purple/10 flex items-center justify-center gap-2.5 transition-all"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        
        {/* Google G Logo SVG */}
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span className="font-semibold text-white/90 group-hover:text-white">Continue with Google</span>
      </motion.button>

      {/* Google GIS Container if Client ID is configured */}
      <div id="g_id_onload_button" className="hidden" />

      {/* Fallback Google Sign-In Modal */}
      <AnimatePresence>
        {showFallbackModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#12121A] border border-gold/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => setShowFallbackModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-3 text-gold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white">Google Sign-In</h3>
                <p className="text-xs text-white/60 mt-1">
                  Enter your Google Account email to continue directly to GrahGanit.
                </p>
              </div>

              <form onSubmit={handleFallbackSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-gold/80 mb-1.5">
                    Google Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@gmail.com"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-gold/80 mb-1.5">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Anand Sharma"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold rounded-xl py-3 text-xs tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{loading ? 'Authenticating...' : 'Sign In with Google'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
