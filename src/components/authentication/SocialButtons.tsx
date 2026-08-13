import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GoogleAuthButton } from './GoogleAuthButton';

interface SocialButtonsProps {
  onLoginSuccess: (name: string, email: string) => void;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({ onLoginSuccess }) => {
  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Continue with Google (Primary Option) */}
      <GoogleAuthButton
        onSuccess={(user) => onLoginSuccess(user.name, user.email)}
      />

      {/* Apple Login */}
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onLoginSuccess('Rahul Dev', 'rahul.dev@apple.com')}
        className="w-full bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 rounded-xl py-3 px-4 text-xs font-semibold tracking-wide text-white/80 hover:text-white cursor-pointer transition-all flex items-center justify-center gap-2.5"
      >
        <span className="text-sm select-none">🍏</span>
        <span>Continue with Apple</span>
      </motion.button>

      {/* Email Login */}
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onLoginSuccess('Rahul Dev', 'rahul.dev@gmail.com')}
        className="w-full bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 rounded-xl py-3 px-4 text-xs font-semibold tracking-wide text-white/80 hover:text-white cursor-pointer transition-all flex items-center justify-center gap-2.5"
      >
        <Mail className="w-4 h-4 text-white/40 shrink-0" />
        <span>Continue with Email</span>
      </motion.button>
    </div>
  );
};
export default SocialButtons;
