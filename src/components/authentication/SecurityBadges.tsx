import React from 'react';
import { ShieldAlert, ShieldCheck, EyeOff } from 'lucide-react';

export const SecurityBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 border-t border-white/5 pt-4 mt-1.5 text-[9px] font-mono text-white/40 uppercase tracking-wider">
      <span className="flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Secure Auth</span>
      </span>
      <span className="flex items-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
        <span>Encrypted Birth Data</span>
      </span>
      <span className="flex items-center gap-1.5">
        <EyeOff className="w-3.5 h-3.5 text-purple shrink-0" />
        <span>Private Profile</span>
      </span>
    </div>
  );
};
export default SecurityBadges;
