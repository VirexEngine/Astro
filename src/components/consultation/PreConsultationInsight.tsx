import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Download, Compass, Moon, Sun, Shield, Award, CheckCircle2 } from 'lucide-react';
import { getActiveProfile, generateCosmicProfile, fetchBackendChart, UserProfile } from '@/utils/profile';

interface PreConsultationInsightProps {
  name: string;
  dob: string;
  time: string;
  place: string;
  category: string;
}

const RASHI_SANSKRIT: Record<string, string> = {
  'Aries': 'Mesha (Aries)',
  'Taurus': 'Vrishabha (Taurus)',
  'Gemini': 'Mithuna (Gemini)',
  'Cancer': 'Karka (Cancer)',
  'Leo': 'Simha (Leo)',
  'Virgo': 'Kanya (Virgo)',
  'Libra': 'Tula (Libra)',
  'Scorpio': 'Vrishchika (Scorpio)',
  'Sagittarius': 'Dhanu (Sagittarius)',
  'Capricorn': 'Makara (Capricorn)',
  'Aquarius': 'Kumbha (Aquarius)',
  'Pisces': 'Meena (Pisces)'
};

const NAKSHATRA_LORDS: Record<string, { lord: string; dashaPeriod: string }> = {
  'Ashwini': { lord: 'Ketu', dashaPeriod: 'Ketu-Venus' },
  'Bharani': { lord: 'Venus (Shukra)', dashaPeriod: 'Venus-Sun' },
  'Krittika': { lord: 'Sun (Surya)', dashaPeriod: 'Sun-Moon' },
  'Rohini': { lord: 'Moon (Chandra)', dashaPeriod: 'Moon-Mars' },
  'Mrigashira': { lord: 'Mars (Mangal)', dashaPeriod: 'Mars-Rahu' },
  'Ardra': { lord: 'Rahu', dashaPeriod: 'Rahu-Jupiter' },
  'Punarvasu': { lord: 'Jupiter (Guru)', dashaPeriod: 'Jupiter-Saturn' },
  'Pushya': { lord: 'Saturn (Shani)', dashaPeriod: 'Saturn-Mercury' },
  'Ashlesha': { lord: 'Mercury (Budh)', dashaPeriod: 'Mercury-Ketu' },
  'Magha': { lord: 'Ketu', dashaPeriod: 'Ketu-Venus' },
  'Purva Phalguni': { lord: 'Venus (Shukra)', dashaPeriod: 'Venus-Sun' },
  'Uttara Phalguni': { lord: 'Sun (Surya)', dashaPeriod: 'Sun-Moon' },
  'Hasta': { lord: 'Moon (Chandra)', dashaPeriod: 'Moon-Mars' },
  'Chitra': { lord: 'Mars (Mangal)', dashaPeriod: 'Mars-Rahu' },
  'Svati': { lord: 'Rahu', dashaPeriod: 'Rahu-Jupiter' },
  'Swati': { lord: 'Rahu', dashaPeriod: 'Rahu-Jupiter' },
  'Vishakha': { lord: 'Jupiter (Guru)', dashaPeriod: 'Jupiter-Saturn' },
  'Anuradha': { lord: 'Saturn (Shani)', dashaPeriod: 'Saturn-Mercury' },
  'Jyeshtha': { lord: 'Mercury (Budh)', dashaPeriod: 'Mercury-Ketu' },
  'Mula': { lord: 'Ketu', dashaPeriod: 'Ketu-Venus' },
  'Purva Ashadha': { lord: 'Venus (Shukra)', dashaPeriod: 'Venus-Sun' },
  'Uttara Ashadha': { lord: 'Sun (Surya)', dashaPeriod: 'Sun-Moon' },
  'Shravana': { lord: 'Moon (Chandra)', dashaPeriod: 'Moon-Mars' },
  'Dhanishta': { lord: 'Mars (Mangal)', dashaPeriod: 'Mars-Rahu' },
  'Shatabhisha': { lord: 'Rahu', dashaPeriod: 'Rahu-Jupiter' },
  'Purva Bhadrapada': { lord: 'Jupiter (Guru)', dashaPeriod: 'Jupiter-Saturn' },
  'Uttara Bhadrapada': { lord: 'Saturn (Shani)', dashaPeriod: 'Saturn-Mercury' },
  'Revati': { lord: 'Mercury (Budh)', dashaPeriod: 'Mercury-Ketu' }
};

