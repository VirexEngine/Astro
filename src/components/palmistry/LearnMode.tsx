import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  Sparkles,
  Trophy
} from 'lucide-react';
import { quizQuestions, PalmistryItem } from './palmData';

interface LearnModeProps {
  onHighlight: (id: string | null) => void;
  activeItem: PalmistryItem | null;
  onSelectItemById: (id: string) => void;
  onUnlockAchievement: (id: string) => void;
  onClose: () => void;
}

const TOUR_STEPS = [
  { id: 'life-line', prompt: 'Let\'s start with the Life Line. It circles the base of the thumb.', desc: 'Locate the Life Line on the palm and click it to learn about your physical vitality.' },
  { id: 'heart-line', prompt: 'Excellent! Now let\'s check the Heart Line across the upper palm.', desc: 'Click the Heart Line to inspect emotional capacity and romantic nature.' },
  { id: 'head-line', prompt: 'Next is the Head Line. It runs horizontally across the middle of your palm.', desc: 'Select the Head Line to understand intellectual traits and rational focus.' },
  { id: 'mount-jupiter', prompt: 'Now, let\'s explore the Mount of Jupiter under your index finger.', desc: 'Select the Mount of Jupiter to learn about leadership, power, and ambition.' },
  { id: 'marking-mystic-cross', prompt: 'Look at the center of the palm. Can you locate the Mystic Cross?', desc: 'Find the Mystic Cross (X marking) between the Heart and Head lines.' }
];

