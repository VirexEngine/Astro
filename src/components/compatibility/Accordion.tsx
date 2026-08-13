import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { CompatibilityReport } from '../../types/compatibility';

interface AccordionProps {
  report: CompatibilityReport;
}

export const Accordion: React.FC<AccordionProps> = ({ report }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sections = [
    {
      title: 'Romantic Affinity (Love)',
      influence: 'Venus & Moon positions',
      score: report.metrics[0].score,
      meaning: 'Vedic astrology assesses romance through the position of the Moon (emotional needs) and Venus (love expression).',
      explanation: report.metrics[0].detailedMeaning,
      recommendations: report.metrics[0].recommendations,
    },
    {
      title: 'Commitment & Longevity (Marriage)',
      influence: 'Saturn & Jupiter aspects',
      score: report.metrics[1].score,
      meaning: 'Long-term bonding requires the structural discipline of Saturn and the supportive wisdom of Jupiter.',
      explanation: report.metrics[1].detailedMeaning,
      recommendations: report.metrics[1].recommendations,
    },
    {
      title: 'Cognitive Flow (Communication)',
      influence: 'Mercury positions',
      score: report.metrics[2].score,
      meaning: 'How you express logic, handle disputes, and discuss goals is governed by Mercury.',
      explanation: report.metrics[2].detailedMeaning,
      recommendations: report.metrics[2].recommendations,
    },
    {
      title: 'Friendship & Playfulness',
      influence: 'Third & Eleventh houses',
      score: Math.round((report.metrics[0].score + report.metrics[2].score) / 2),
      meaning: 'Friendship is the fundamental foundation of any romantic relationship. Governed by solar houses.',
      explanation: 'A balanced placement here ensures that you can spend hours talking about trivial topics, laughing together, and acting as best friends.',
      recommendations: ['Maintain mutual hobbies outside home chores', 'Support each other\'s personal friend circles.'],
    },
    {
      title: 'Career Synergy',
      influence: 'Tenth House placements',
      score: Math.round((report.metrics[4].score + report.metrics[2].score) / 2),
      meaning: 'If co-creating a business or work environment, the Tenth house rules authority and co-execution.',
      explanation: report.aiInsights.career,
      recommendations: ['Keep office tasks and personal home lives separate', 'Establish clear roles based on personal strengths.'],
    },
    {
      title: 'Financial Co-creation',
      influence: 'Second House & Earth signs',
      score: report.metrics[4].score,
      meaning: 'Money values dictate security. Governed by Earth elements and Second house placements.',
      explanation: report.metrics[4].detailedMeaning,
      recommendations: report.metrics[4].recommendations,
    },
    {
      title: 'Children & Progeny',
      influence: 'Fifth House aspects',
      score: report.metrics[5].score - 3,
      meaning: 'Progeny and children plans are governed by Jupiter (Karaka of kids) and the Fifth house.',
      explanation: 'Harmonious Fifth house placements indicate that child-rearing will feel like a cooperative, natural, and joyful process.',
      recommendations: ['Discuss parental values early on', 'Support each other\'s parenting decisions in front of children.'],
    },
    {
      title: 'Health & Vitality Integration',
      influence: 'Sixth House placements',
      score: Math.round((report.metrics[0].score + report.metrics[5].score) / 2),
      meaning: 'Vedic charts chart health compatibility through Sixth and Eighth houses.',
      explanation: 'A positive health score ensures that you physically energize each other, keeping daily routines healthy and supportive of wellness.',
      recommendations: ['Encourage shared healthy eating and workouts', 'Support early rest and sleep schedules.'],
    },
    {
      title: 'Spiritual Expansion & Evolution',
      influence: 'Ninth & Twelfth Houses',
      score: report.overallScore + 4,
      meaning: 'Spiritual growth is the ultimate purpose of karmic unions. Rules by Ninth house (philosophy) and Twelfth house (liberation).',
      explanation: report.aiInsights.spiritual,
      recommendations: ['Practice meditation together', 'Respect differences in personal beliefs.'],
    },
  ];

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-display font-medium text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Detailed Synastry Breakdown</span>
        </h3>
        <p className="text-xs text-white/50 mt-1">
          Deep dive calculations across every key aspect of your relational compatibility.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {sections.map((sec, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className="border border-white/5 rounded-2xl overflow-hidden bg-white/3 transition-colors"
            >
              {/* Header Button */}
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-white/3 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                  <span className="text-sm font-semibold text-white">{sec.title}</span>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
                    {sec.influence}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono font-bold text-gold">{sec.score}%</span>
                  <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-white/5 flex flex-col gap-3.5 bg-black/20 text-xs text-white/70 leading-relaxed font-sans">
                      <div>
                        <strong className="text-white block mb-0.5">Vedic Concept:</strong>
                        {sec.meaning}
                      </div>

                      <div>
                        <strong className="text-white block mb-0.5">Your Placements Analysis:</strong>
                        {sec.explanation}
                      </div>

                      <div className="mt-1">
                        <strong className="text-gold block mb-1">Recommended Adjustments:</strong>
                        <ul className="list-disc pl-4 space-y-1">
                          {sec.recommendations.map((rec, rIdx) => (
                            <li key={rIdx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
