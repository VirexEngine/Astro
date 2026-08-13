import React, { useState, useMemo } from 'react';
import { Search, Filter, Compass, Moon, Sparkles } from 'lucide-react';
import { palmistryItems, PalmistryItem } from './palmData';

interface LegendProps {
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export const Legend: React.FC<LegendProps> = ({
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'lines' | 'mounts' | 'fingers' | 'markings'>('all');

  const filteredItems = useMemo(() => {
    return palmistryItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.planet && item.planet.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'lines', label: 'Lines' },
    { id: 'mounts', label: 'Mounts' },
    { id: 'fingers', label: 'Fingers' },
    { id: 'markings', label: 'Markings' },
  ] as const;

  return (
    <div className="w-full lg:w-96 flex flex-col gap-6 bg-glass-dark border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-xl font-display font-medium text-gradient-gold flex items-center gap-2">
          <Compass className="w-5 h-5 text-gold animate-spin-slow" />
          <span>Hand Geography</span>
        </h3>
        <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-white/50">
          {palmistryItems.length} Regions
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          placeholder="Search lines, mounts, planets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 focus:border-gold/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-all"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 border border-white/5 rounded-xl">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`flex-1 text-[11px] sm:text-xs font-medium py-1.5 rounded-lg transition-all ${
              activeFilter === cat.id
                ? 'bg-gold/15 text-gold border border-gold/30'
                : 'text-white/60 hover:text-white border border-transparent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Item List */}
      <div className="flex-1 max-h-[350px] lg:max-h-[500px] overflow-y-auto custom-scrollbar flex flex-col gap-1.5 pr-1">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isSelected = selectedId === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <button
                key={item.id}
                onMouseEnter={() => onHover(item.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                  isSelected
                    ? 'bg-gold/10 border-gold/40 text-gold shadow-lg shadow-gold/5'
                    : isHovered
                    ? 'bg-white/5 border-white/20 text-white translate-x-1'
                    : 'bg-transparent border-transparent text-white/70 hover:bg-white/3'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border transition-all ${
                    isSelected ? 'bg-gold/20 border-gold/30' : 'bg-white/5 border-white/10'
                  }`}>
                    {item.planetSymbol ? (
                      <span className="font-serif">{item.planetSymbol}</span>
                    ) : item.category === 'lines' ? (
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-gold" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold transition-all ${isSelected ? 'text-gold' : 'text-white'}`}>
                      {item.name}
                    </p>
                    <p className="text-[10px] text-white/40 capitalize tracking-wider font-mono mt-0.5">
                      {item.category} {item.planet && `• ${item.planet}`}
                    </p>
                  </div>
                </div>

                <div className={`text-[10px] rounded-md px-2 py-0.5 border ${
                  isSelected ? 'border-gold/30 bg-gold/5 text-gold' : 'border-white/10 bg-white/5 text-white/40'
                }`}>
                  ★ {item.rating}
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center py-8 text-white/30 text-sm">
            No palmistry regions match your search.
          </div>
        )}
      </div>
    </div>
  );
};
