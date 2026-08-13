import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Link2, Check, Sparkles } from 'lucide-react';

interface ShareCardProps {
  score: number;
  rating: string;
  partnerAName: string;
  partnerBName: string;
}

export const ShareCard: React.FC<ShareCardProps> = ({
  score,
  rating,
  partnerAName,
  partnerBName,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Simulated PDF download alert
    alert('Generating premium Vedic Synastry PDF report... download starting shortly!');
  };

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col gap-6 items-center">
      {/* Glow backgrounds */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple/10 rounded-full filter blur-2xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold/10 rounded-full filter blur-2xl" />

      <div className="text-center">
        <h3 className="text-lg font-display font-medium text-white flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4 text-gold" />
          <span>Share Your Cosmic Harmony</span>
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Export your compatibility report or share it with friends and family.
        </p>
      </div>

      {/* Premium Visual Share Badge */}
      <div className="w-full max-w-sm p-6 rounded-2xl bg-gradient-to-br from-purple/20 via-cosmos to-gold/10 border border-white/10 text-center flex flex-col items-center gap-3 shadow-xl">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-gold/30 bg-gold/5 text-[9px] font-mono tracking-widest text-gold uppercase">
          <Sparkles className="w-3 h-3 animate-spin-slow" />
          <span>GrahGanit Synastry Certificate</span>
        </div>

        <div className="my-2">
          <p className="text-4xl font-mono font-bold text-white tracking-tighter">{score}% MATCH</p>
          <p className="text-sm font-display text-gradient-gold font-medium mt-1">{rating}</p>
        </div>

        <p className="text-xs text-white/60 font-sans border-t border-white/5 pt-3 w-full">
          Cosmic alignment between <strong className="text-white">{partnerAName}</strong> &amp; <strong className="text-white">{partnerBName}</strong>
        </p>
      </div>

      {/* Sharing buttons */}
      <div className="w-full max-w-sm flex flex-wrap gap-2 pt-2 z-10">
        <button
          onClick={handleDownload}
          className="flex-1 min-w-[110px] bg-gold text-cosmos font-semibold text-xs py-2.5 rounded-xl hover:bg-gold/95 transition-all flex items-center justify-center gap-1.5 active:scale-97"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download PDF</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex-1 min-w-[110px] bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 rounded-xl active:scale-97"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
