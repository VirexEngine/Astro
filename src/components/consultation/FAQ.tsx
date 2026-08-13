import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  { question: 'How long is the consultation and how is it conducted?', answer: 'Sessions range from 45 to 90 minutes depending on the selected package. All consultations are conducted online via secure video calls (Google Meet link is sent automatically in the email receipt).' },
  { question: 'What details do I need to prepare before the session?', answer: 'You will need your exact date of birth, exact time of birth (preferably from a birth certificate), and city of birth. Having these prepared ensures maximum chart calculation accuracy.' },
  { question: 'Can I reschedule or cancel my booking?', answer: 'Yes! You can reschedule or cancel your session up to 24 hours before the scheduled time by clicking the link in your email receipt. Cancellations inside 24 hours incur a minor booking fee.' },
  { question: 'Will I receive a recording of the session?', answer: 'Yes, if you select the optional recording flag during Step 4 of the wizard, a link to download the video recording will be shared with you alongside your PDF report.' },
  { question: 'What is the refund policy?', answer: 'We offer full refunds for cancellations made 24 hours or more before the scheduled session. Refunds are processed back to your original payment method in 3-5 business days.' },
];

export const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      <div>
        <h3 className="text-base font-display font-medium text-white flex items-center gap-2">
          <HelpCircle className="w-4.5 h-4.5 text-gold" />
          <span>Frequently Asked Questions</span>
        </h3>
        <p className="text-[10px] text-white/50 mt-0.5">
          Everything you need to know about the consultation booking, rescheduling, and reports.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {FAQS.map((faq, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className="border border-white/5 rounded-2xl overflow-hidden bg-white/3 transition-colors"
            >
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-white/3 transition-all"
              >
                <span className="text-xs font-semibold text-white">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-white/5 bg-black/20 text-xs text-white/60 leading-relaxed font-sans">
                      {faq.answer}
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
