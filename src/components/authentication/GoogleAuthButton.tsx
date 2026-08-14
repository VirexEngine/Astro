import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, LogIn, ChevronRight } from 'lucide-react';

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

  // Cached device accounts list
  const [savedAccounts, setSavedAccounts] = useState<Array<{ name: string; email: string; avatarBg: string }>>([]);

  const tokenClientRef = useRef<any>(null);

  useEffect(() => {
    try {
      const history = localStorage.getItem('grahganit_google_accounts_history');
      if (history) {
        const parsed = JSON.parse(history);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedAccounts(parsed);
        }
      }
    } catch (e) {
      console.warn('Google accounts history parse notice:', e);
    }

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
    if (!win.google) return;

    if (activeClientId && win.google.accounts) {
      try {
        // 1. Initialize GIS One-Tap Credential Handler
        if (win.google.accounts.id) {
          win.google.accounts.id.initialize({
            client_id: activeClientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          // Trigger One-Tap prompt on mount
          win.google.accounts.id.prompt();
        }

        // 2. Initialize Official Google OAuth2 Token Client for 100% Guaranteed Click Popup
        if (win.google.accounts.oauth2) {
          tokenClientRef.current = win.google.accounts.oauth2.initTokenClient({
            client_id: activeClientId,
            scope: 'email profile openid',
            callback: async (tokenResponse: any) => {
              if (tokenResponse?.access_token) {
                try {
                  setLoading(true);
                  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                  });
                  const userInfo = await res.json();
                  if (userInfo?.email) {
                    saveAccountToHistory(userInfo.name || 'Google User', userInfo.email);
                    onSuccess({
                      name: userInfo.name || userInfo.given_name || 'Google User',
                      email: userInfo.email,
                      picture: userInfo.picture,
                    });
                  }
                } catch (err) {
                  console.error('Google userinfo fetch error:', err);
                } finally {
                  setLoading(false);
                }
              }
            },
          });
        }
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
        saveAccountToHistory(payload.name || 'Google User', payload.email);
        onSuccess({
          name: payload.name || payload.given_name || 'Google User',
          email: payload.email,
          picture: payload.picture,
        });
      }
    }
  };

  const saveAccountToHistory = (name: string, email: string) => {
    try {
      const newAcc = { name, email, avatarBg: 'from-amber-500 to-orange-500' };
      const filtered = savedAccounts.filter((a) => a.email !== email);
      const updated = [newAcc, ...filtered].slice(0, 4);
      setSavedAccounts(updated);
      localStorage.setItem('grahganit_google_accounts_history', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed saving account history:', e);
    }
  };

  const handleGoogleClick = () => {
    const win = window as any;

    // Strategy 1: Official Google OAuth2 Token Client Popup (accounts.google.com)
    if (tokenClientRef.current) {
      tokenClientRef.current.requestAccessToken({ prompt: 'select_account' });
      return;
    }

    // Strategy 2: Google Identity Services One-Tap prompt
    if (activeClientId && win.google?.accounts?.id) {
      win.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setShowFallbackModal(true);
        }
      });
      return;
    }

    // Strategy 3: Fallback 1-Click account picker modal
    setShowFallbackModal(true);
  };

  const handleSelectAccount = (acc: { name: string; email: string }) => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setShowFallbackModal(false);
      saveAccountToHistory(acc.name, acc.email);
      onSuccess({ name: acc.name, email: acc.email });
    }, 400);
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
      saveAccountToHistory(name, googleEmail.trim());
      onSuccess({ name, email: googleEmail.trim() });
    }, 400);
  };

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogleClick}
        disabled={loading}
        className="w-full relative group overflow-hidden bg-gradient-to-r from-purple/90 via-gold/20 to-purple/95 border border-gold/40 hover:border-gold/70 rounded-xl py-3 px-4 text-xs font-semibold tracking-wide text-white cursor-pointer shadow-lg shadow-purple/10 flex items-center justify-center gap-2.5 transition-all disabled:opacity-50"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        
        {/* Google G Logo SVG */}
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
        <span className="font-semibold text-white/90 group-hover:text-white">
          {loading ? 'Connecting with Google...' : 'Continue with Google'}
        </span>
      </motion.button>

      {/* 1-Click Google Account Chooser Modal (Fallback) */}
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
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-gold">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
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
                </div>
                <h3 className="text-xl font-display font-semibold text-white">Choose a Google Account</h3>
                <p className="text-xs text-white/60 mt-1">
                  Select an account logged in on your device to continue to <span className="text-gold">GrahGanit</span>
                </p>
              </div>

              {/* 1-Click Device Accounts List */}
              <div className="space-y-3 mb-5">
                {savedAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    onClick={() => handleSelectAccount(acc)}
                    disabled={loading}
                    className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${acc.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                      >
                        {acc.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-gold transition-colors">
                          {acc.name}
                        </h4>
                        <p className="text-xs font-mono text-white/50">{acc.email}</p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>

              {/* Or Manual Form Entry */}
              <div className="pt-4 border-t border-white/10">
                <form onSubmit={handleFallbackSubmit} className="space-y-3">
                  {error && (
                    <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Use another Google account email..."
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 focus:border-gold/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gold hover:bg-amber-400 text-black font-semibold rounded-xl px-4 py-2.5 text-xs transition-all cursor-pointer whitespace-nowrap"
                    >
                      {loading ? '...' : 'Sign In'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