const PLANET_ATTRIBUTES: Record<string, { luckyColor: string; luckyNumber: number; gem: string }> = {
  'Sun (Surya)': { luckyColor: 'Saffron & Ruby Red', luckyNumber: 1, gem: 'Manikya (Ruby)' },
  'Moon (Chandra)': { luckyColor: 'Pearl White & Silver', luckyNumber: 2, gem: 'Moti (Natural Pearl)' },
  'Jupiter (Guru)': { luckyColor: 'Golden Yellow & Ochre', luckyNumber: 3, gem: 'Pukhraj (Yellow Sapphire)' },
  'Rahu': { luckyColor: 'Electric Blue & Smoke Grey', luckyNumber: 4, gem: 'Gomed (Hessonite)' },
  'Mercury (Budh)': { luckyColor: 'Emerald Green & Mint', luckyNumber: 5, gem: 'Panna (Emerald)' },
  'Venus (Shukra)': { luckyColor: 'Diamond White & Pastel Rose', luckyNumber: 6, gem: 'Heera / White Zircon' },
  'Ketu': { luckyColor: 'Smoky Amber & Brown', luckyNumber: 7, gem: 'Lehsunia (Cat\'s Eye)' },
  'Saturn (Shani)': { luckyColor: 'Royal Navy & Deep Indigo', luckyNumber: 8, gem: 'Neelam (Blue Sapphire)' },
  'Mars (Mangal)': { luckyColor: 'Coral Red & Crimson', luckyNumber: 9, gem: 'Moonga (Red Coral)' }
};

