import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle, Send } from 'lucide-react';

interface AIOracleProps {
  sign: string;
  mood: string;
}

export const AIOracle: React.FC<AIOracleProps> = ({ sign, mood }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'oracle'; text: string }[]>([
    { sender: 'oracle', text: `Welcome, seeker. I am the GrahGanit Oracle. Ask me anything about your daily forecast for ${sign} while in a ${mood} state.` }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setQuery('');
    setIsTyping(true);

    // Simulate Oracle Response based on keywords
    setTimeout(() => {
      let reply = `Under today's sky for ${sign}, the alignments suggest taking a thoughtful pause before making major adjustments. Focus your ${mood} energy inward.`;
      
      const q = userMessage.toLowerCase();
      if (q.includes('travel')) {
        reply = `Today's travel forecasts for ${sign} are favorable, particularly in the afternoon. Avoid rushing between 12 PM and 2 PM as the transit alignments are slightly crowded.`;
      } else if (q.includes('career') || q.includes('job') || q.includes('work')) {
        reply = `Your career paths are highly energized by Mars in Gemini. Communication flows easily. Make sure to schedule critical interviews or negotiations after 3 PM for maximum impact.`;
      } else if (q.includes('love') || q.includes('relationship') || q.includes('partner')) {
        reply = `With the Moon in Libra, relationships demand balance and active listening. Share your ${mood} vibrations with your partner to dissolve minor friction.`;
      } else if (q.includes('money') || q.includes('finance') || q.includes('buy')) {
        reply = `Mercury Retrograde suggests postponing large financial signatures or impulsive investments. Wait until tomorrow's lunar transition to seal important contracts.`;
      }

      setMessages((prev) => [...prev, { sender: 'oracle', text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6 overflow-hidden">
      {/* Mystical purple glow behind orb */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-48 bg-purple/10 rounded-full filter blur-[50px] pointer-events-none" />

      <div className="text-center">
        <h3 className="text-base font-display font-medium text-white flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold animate-spin-slow" />
          <span>Ask the Cosmic Oracle</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Consult the Oracle regarding your transits, love, career, or daily decisions.
        </p>
      </div>

      {/* Glass Oracle Orb */}
      <div className="flex flex-col items-center justify-center py-4 relative z-10">
        <motion.div
          animate={isTyping ? {
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(124,58,237,0.3)',
              '0 0 45px rgba(212,175,55,0.5)',
              '0 0 20px rgba(124,58,237,0.3)'
            ]
          } : {
            scale: 1,
            boxShadow: '0 0 25px rgba(124,58,237,0.2)'
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full border border-gold/30 bg-gradient-to-br from-purple via-cosmos to-gold/40 flex items-center justify-center text-3xl shadow-xl select-none cursor-pointer"
        >
          🔮
        </motion.div>
        {isTyping && (
          <span className="text-[8px] font-mono tracking-widest text-gold mt-2 uppercase animate-pulse">
            Oracle Consulting Stars...
          </span>
        )}
      </div>

      {/* Message Feed Display */}
      <div className="w-full bg-black/25 border border-white/5 rounded-2xl p-4 h-48 overflow-y-auto flex flex-col gap-3 font-sans text-xs scrollbar-thin">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
              msg.sender === 'user'
                ? 'self-end bg-gold/10 border border-gold/20 text-white/95'
                : 'self-start bg-white/3 border border-white/5 text-white/80'
            }`}
          >
            {msg.sender === 'oracle' && (
              <span className="font-semibold text-gold block mb-1 text-[9px] uppercase tracking-wider font-mono">
                GrahGanit Oracle
              </span>
            )}
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Form Box */}
      <form onSubmit={handleSend} className="w-full flex gap-2 z-10 relative">
        <input
          type="text"
          placeholder="e.g. Should I sign career contracts today?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isTyping}
          className="flex-1 bg-white/3 border border-white/10 focus:border-gold/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/25 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={isTyping || !query.trim()}
          className="w-10 h-10 rounded-xl bg-gold text-cosmos hover:bg-gold/95 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:pointer-events-none active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
