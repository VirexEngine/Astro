import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Heart, 
  Briefcase, 
  Activity, 
  User, 
  Award,
  Globe,
  Bot
} from 'lucide-react';
import { PalmistryItem, achievementsList } from './palmData';

interface InfoPanelProps {
  selectedItem: PalmistryItem | null;
  achievements: string[];
  handSide?: 'left' | 'right';
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  selectedItem,
  achievements,
  handSide = 'left',
}) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiConversation, setAiConversation] = useState<{ q: string; a: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim() || !selectedItem) return;

    const question = aiPrompt;
    setAiPrompt('');
    setIsAiLoading(true);

    // Simulate AI response based on the item details and active hand
    setTimeout(() => {
      let answer = "";
      const lowerQ = question.toLowerCase();
      const handLabel = handSide === 'right' ? 'Right Hand (Active Karma)' : 'Left Hand (Inborn Potential)';

      if (lowerQ.includes('simple') || lowerQ.includes('explain')) {
        answer = `On your ${handLabel}, your ${selectedItem.name} represents ${selectedItem.meaning.toLowerCase()} It reflects your active traits like ${selectedItem.traits.slice(0, 2).join(', ')}.`;
      } else if (lowerQ.includes('career') || lowerQ.includes('job') || lowerQ.includes('work')) {
        answer = `For career manifestation on the ${handLabel}, the ${selectedItem.name} points directly towards fields like ${selectedItem.compatibleCareers.join(', ')}.`;
      } else if (lowerQ.includes('love') || lowerQ.includes('relationship') || lowerQ.includes('marriage')) {
        answer = `${selectedItem.relationships} On the ${handLabel}, this shows how you express emotional bonding dynamics.`;
      } else {
        answer = `On the ${handLabel}, modern chiromancy views the ${selectedItem.name} as a direct physiological map of your active decisions and mental habits.`;
      }

      setAiConversation((prev) => [...prev, { q: question, a: answer }]);
      setIsAiLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full lg:w-96 flex flex-col gap-6">
      {/* 1. Main Info Card */}
      <div className="bg-glass-dark border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col gap-5 min-h-[350px]">
        <AnimatePresence mode="wait">
          {selectedItem ? (
            <motion.div
              key={`${selectedItem.id}-${handSide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {/* Hand Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold">
                {handSide === 'right' ? '🤚 Right Palm — Manifested Action & Present Reality' : '✋ Left Palm — Inborn Karma & Potential'}
              </div>

              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-display font-semibold text-white">
                      {selectedItem.name}
                    </h2>
                    {selectedItem.planetSymbol && (
                      <span className="text-xl text-gold" title={`Ruled by ${selectedItem.planet}`}>
                        {selectedItem.planetSymbol}
                      </span>
                    )}
                  </div>
                  {selectedItem.planet && (
                    <p className="text-xs text-gold/80 font-mono tracking-wider uppercase mt-0.5">
                      Planet: {selectedItem.planet}
                    </p>
                  )}
                </div>
                <div className="flex text-gold text-sm gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < selectedItem.rating ? 'opacity-100' : 'opacity-25'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Hand-specific Interpretation */}
              <div className="bg-white/3 border border-white/5 rounded-xl p-3.5 text-sm text-white/80 leading-relaxed">
                {handSide === 'right' ? (
                  <p className="italic">
                    <strong className="text-amber-300 not-italic">Right Hand Focus:</strong> Represents how your active willpower, conscious decisions, and career effort shape your current physical reality. {selectedItem.meaning}
                  </p>
                ) : (
                  <p className="italic">
                    <strong className="text-amber-300 not-italic">Left Hand Focus:</strong> Represents your inherited genetic vitality, subconscious potential, and inborn karmic capacity. {selectedItem.meaning}
                  </p>
                )}
              </div>

              {/* Core Traits */}
              <div>
                <p className="text-[11px] font-mono tracking-widest text-gold uppercase mb-2">Key Archetypes</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.traits.map((trait, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/90 hover:border-gold/30 hover:bg-gold/5 transition-all"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed Accordion Lists */}
              <div className="grid grid-cols-1 gap-3.5 mt-2">
                <div className="text-xs">
                  <span className="text-emerald-400 font-semibold block mb-1">✓ Positive Indications</span>
                  <ul className="list-disc pl-4 text-white/70 space-y-1">
                    {selectedItem.positiveIndications.map((ind, idx) => (
                      <li key={idx}>{ind}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs">
                  <span className="text-amber-400 font-semibold block mb-1">⚠ Challenging Signs</span>
                  <ul className="list-disc pl-4 text-white/70 space-y-1">
                    {selectedItem.challengingIndications.map((ind, idx) => (
                      <li key={idx}>{ind}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Extra Metaphysical Profiles */}
              <div className="border-t border-white/10 pt-4 mt-1 flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-xs text-white/75">
                  <Briefcase className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Compatible Vocations:</span>
                    {selectedItem.compatibleCareers.join(', ')}
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-white/75">
                  <Heart className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Relationship Profile:</span>
                    {selectedItem.relationships}
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-white/75">
                  <Activity className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Somatic Health:</span>
                    {selectedItem.health}
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-white/75">
                  <User className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Prominent Exemplars:</span>
                    {selectedItem.famousPeople.join(', ')}
                  </div>
                </div>
              </div>

              {/* Modern Psychological View */}
              <div className="bg-gold/5 border border-gold/10 rounded-xl p-3 text-xs text-white/80 leading-relaxed flex items-start gap-2">
                <Globe className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gold block mb-0.5">Modern Psychological Lens</span>
                  {selectedItem.modernPsychology}
                </div>
              </div>

              {/* simulated AI Ask Input */}
              <div className="border-t border-white/10 pt-4 mt-2">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-white">
                  <Bot className="w-3.5 h-3.5 text-gold" />
                  <span>Oracle AI Chatbot</span>
                </div>

                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto mb-2 text-xs">
                  {aiConversation.map((chat, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="text-white/50 text-right">"q: {chat.q}"</div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-white/80">
                        {chat.a}
                      </div>
                    </div>
                  ))}
                  {isAiLoading && (
                    <div className="text-white/40 italic flex items-center gap-2">
                      <span className="animate-pulse">Consulting the ether...</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAiAsk} className="relative">
                  <input
                    type="text"
                    placeholder="Ask AI: 'Careers', 'Love life', 'Explain simply'..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-gold/30 rounded-lg pl-3 pr-10 py-2 text-xs text-white outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center hover:bg-gold/10 text-gold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="w-16 h-16 rounded-full border border-gold/20 flex items-center justify-center mb-4 bg-gold/5">
                <Sparkles className="w-8 h-8 text-gold animate-pulse" />
              </div>
              <h3 className="text-lg font-display text-white font-medium mb-1">
                Select a Region
              </h3>
              <p className="text-xs text-white/50 max-w-[200px]">
                Hover or click any line, mount, finger, or special marking to reveal its metaphysical wisdom.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Achievements Panel */}
      <div className="bg-glass-dark border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-2xl flex flex-col gap-4">
        <h3 className="text-sm font-mono tracking-widest text-gold uppercase flex items-center gap-2">
          <Award className="w-4 h-4 text-gold" />
          <span>Palmistry Achievements</span>
        </h3>
        <div className="flex flex-col gap-2.5">
          {achievementsList.map((ach) => {
            const isUnlocked = achievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-gold/10 border-gold/30 text-gold shadow-md'
                    : 'bg-white/3 border-white/5 text-white/40'
                }`}
              >
                <div className="text-2xl">{ach.icon}</div>
                <div>
                  <p className={`text-xs font-semibold ${isUnlocked ? 'text-gold' : 'text-white/60'}`}>
                    {ach.title}
                  </p>
                  <p className="text-[10px] text-white/45 mt-0.5 leading-snug">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
