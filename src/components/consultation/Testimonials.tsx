import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
}

const REVIEWS: Review[] = [
  { name: 'Priya Sharma', role: 'UX Designer', rating: 5, text: 'My career guidance session with Acharya Gurudev completely changed my perspective. The transit timing calculations regarding my job shift were astoundingly accurate.' },
  { name: 'Rahul Verma', role: 'Software Engineer', rating: 5, text: 'The relationship matching report detailed minor communication friction triggers. Highly recommended for couples looking for deeper cosmic alignment.' },
  { name: 'Vikram Mehta', role: 'Business Owner', rating: 5, text: 'The financial outlook guidance helped me choose the right date to launch my e-commerce startup. Acharya Gurudev is methodical, patient, and highly knowledgeable.' },
];

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const review = REVIEWS[index];

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-5 items-center">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple/10 rounded-full filter blur-xl pointer-events-none" />

      <div className="text-center flex flex-col items-center gap-1">
        <MessageSquare className="w-5 h-5 text-gold animate-pulse mb-1" />
        <h3 className="text-base font-display font-medium text-white">Seeker Testimonials</h3>
        <p className="text-[10px] text-white/50">Real feedback from individuals who completed consultations.</p>
      </div>

      {/* Slide Carousel Card */}
      <div className="w-full max-w-lg min-h-[130px] flex items-center justify-between gap-4 mt-2">
        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full border border-white/10 bg-white/3 hover:bg-white/5 flex items-center justify-center text-white/60 transition-colors cursor-pointer shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 text-center flex flex-col items-center gap-2">
          <div className="flex gap-0.5 select-none">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-white/80 leading-relaxed font-sans italic max-w-sm"
            >
              "{review.text}"
            </motion.p>
          </AnimatePresence>

          <div className="mt-2 leading-none">
            <span className="text-xs font-semibold text-white block">{review.name}</span>
            <span className="text-[9px] text-white/40 block mt-1 font-mono">{review.role}</span>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full border border-white/10 bg-white/3 hover:bg-white/5 flex items-center justify-center text-white/60 transition-colors cursor-pointer shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
