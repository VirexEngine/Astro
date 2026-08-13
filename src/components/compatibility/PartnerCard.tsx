import React, { useState, useEffect } from 'react';
import { User, Calendar, Clock, MapPin, Globe, FileText, Sparkles } from 'lucide-react';
import { PartnerInput } from '../../types/compatibility';
import { DobInput } from '../common/DobInput';
import { searchCities, CitySearchResult } from '../../utils/locationService';

interface PartnerCardProps {
  title: string;
  avatarIcon: string;
  input: PartnerInput;
  onChange: (field: keyof PartnerInput, value: string) => void;
}

const WORLD_CITIES = [
  'New Delhi, India',
  'Delhi, India',
  'Delhi Cantt, India',
  'Mumbai, Maharashtra, India',
  'Bangalore, Karnataka, India',
  'Kolkata, West Bengal, India',
  'Chennai, Tamil Nadu, India',
  'New York, NY, USA',
  'London, United Kingdom',
  'Paris, France',
  'Tokyo, Japan',
  'Los Angeles, CA, USA',
  'Chicago, IL, USA',
  'Sydney, Australia',
];

export const PartnerCard: React.FC<PartnerCardProps> = ({
  title,
  avatarIcon,
  input,
  onChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<CitySearchResult[]>([]);

  useEffect(() => {
    let active = true;
    if (input.place.trim().length >= 2) {
      searchCities(input.place).then((res) => {
        if (active) setSuggestions(res);
      });
    } else {
      setSuggestions([]);
    }
    return () => { active = false; };
  }, [input.place]);

  return (
    <div className="flex-1 w-full bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative flex flex-col gap-6">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-12 w-24 h-24 bg-purple/5 rounded-full filter blur-xl pointer-events-none" />

      {/* Title Header with avatar */}
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <div className="w-12 h-12 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-2xl shadow-inner animate-pulse">
          {avatarIcon}
        </div>
        <div>
          <h3 className="text-base font-display font-medium text-gradient-gold">
            {title}
          </h3>
          <p className="text-[10px] text-white/45 tracking-widest uppercase font-mono mt-0.5">
            Birth Details &amp; Name
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-5">
        {/* Full Name */}
        <div className="relative">
          <label className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1.5 ml-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={input.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full bg-white/3 border border-white/10 focus:border-gold/30 focus:shadow-[0_0_10px_rgba(212,175,55,0.08)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Gender & DOB Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Gender */}
          <div>
            <label className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1.5 ml-1">
              Gender
            </label>
            <select
              value={input.gender}
              onChange={(e) => onChange('gender', e.target.value)}
              className="w-full bg-white/3 border border-white/10 focus:border-gold/30 focus:shadow-[0_0_10px_rgba(212,175,55,0.08)] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none cursor-pointer transition-all"
            >
              <option value="Male" className="bg-cosmos text-white">Male</option>
              <option value="Female" className="bg-cosmos text-white">Female</option>
              <option value="Other" className="bg-cosmos text-white">Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1.5 ml-1">
              Date of Birth
            </label>
            <DobInput
              value={input.dob}
              onChange={(iso) => onChange('dob', iso)}
            />
          </div>
        </div>

        {/* Time of Birth & Timezone Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Time */}
          <div>
            <label className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1.5 ml-1">
              Birth Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="time"
                value={input.time}
                onChange={(e) => onChange('time', e.target.value)}
                className="w-full bg-white/3 border border-white/10 focus:border-gold/30 focus:shadow-[0_0_10px_rgba(212,175,55,0.08)] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white outline-none cursor-pointer transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1.5 ml-1">
              Timezone
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="text"
                placeholder="GMT+5:30"
                value={input.timezone}
                onChange={(e) => onChange('timezone', e.target.value)}
                className="w-full bg-white/3 border border-white/10 focus:border-gold/30 focus:shadow-[0_0_10px_rgba(212,175,55,0.08)] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Place of Birth */}
        <div className="relative">
          <label className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1.5 ml-1">
            Birth Place
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="e.g. New Delhi, India"
              value={input.place}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              onChange={(e) => {
                onChange('place', e.target.value);
                setShowDropdown(true);
              }}
              className="w-full bg-white/3 border border-white/10 focus:border-gold/30 focus:shadow-[0_0_10px_rgba(212,175,55,0.08)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all"
            />
          </div>

          {/* Autocomplete Dropdown List */}
          {showDropdown && (suggestions.length > 0 || input.place.trim()) && (
            <div className="absolute left-0 right-0 top-[100%] mt-1 bg-[#0f1122]/95 border border-white/10 rounded-xl max-h-40 overflow-y-auto z-30 shadow-2xl backdrop-blur-md py-1">
              {suggestions.map((city) => (
                <button
                  key={city.place_id}
                  type="button"
                  onMouseDown={() => {
                    onChange('place', city.display_name);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[11px] text-white/80 hover:text-gold hover:bg-white/5 flex items-center gap-2 border-b border-white/5 last:border-0 transition-colors font-sans"
                >
                  <MapPin className="w-3 h-3 text-gold/60 shrink-0" />
                  <span className="truncate">{city.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notes Optional */}
        <div>
          <label className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1.5 ml-1">
            Optional Notes
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
            <textarea
              placeholder="Any details to enrich reading (optional)..."
              value={input.notes || ''}
              onChange={(e) => onChange('notes', e.target.value)}
              rows={2}
              className="w-full bg-white/3 border border-white/10 focus:border-gold/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/20 outline-none resize-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
