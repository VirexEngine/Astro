import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PartnerCard } from './PartnerCard';
import { PartnerInput } from '../../types/compatibility';
import { Sparkles } from 'lucide-react';
import { getActiveProfile } from '../../utils/profile';

interface CompatibilityFormProps {
  onCalculate: (pA: PartnerInput, pB: PartnerInput) => void;
  isLoading: boolean;
}

const initialPartnerInput = (nameDefault: string): PartnerInput => ({
  name: nameDefault,
  gender: 'Male',
  dob: '',
  time: '12:00',
  place: '',
  timezone: 'GMT+5:30',
  notes: '',
});

export const CompatibilityForm: React.FC<CompatibilityFormProps> = ({
  onCalculate,
  isLoading,
}) => {
  const [partnerA, setPartnerA] = useState<PartnerInput>(initialPartnerInput(''));
  const [partnerB, setPartnerB] = useState<PartnerInput>(initialPartnerInput(''));

  useEffect(() => {
    const profile = getActiveProfile();
    if (profile) {
      setPartnerA({
        name: profile.name,
        gender: profile.gender as any,
        dob: profile.dob,
        time: profile.time,
        place: profile.place,
        timezone: 'GMT+5:30',
        notes: '',
      });
    }
  }, []);

  const handlePartnerAChange = (field: keyof PartnerInput, value: string) => {
    setPartnerA((prev) => ({ ...prev, [field]: value }));
  };

  const handlePartnerBChange = (field: keyof PartnerInput, value: string) => {
    setPartnerB((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(partnerA, partnerB);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6 items-start w-full">
        {/* Partner One column */}
        <PartnerCard
          title="Partner One (Shiva)"
          avatarIcon="☉"
          input={partnerA}
          onChange={handlePartnerAChange}
        />

        {/* Partner Two column */}
        <PartnerCard
          title="Partner Two (Shakti)"
          avatarIcon="☽"
          input={partnerB}
          onChange={handlePartnerBChange}
        />
      </div>

      {/* Large Submit CTA Button */}
      <div className="w-full flex justify-center mt-2 z-10">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-80 relative group overflow-hidden bg-gradient-to-r from-purple via-gold to-purple/85 text-white font-semibold text-xs uppercase tracking-widest py-4 px-6 rounded-2xl shadow-xl shadow-purple/15 active:scale-97 transition-all hover:shadow-gold/25 hover:scale-101 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none border border-gold/20"
        >
          {/* Radial gold glow background on hover */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Golden particles traveling across on hover */}
          <div className="absolute inset-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Shimmer sweep bar */}
          <motion.div
            className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
            initial={{ x: '-150%' }}
            animate={{ x: '350%' }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
          />
          
          <Sparkles className="w-4 h-4 text-white animate-pulse group-hover:rotate-12 transition-transform" />
          <span>{isLoading ? 'Decrypting Stars...' : 'Calculate Compatibility'}</span>
        </button>
      </div>
    </form>
  );
};
