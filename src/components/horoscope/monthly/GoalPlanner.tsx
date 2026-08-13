import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NotebookPen, CheckSquare, Square, Target } from 'lucide-react';

interface Goal {
  id: string;
  category: 'career' | 'health' | 'relationships' | 'finance';
  title: string;
}

interface GoalPlannerProps {
  initialGoals: Goal[];
}

export const GoalPlanner: React.FC<GoalPlannerProps> = ({ initialGoals }) => {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('grahganit_monthly_goals') || localStorage.getItem('astraeon_monthly_goals');
    if (saved) {
      setCompletedIds(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (id: string) => {
    let updated = [...completedIds];
    if (updated.includes(id)) {
      updated = updated.filter((item) => item !== id);
    } else {
      updated.push(id);
    }
    setCompletedIds(updated);
    localStorage.setItem('grahganit_monthly_goals', JSON.stringify(updated));
  };

  const getCategoryProgress = (cat: Goal['category']) => {
    const catGoals = initialGoals.filter((g) => g.category === cat);
    if (catGoals.length === 0) return 0;
    const completed = catGoals.filter((g) => completedIds.includes(g.id));
    return Math.round((completed.length / catGoals.length) * 100);
  };

  const categories = [
    { id: 'career', label: 'Career Goals', icon: '💼', color: 'from-purple to-indigo-500' },
    { id: 'health', label: 'Health Goals', icon: '🌿', color: 'from-emerald-500 to-teal-450' },
    { id: 'relationships', label: 'Relationship Goals', icon: '❤️', color: 'from-rose-500 to-pink-400' },
  ] as const;

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
            <NotebookPen className="w-4.5 h-4.5 text-gold" />
            <span>Interactive Monthly Goal Planner</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Set and track your astrological intentions. Progress is saved locally.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catGoals = initialGoals.filter((g) => g.category === cat.id);
          const progress = getCategoryProgress(cat.id);

          return (
            <div key={cat.id} className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <span className="select-none">{cat.icon}</span>
                  <span>{cat.label}</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-gold">{progress}%</span>
              </div>

              {/* Progress Slider Track */}
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6 }}
                  className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                />
              </div>

              {/* Checklist */}
              <div className="flex flex-col gap-3">
                {catGoals.map((goal) => {
                  const isDone = completedIds.includes(goal.id);
                  return (
                    <div
                      key={goal.id}
                      onClick={() => handleToggle(goal.id)}
                      className="flex items-start gap-2.5 cursor-pointer group text-xs select-none"
                    >
                      <button type="button" className="text-gold mt-0.5 shrink-0 transition-transform group-hover:scale-110">
                        {isDone ? <CheckSquare className="w-4.5 h-4.5" /> : <Square className="w-4.5 h-4.5 text-white/30" />}
                      </button>
                      <span className={`leading-relaxed font-sans transition-colors ${
                        isDone ? 'line-through text-white/35' : 'text-white/70 group-hover:text-white'
                      }`}>
                        {goal.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
