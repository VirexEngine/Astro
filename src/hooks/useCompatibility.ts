import { useState } from 'react';
import { PartnerInput, CompatibilityReport } from '../types/compatibility';
import { generateCompatibilityReport } from '../services/compatibilityEngine';

export const useCompatibility = () => {
  const [report, setReport] = useState<CompatibilityReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const calculate = async (partnerA: PartnerInput, partnerB: PartnerInput) => {
    // Basic Validation
    if (!partnerA.name || !partnerA.dob || !partnerB.name || !partnerB.dob) {
      setError('Please fill in all required fields for both partners.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setReport(null);

    const stages = [
      'Reading Birth Charts...',
      'Computing Planetary Positions...',
      'Calculating Numerology...',
      'Consulting Ancient Wisdom...',
      'Preparing Report...'
    ];

    try {
      // Step-by-step loading stage simulator to create a premium, immersive feel
      for (let i = 0; i < stages.length; i++) {
        setLoadingStage(stages[i]);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      const generatedReport = generateCompatibilityReport(partnerA, partnerB);
      setReport(generatedReport);
    } catch (e) {
      setError('An error occurred while calculating compatibility. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingStage('');
    }
  };

  const reset = () => {
    setReport(null);
    setIsLoading(false);
    setLoadingStage('');
    setError(null);
  };

  return {
    report,
    isLoading,
    loadingStage,
    error,
    calculate,
    reset,
  };
};
