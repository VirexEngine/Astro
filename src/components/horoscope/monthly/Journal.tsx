import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notebook, Check, Save } from 'lucide-react';

const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'] as const;

export const Journal: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState<typeof WEEKS[number]>('Week 1');
  const [reflectionText, setReflectionText] = useState('');
  const [weeklyNotes, setWeeklyNotes] = useState<Record<string, string>>({
    'Week 1': '',
    'Week 2': '',
    'Week 3': '',
    'Week 4': '',
  });

  useEffect(() => {
    // Load monthly reflection & weekly notes
    const savedRef = localStorage.getItem('grahganit_monthly_reflection_goal') || localStorage.getItem('astraeon_monthly_reflection_goal');
    if (savedRef) {
      setReflectionText(savedRef);
    }
    const savedNotes = localStorage.getItem('grahganit_monthly_weekly_notes') || localStorage.getItem('astraeon_monthly_weekly_notes');
    if (savedNotes) {
      setWeeklyNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleSaveReflection = () => {
    localStorage.setItem('grahganit_monthly_reflection_goal', reflectionText);
    alert('Monthly goal reflection saved successfully!');
  };

  const handleSaveWeekNote = (week: string, text: string) => {
    const updated = { ...weeklyNotes, [week]: text };
    setWeeklyNotes(updated);
    localStorage.setItem('grahganit_monthly_weekly_notes', JSON.stringify(updated));
    alert(`${week} notes updated successfully!`);
  };

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <Notebook className="w-4.5 h-4.5 text-gold animate-pulse" />
            <span>Monthly Reflection Journal</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Log your biggest intentions and compile weekly notes. Data is kept locally on your profile.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Overall goal reflection */}
        <div className="flex flex-col gap-4 bg-white/3 border border-white/5 rounded-2xl p-4">
          <div>
            <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-1.5">
              Monthly Intent
            </label>
            <p className="text-xs font-semibold text-white/85 italic">
              "What is your biggest spiritual, career, or personal goal this month?"
            </p>
          </div>

          <textarea
            rows={3}
            placeholder="e.g. Expand professional networks and schedule meditation..."
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            className="w-full bg-white/3 border border-white/10 focus:border-gold/30 rounded-xl p-3.5 text-xs text-white placeholder-white/20 outline-none resize-none transition-all"
          />

          <button
            onClick={handleSaveReflection}
            disabled={!reflectionText.trim()}
            className="w-full bg-gold text-cosmos font-semibold text-xs py-2.5 rounded-xl hover:bg-gold/95 transition-colors cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Reflection Goal</span>
          </button>
        </div>

        {/* Right: Weekly tabs journal */}
        <div className="flex flex-col gap-4 bg-white/3 border border-white/5 rounded-2xl p-4">
          <div>
            <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-2">
              Weekly Timeline Logs
            </label>
          </div>

          {/* Week Selector tabs */}
          <div className="flex gap-1 bg-white/3 border border-white/5 p-1 rounded-xl">
            {WEEKS.map((wk) => {
              const isActive = activeWeek === wk;
              return (
                <button
                  key={wk}
                  onClick={() => setActiveWeek(wk)}
                  className={`flex-1 text-[10px] font-semibold py-1.5 rounded-lg transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-gold/15 border-gold/30 text-gold shadow-md'
                      : 'text-white/60 hover:text-white border-transparent'
                  }`}
                >
                  {wk}
                </button>
              );
            })}
          </div>

          {/* Active week text area */}
          <div className="flex flex-col gap-3">
            <textarea
              rows={2.5}
              placeholder={`Write down logs, events, or obstacles faced during ${activeWeek}...`}
              value={weeklyNotes[activeWeek]}
              onChange={(e) => setWeeklyNotes({ ...weeklyNotes, [activeWeek]: e.target.value })}
              className="w-full bg-white/3 border border-white/10 focus:border-gold/30 rounded-xl p-3 text-xs text-white placeholder-white/20 outline-none resize-none transition-all"
            />

            <button
              onClick={() => handleSaveWeekNote(activeWeek, weeklyNotes[activeWeek])}
              className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update {activeWeek} Logs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
