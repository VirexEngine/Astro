import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';

interface DobInputProps {
  value: string; // Format: YYYY-MM-DD
  onChange: (isoDate: string) => void;
  className?: string;
  placeholder?: string;
}

export const DobInput: React.FC<DobInputProps> = ({
  value,
  onChange,
  className = "w-full bg-white/3 border border-white/10 focus:border-gold/30 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none transition-all font-mono pr-10",
  placeholder = "dd/mm/yyyy"
}) => {
  // Convert YYYY-MM-DD to DD/MM/YYYY for display
  const isoToDisplay = (iso: string): string => {
    if (!iso) return '';
    const parts = iso.split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts;
      if (y && m && d) return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
    }
    return iso;
  };

  const [displayValue, setDisplayValue] = useState<string>(() => isoToDisplay(value));
  const hiddenDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDisplayValue(isoToDisplay(value));
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    let formatted = '';
    if (raw.length > 0) {
      formatted = raw.substring(0, 2);
    }
    if (raw.length >= 3) {
      formatted += '/' + raw.substring(2, 4);
    }
    if (raw.length >= 5) {
      formatted += '/' + raw.substring(4, 8);
    }

    setDisplayValue(formatted);

    if (raw.length === 8) {
      const day = parseInt(raw.substring(0, 2), 10);
      const month = parseInt(raw.substring(2, 4), 10);
      const year = parseInt(raw.substring(4, 8), 10);

      if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
        const iso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        onChange(iso);
      }
    } else if (raw.length === 0) {
      onChange('');
    }
  };

  const handleNativePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const iso = e.target.value;
    onChange(iso);
    setDisplayValue(isoToDisplay(iso));
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleTextChange}
        maxLength={10}
        className={className}
      />
      <button
        type="button"
        onClick={() => hiddenDateRef.current?.showPicker ? hiddenDateRef.current.showPicker() : hiddenDateRef.current?.click()}
        className="absolute right-3 text-white/40 hover:text-amber-400 transition-colors p-1"
        title="Open calendar picker"
      >
        <Calendar className="w-4 h-4" />
      </button>
      <input
        ref={hiddenDateRef}
        type="date"
        value={value || ''}
        onChange={handleNativePickerChange}
        className="sr-only opacity-0 absolute pointer-events-none w-0 h-0"
        tabIndex={-1}
      />
    </div>
  );
};