export const PreConsultationInsight: React.FC<PreConsultationInsightProps> = ({
  name,
  dob,
  time,
  place,
  category,
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const computeAccurateChart = async () => {
      setLoading(true);

      // 1. Try reading logged-in profile first
      const loggedProfile = getActiveProfile();
      if (loggedProfile && (!dob || loggedProfile.dob === dob)) {
        if (isMounted) {
          setProfile(loggedProfile);
          setLoading(false);
        }
        return;
      }

      // 2. Fetch live Swiss Ephemeris chart from backend if birth details are provided
      const effectiveDob = dob || loggedProfile?.dob || '1995-05-15';
      const effectiveTime = time || loggedProfile?.time || '10:30';
      const effectivePlace = place || loggedProfile?.place || 'Delhi, India';
      const effectiveName = name || loggedProfile?.name || 'Seeker';

      try {
        const backendChart = await fetchBackendChart({
          name: effectiveName,
          dob: effectiveDob,
          time: effectiveTime,
          place: effectivePlace
        });

        const calculated = generateCosmicProfile({
          name: effectiveName,
          email: loggedProfile?.email || 'seeker@grahganit.in',
          gender: loggedProfile?.gender || 'Male',
          country: loggedProfile?.country || 'India',
          language: loggedProfile?.language || 'English',
          dob: effectiveDob,
          time: effectiveTime,
          place: effectivePlace,
          backendChart: backendChart || undefined
        });

        if (isMounted) {
          setProfile(calculated);
          setLoading(false);
        }
      } catch (err) {
        // High-precision local fallback
        const calculated = generateCosmicProfile({
          name: effectiveName,
          email: loggedProfile?.email || 'seeker@grahganit.in',
          gender: loggedProfile?.gender || 'Male',
          country: loggedProfile?.country || 'India',
          language: loggedProfile?.language || 'English',
          dob: effectiveDob,
          time: effectiveTime,
          place: effectivePlace
        });

        if (isMounted) {
          setProfile(calculated);
          setLoading(false);
        }
      }
    };

    computeAccurateChart();

    return () => {
      isMounted = false;
    };
  }, [name, dob, time, place]);

  // Derived Vedic placements
  const moonSign = profile?.moonSign || 'Leo';
  const ascendantSign = profile?.ascendant || 'Scorpio';
  const nakshatra = profile?.nakshatra || 'Purva Phalguni';
  const dominantPlanet = profile?.dominantPlanet || 'Sun (Surya)';
  const lifePath = profile?.lifePathNumber || 7;

  const nakshatraInfo = NAKSHATRA_LORDS[nakshatra] || {
    lord: dominantPlanet,
    dashaPeriod: `${dominantPlanet.split(' ')[0]}-SubPeriod`
  };

  const planetAttrs = PLANET_ATTRIBUTES[dominantPlanet] || {
    luckyColor: 'Gold & Indigo',
    luckyNumber: lifePath,
    gem: 'Navaratna'
  };

  // Customized precision themes based on chart + consultation package
  const getCategoryDetails = () => {
    switch (category) {
      case 'career':
        return {
          title: 'Career & Professional Destiny Focus',
          themes: [
            `10th House alignment with your ${RASHI_SANSKRIT[ascendantSign] || ascendantSign} Lagna`,
            `Planetary transit velocity of ${dominantPlanet} for promotion & leadership`,
            `Favorable dasha windows for business ventures and career transitions`
          ],
          questions: [
            `How does my ${moonSign} Moon Sign influence my strategic work environment?`,
            `When is the most auspicious planetary window to negotiate higher remuneration?`,
            `Which professional domains best maximize my ${dominantPlanet} ruling energy?`
          ]
        };
      case 'marriage':
        return {
          title: 'Marriage & Relationship Synastry Focus',
          themes: [
            `7th House marital karma & Venus / Jupiter transits for your chart`,
            `Elemental compatibility harmonizing ${moonSign} Moon sensitivity`,
            `Manglik dosha checks and auspicious Muhurta dates for alliances`
          ],
          questions: [
            `What planetary remedies can dissolve delays in finding an aligned partner?`,
            `How do transits across my 7th house affect long-term emotional stability?`,
            `What personality traits in a partner offer maximum spiritual alignment?`
          ]
        };
      case 'finance':
        return {
          title: 'Wealth & Prosperity Engine Focus',
          themes: [
            `2nd & 11th Dhana Bhavas (Wealth Houses) under ${dominantPlanet}`,
            `Investment cycle safety during Saturn / Rahu transit passages`,
            `Karmic remedies to enhance cash flow velocity and asset accumulation`
          ],
          questions: [
            `Which asset classes (real estate, equity, gold) best resonate with my Lagna?`,
            `What is the most auspicious timing to launch high-capital initiatives?`,
            `How can I mitigate ancestral or planetary wealth leakages in my chart?`
          ]
        };
      case 'health':
        return {
          title: 'Vitality & Elemental Wellness Focus',
          themes: [
            `6th House health dynamics and elemental balance (${moonSign} Moon)`,
            `Ayurvedic Dosha (Vata/Pitta/Kapha) tendencies mapped to your Ascendant`,
            `Mantras and gemstone therapy (${planetAttrs.gem}) for nervous energy recovery`
          ],
          questions: [
            `What dietary habits best balance the planetary element of my Lagna?`,
            `How do the upcoming lunar transit cycles influence my physical vitality?`,
            `Which Vedic lifestyle remedies will best support long-term physical vigor?`
          ]
        };
      default:
        return {
          title: 'Comprehensive Life Reading & Karma Focus',
          themes: [
            `Core Dharma alignment and life purpose mapping for ${name || 'Seeker'}`,
            `Vimshottari Dasha progression (${nakshatraInfo.dashaPeriod}) life phases`,
            `Karmic knot dissolution and key destiny milestones for 2026-2029`
          ],
          questions: [
            `What is the primary spiritual and material lesson of my current Dasha cycle?`,
            `When do my major peak transit opportunities unfold over the next 3 years?`,
            `What sacred remedies and rituals will harmonize challenges in my horoscope?`
          ]
        };
    }
  };

  const details = getCategoryDetails();

  const handleDownload = () => {
    const text = `=====================================================
GRAHGANIT OBSERVATORY — PRE-CONSULTATION INSIGHT REPORT
=====================================================
Seeker: ${name || profile?.name || 'Seeker'}
Date of Birth: ${dob || profile?.dob || 'N/A'}
Time of Birth: ${time || profile?.time || 'N/A'}
Place of Birth: ${place || profile?.place || 'N/A'}
Session: ${details.title}

ASTROLOGICAL PLACEMENTS:
• Moon Sign (Chandra Rashi): ${RASHI_SANSKRIT[moonSign] || moonSign}
• Ascendant (Lagna): ${RASHI_SANSKRIT[ascendantSign] || ascendantSign}
• Birth Nakshatra: ${nakshatra} (Lord: ${nakshatraInfo.lord})
• Dominant Planet: ${dominantPlanet}
• Current Dasha Phase: ${nakshatraInfo.dashaPeriod}
• Lucky Number: ${planetAttrs.luckyNumber}
• Lucky Color: ${planetAttrs.luckyColor}
• Beneficial Gemstone: ${planetAttrs.gem}

KEY THEMES TO DISCUSS WITH ACHARYAA SMITA MISHRA:
1. ${details.themes[0]}
2. ${details.themes[1]}
3. ${details.themes[2]}

RECOMMENDED INQUIRY QUESTIONS:
1. ${details.questions[0]}
2. ${details.questions[1]}
3. ${details.questions[2]}

=====================================================
GrahGanit · Greater Noida West, India
Support: grahganit2026@gmail.com
=====================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GrahGanit_PreConsultation_${(name || 'Seeker').replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6 overflow-hidden">
      {/* Mystical glowing gradient accents */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gold/10 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple/10 rounded-full filter blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-3">
        <div>
          <h3 className="text-base font-display font-medium text-gradient-gold flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-gold animate-pulse" />
            <span>AI Pre-Consultation Vedic Insight</span>
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5 font-sans">
            Personalized astronomical analysis calculated for <strong>{name || profile?.name || 'Seeker'}</strong> ({dob || profile?.dob || 'Birth Chart'}).
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="text-[10px] font-mono text-gold hover:text-gold/80 transition-all flex items-center gap-1.5 bg-gold/10 border border-gold/25 hover:border-gold rounded-xl px-3.5 py-2 cursor-pointer shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Summary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Astrological Placements */}
        <div className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-white border-b border-white/5 pb-2 flex items-center justify-between">
            <span>Astrological Placements</span>
            <span className="text-[9px] font-mono text-gold/70 uppercase">Sidereal Vedic</span>
          </h4>
          
          <div className="flex flex-col gap-2 text-[11px] text-white/65 font-sans">
            <div className="flex justify-between items-center">
              <span className="text-white/50">Moon Sign (Rashi)</span>
              <strong className="text-white font-medium">{RASHI_SANSKRIT[moonSign] || moonSign}</strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white/50">Ascendant (Lagna)</span>
              <strong className="text-white font-medium">{RASHI_SANSKRIT[ascendantSign] || ascendantSign}</strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white/50">Birth Nakshatra</span>
              <strong className="text-amber-300 font-medium">{nakshatra}</strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white/50">Ruling Planet</span>
              <strong className="text-white font-medium">{dominantPlanet}</strong>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white/50">Current Dasha</span>
              <strong className="text-emerald-400 font-medium">{nakshatraInfo.dashaPeriod}</strong>
            </div>

            <div className="flex justify-between border-t border-white/5 pt-2 mt-1 text-[10px] font-mono">
              <span className="text-white/40 uppercase">Lucky Number</span>
              <strong className="text-gold">{planetAttrs.luckyNumber}</strong>
            </div>

            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-white/40 uppercase">Lucky Color</span>
              <strong className="text-gold">{planetAttrs.luckyColor}</strong>
            </div>
          </div>
        </div>

        {/* Column 2: Key Themes to Discuss */}
        <div className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-white border-b border-white/5 pb-2">
            Key Themes to Discuss
          </h4>
          <ul className="list-disc pl-4 space-y-2.5 text-[11px] text-white/70 leading-relaxed font-sans">
            {details.themes.map((theme, i) => (
              <li key={i}>{theme}</li>
            ))}
          </ul>
        </div>

        {/* Column 3: Recommended Questions */}
        <div className="p-4 bg-white/3 border border-white/5 rounded-2xl flex flex-col gap-3">
          <h4 className="text-xs font-semibold text-white border-b border-white/5 pb-2">
            Recommended Questions
          </h4>
          <ul className="list-disc pl-4 space-y-2.5 text-[11px] text-white/70 leading-relaxed font-sans">
            {details.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Preparation Tips Banner */}
      <div className="bg-gold/5 border border-gold/15 rounded-2xl p-4 flex items-start gap-3 mt-1">
        <BookOpen className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <div className="text-[11px] text-white/70 leading-relaxed font-sans">
          <strong className="text-white block mb-0.5">Session Preparation Tips:</strong>
          Have your birth details written down clearly. Bring a notepad to record key remedy sequences, mantras, or auspicious dates. Try to join your private Google Meet video room from a quiet space 5 minutes before your scheduled appointment time.
        </div>
      </div>
    </div>
  );
};

export default PreConsultationInsight;
