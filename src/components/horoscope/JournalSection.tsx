import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notebook, Bell, Sparkles, Trophy, FireExtinguisher, Moon } from 'lucide-react';

export const JournalSection: React.FC = () => {
  const [reflection, setReflection] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const [streak, setStreak] = useState(7);
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Load local storage items
    const note = localStorage.getItem('grahganit_journal_note') || localStorage.getItem('astraeon_journal_note');
    if (note) {
      setReflection(note);
      setSavedNote(note);
    }
    const savedStreak = localStorage.getItem('grahganit_cosmic_streak') || localStorage.getItem('astraeon_cosmic_streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('grahganit_journal_note', reflection);
    setSavedNote(reflection);
    alert('Reflection saved to your local GrahGanit profile!');
  };

  const handleAnalyze = () => {
    if (!reflection.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiSummary(`Oracle Analysis: Your reflection indicates a desire to harmonize emotional depth with daily actions. Under the Libra Moon, focus on balancing personal boundaries while welcoming cooperative career conversations.`);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-3">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <Notebook className="w-4 h-4 text-gold" />
            <span>Daily Reflection &amp; Rituals</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Log your daily growth, build streaks, and get custom AI summaries of your lessons.
          </p>
        </div>

        {/* 7-Day Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-400 text-xs font-mono font-semibold">
          <span>🔥</span>
          <span>{streak}-Day Cosmic Streak</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Reflection Area */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-1.5">
              Today's Reflection Prompt
            </label>
            <p className="text-xs font-semibold text-white/80 italic">
              "What was today's biggest cosmic lesson or synchronization?"
            </p>
          </div>

          <textarea
            rows={3}
            placeholder="Write down your thoughts, events, or synchronicities here..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-white/3 border border-white/10 focus:border-gold/30 rounded-xl p-3.5 text-xs text-white placeholder-white/20 outline-none resize-none transition-all"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={!reflection.trim()}
              className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-40"
            >
              Save Reflection
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!reflection.trim() || isAnalyzing}
              className="flex-1 bg-gold text-cosmos font-semibold text-xs py-2.5 rounded-xl hover:bg-gold/95 transition-colors cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAnalyzing ? 'Analyzing...' : 'AI Summary'}</span>
            </button>
          </div>

          {/* AI Reflection Summary Box */}
          <AnimatePresence>
            {aiSummary && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 bg-gold/5 border border-gold/15 rounded-xl text-[11px] text-white/80 leading-relaxed font-sans"
              >
                {aiSummary}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Daily Challenge & Notifications */}
        <div className="flex flex-col gap-5 justify-between">
          {/* Daily Challenge Card */}
          <div className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-2 relative overflow-hidden">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gold" />
              <h4 className="text-xs font-semibold text-white">Today's Daily Challenge</h4>
            </div>
            <p className="text-[11px] text-white/60 leading-normal">
              Spend exactly <strong className="text-white">15 minutes</strong> in quiet meditation or away from social devices after sunset.
            </p>
            <button
              onClick={() => {
                setChallengeCompleted(true);
                setStreak(prev => {
                  const val = prev + 1;
                  localStorage.setItem('grahganit_cosmic_streak', String(val));
                  return val;
                });
              }}
              disabled={challengeCompleted}
              className={`w-full text-xs font-semibold py-2 rounded-xl border transition-all mt-1 cursor-pointer ${
                challengeCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 cursor-default'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
              }`}
            >
              {challengeCompleted ? '✓ Challenge Completed (+1 Streak)' : 'Complete Challenge'}
            </button>
          </div>

          {/* Morning cosmic brief email notification brief */}
          <div className="flex items-center justify-between p-4 bg-white/3 border border-white/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-gold shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-white">Morning Cosmic Brief</h4>
                <p className="text-[10px] text-white/40 leading-snug">Notify me every morning at 8:00 AM</p>
              </div>
            </div>

            <button
              onClick={() => setNotifEnabled(!notifEnabled)}
              className={`w-11 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                notifEnabled ? 'bg-gold' : 'bg-white/10'
              }`}
            >
              <motion.div
                layout
                className="w-5 h-5 rounded-full bg-cosmos shadow-md"
                animate={{ x: notifEnabled ? 20 : 0 }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