export const LearnMode: React.FC<LearnModeProps> = ({
  onHighlight,
  activeItem,
  onSelectItemById,
  onUnlockAchievement,
  onClose,
}) => {
  const [mode, setMode] = useState<'intro' | 'tour' | 'quiz' | 'quiz-results'>('intro');
  const [tourIndex, setTourIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswersList, setQuizAnswersList] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Initialize Tour Step
  const startTour = () => {
    setMode('tour');
    setTourIndex(0);
    const targetId = TOUR_STEPS[0].id;
    onSelectItemById(targetId);
    onHighlight(targetId);
  };

  const handleNextTourStep = () => {
    if (tourIndex < TOUR_STEPS.length - 1) {
      const nextIdx = tourIndex + 1;
      setTourIndex(nextIdx);
      const targetId = TOUR_STEPS[nextIdx].id;
      onSelectItemById(targetId);
      onHighlight(targetId);
    } else {
      // Tour completed
      onUnlockAchievement('scholar');
      setMode('quiz');
      setQuizIndex(0);
      setQuizAnswersList([]);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      onHighlight(null);
    }
  };

  const handlePrevTourStep = () => {
    if (tourIndex > 0) {
      const prevIdx = tourIndex - 1;
      setTourIndex(prevIdx);
      const targetId = TOUR_STEPS[prevIdx].id;
      onSelectItemById(targetId);
      onHighlight(targetId);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...quizAnswersList, selectedOption!];
    setQuizAnswersList(newAnswers);

    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz finished
      setMode('quiz-results');
      // Calculate score
      const correctCount = newAnswers.reduce((acc, ans, idx) => {
        return ans === quizQuestions[idx].correctIndex ? acc + 1 : acc;
      }, 0);
      if (correctCount === quizQuestions.length) {
        onUnlockAchievement('quizmaster');
      }
    }
  };

  const restartQuiz = () => {
    setMode('quiz');
    setQuizIndex(0);
    setQuizAnswersList([]);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const currentTourStep = TOUR_STEPS[tourIndex];
  const currentQuestion = quizQuestions[quizIndex];
  const totalCorrect = quizAnswersList.reduce((acc, ans, idx) => {
    return ans === quizQuestions[idx].correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full filter blur-xl pointer-events-none" />

      {/* Intro Mode */}
      {mode === 'intro' && (
        <div className="flex flex-col items-center text-center py-6 gap-4">
          <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5">
            <BookOpen className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold text-white">Academy of Palmistry</h3>
            <p className="text-xs text-white/50 max-w-sm mt-1.5 leading-relaxed">
              Step into the shoes of a mystic. Walk through the key lines and mounts of the palm, then test your knowledge in a cosmic quiz!
            </p>
          </div>
          <div className="flex gap-3 w-full max-w-xs mt-3">
            <button
              onClick={startTour}
              className="flex-1 bg-gold text-cosmos font-semibold text-xs py-3 rounded-xl hover:bg-gold/95 active:scale-98 transition-all"
            >
              Begin Guided Tour
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-white/10 text-white/70 font-semibold text-xs py-3 rounded-xl hover:bg-white/5 active:scale-98 transition-all"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Tour Mode */}
      {mode === 'tour' && currentTourStep && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gold font-mono tracking-widest uppercase">Guided Journey</span>
            <span className="text-white/40 font-mono">Step {tourIndex + 1} of {TOUR_STEPS.length}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden border border-white/5">
            <div 
              className="bg-gold h-full transition-all duration-500" 
              style={{ width: `${((tourIndex + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>

          <div className="py-2">
            <h4 className="text-base font-semibold text-white mb-1.5">
              {currentTourStep.prompt}
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              {currentTourStep.desc}
            </p>
          </div>

          {activeItem && activeItem.id === currentTourStep.id ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Perfect! You have unlocked details of the {activeItem.name}.</span>
            </div>
          ) : (
            <div className="bg-amber-500/5 border border-amber-500/10 text-amber-300 text-xs p-3 rounded-xl flex items-center gap-2 animate-pulse">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Waiting for you to click it on the hand.</span>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
            <button
              onClick={handlePrevTourStep}
              disabled={tourIndex === 0}
              className="flex items-center gap-1 text-xs text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextTourStep}
              disabled={activeItem?.id !== currentTourStep.id}
              className="flex items-center gap-1 bg-gold text-cosmos font-semibold text-xs px-4 py-2 rounded-lg hover:bg-gold/90 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <span>{tourIndex === TOUR_STEPS.length - 1 ? 'Enter Quiz' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Quiz Mode */}
      {mode === 'quiz' && currentQuestion && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gold font-mono tracking-widest uppercase">Palmistry Challenge</span>
            <span className="text-white/40 font-mono">Q {quizIndex + 1} of {quizQuestions.length}</span>
          </div>

          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden border border-white/5">
            <div 
              className="bg-gold h-full transition-all duration-300" 
              style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          <div className="py-1">
            <h4 className="text-sm font-semibold text-white leading-relaxed">
              {currentQuestion.question}
            </h4>
          </div>

          {/* Option list */}
          <div className="flex flex-col gap-2">
            {currentQuestion.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrect = oIdx === currentQuestion.correctIndex;
              const showResult = isAnswerSubmitted;

              return (
                <button
                  key={oIdx}
                  onClick={() => !showResult && setSelectedOption(oIdx)}
                  disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-medium transition-all ${
                    showResult
                      ? isCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : isSelected
                        ? 'bg-red-500/10 border-red-500/40 text-red-400'
                        : 'bg-transparent border-white/5 text-white/30'
                      : isSelected
                      ? 'bg-gold/10 border-gold/40 text-gold shadow-md'
                      : 'bg-white/3 border-white/5 text-white/70 hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{opt}</span>
                    {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswerSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-3 text-[11px] text-white/70 leading-relaxed"
            >
              <strong className="text-white block mb-0.5">Explanation:</strong>
              {currentQuestion.explanation}
            </motion.div>
          )}

          {/* Next controls */}
          <div className="flex justify-end mt-3">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleAnswerSubmit}
                disabled={selectedOption === null}
                className="bg-gold text-cosmos font-semibold text-xs px-5 py-2.5 rounded-lg hover:bg-gold/90 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-gold text-cosmos font-semibold text-xs px-5 py-2.5 rounded-lg hover:bg-gold/90 transition-all flex items-center gap-1"
              >
                <span>{quizIndex === quizQuestions.length - 1 ? 'Show Results' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quiz Results Mode */}
      {mode === 'quiz-results' && (
        <div className="flex flex-col items-center text-center py-6 gap-4">
          <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5 animate-bounce">
            <Trophy className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold text-white">Challenge Complete!</h3>
            <p className="text-2xl font-bold text-gold font-mono mt-2">
              {totalCorrect} / {quizQuestions.length} Correct
            </p>
            <p className="text-xs text-white/50 max-w-sm mt-2 leading-relaxed">
              {totalCorrect === quizQuestions.length 
                ? 'Astounding! You scored a perfect score. The "Grand Master Palmist" achievement is now unlocked in your vault.'
                : 'Great effort! Keep practicing and reading hand maps to achieve absolute mastery.'}
            </p>
          </div>
          <div className="flex gap-3 w-full max-w-xs mt-3">
            <button
              onClick={restartQuiz}
              className="flex-1 bg-gold text-cosmos font-semibold text-xs py-3 rounded-xl hover:bg-gold/95 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-white/10 text-white/70 font-semibold text-xs py-3 rounded-xl hover:bg-white/5 active:scale-98 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
