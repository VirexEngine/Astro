import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  Compass, 
  Hand,
  Maximize2
} from 'lucide-react';
import { PalmLines } from './PalmLines';
import { PalmMounts } from './PalmMounts';
import { PalmLabels } from './PalmLabels';
import { palmistryItems, PalmistryItem } from './palmData';

interface PalmOutlineProps {
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  viewMode: 'normal' | 'anatomy' | 'palmistry' | 'planet';
  setViewMode: (mode: 'normal' | 'anatomy' | 'palmistry' | 'planet') => void;
  handSide?: 'left' | 'right';
}

export const PalmOutline: React.FC<PalmOutlineProps> = ({
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  viewMode,
  setViewMode,
  handSide = 'left',
}) => {
  // Zoom & Pan states
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch state for mobile pinch zoom
  const touchStartDist = useRef<number | null>(null);
  const touchStartScale = useRef<number>(1);

  // 3D Tilt Spring Animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-300, 300], [-10, 10]), springConfig);

  // Spotlight Cursor positions
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Update spotlight
    setSpotlightPos({ x: mouseX, y: mouseY });

    // Update tilt coordinates
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set(mouseX - centerX);
    y.set(mouseY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Zoom & Pan mouse handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.08;
    let newScale = scale + (e.deltaY < 0 ? zoomFactor : -zoomFactor);
    newScale = Math.max(1, Math.min(newScale, 3.5));
    setScale(newScale);
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMoveDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Mobile Touch handlers (pinch zoom & drag pan)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      dragStart.current = { x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y };
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDist.current = dist;
      touchStartScale.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y,
      });
    } else if (e.touches.length === 2 && touchStartDist.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDist.current;
      let newScale = touchStartScale.current * factor;
      newScale = Math.max(1, Math.min(newScale, 3.5));
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartDist.current = null;
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Keyboard navigation & zoom support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '=' || e.key === '+') {
        setScale((prev) => Math.min(prev + 0.15, 3.5));
      } else if (e.key === '-') {
        setScale((prev) => {
          const next = Math.max(prev - 0.15, 1);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === 'Escape') {
        resetZoom();
        onSelect('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center gap-6 relative">
      {/* 1. View Toggles (Apple VisionOS look) */}
      <div className="flex bg-glass-dark border border-white/10 rounded-full p-1 shadow-xl backdrop-blur-md z-20">
        {(['normal', 'anatomy', 'palmistry', 'planet'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              viewMode === mode
                ? 'bg-gold text-cosmos shadow-md font-bold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* 2. Interactive Hand Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full aspect-square max-w-[600px] border border-white/10 rounded-3xl bg-black relative overflow-hidden shadow-2xl"
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* Spotlight Follower Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle 200px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(212, 175, 55, 0.05), transparent 80%)`,
          }}
        />

        {/* 3. 3D Tilt and Transform Wrapper */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            x: position.x,
            y: position.y,
            scale,
          }}
          className="w-full h-full origin-center relative transition-transform duration-75 select-none touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveDrag}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Interactive SVG Overlay */}
          <svg
            viewBox="0 0 1000 1000"
            className="absolute inset-0 w-full h-full select-none"
          >
            {/* Hand Elements Group with Right-Hand Mirroring */}
            <g transform={handSide === 'right' ? "translate(1000, 0) scale(-1, 1)" : undefined}>
            {/* Base Layer: High-Quality Palm Photo rendered inside the SVG for perfect coordination */}
            <image
              href="/images/palm_base.png"
              x="-70"
              y="-115"
              width="1140"
              height="1140"
              className={`transition-all duration-700 select-none pointer-events-none ${
                viewMode === 'planet'
                  ? 'opacity-5 blur-md brightness-50 contrast-150'
                  : viewMode === 'anatomy'
                  ? 'opacity-40 brightness-75 contrast-125 saturate-50 filter hue-rotate-180'
                  : 'opacity-85'
              }`}
            />
            {/* Skeletal/X-ray vectors for anatomy view */}
            {viewMode === 'anatomy' && (
              <g id="hand-anatomy-skeletal" className="opacity-40 stroke-cyan-400 stroke-[1.5] fill-none pointer-events-none">
                {/* Finger skeletons */}
                <path d="M 200,500 L 250,560 L 320,620" strokeDasharray="3,3" />
                <path d="M 320,200 L 340,300 L 370,400" strokeDasharray="3,3" />
                <path d="M 470,130 L 480,260 L 490,380" strokeDasharray="3,3" />
                <path d="M 610,140 L 600,260 L 590,380" strokeDasharray="3,3" />
                <path d="M 750,260 L 720,340 L 690,420" strokeDasharray="3,3" />
                {/* Wrist joint circle */}
                <circle cx="500" cy="850" r="45" stroke="rgba(34,211,238,0.3)" strokeWidth={1} />
                {/* Metacarpals */}
                <line x1="370" y1="400" x2="440" y2="520" />
                <line x1="490" y1="380" x2="495" y2="540" />
                <line x1="590" y1="380" x2="560" y2="540" />
                <line x1="690" y1="420" x2="620" y2="560" />
              </g>
            )}

            {/* SVG Mount polygons layer */}
            {viewMode !== 'normal' && (
              <PalmMounts
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelect={onSelect}
                onHover={onHover}
                handSide={handSide}
              />
            )}

            {/* SVG Lines paths layer */}
            {viewMode !== 'planet' && (
              <PalmLines
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelect={onSelect}
                onHover={onHover}
              />
            )}

            {/* Interactive labels & details layer */}
            <PalmLabels
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={onSelect}
              onHover={onHover}
            />
            </g>
          </svg>
        </motion.div>

        {/* Top-Right Hand Viewport Badge Indicator */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-gold/30 text-gold text-xs font-mono font-bold shadow-xl backdrop-blur-md">
            {handSide === 'right' ? '🤚 RIGHT PALM (Manifest)' : '✋ LEFT PALM (Potential)'}
          </span>
        </div>

        {/* 4. Controls UI (Zoom/Pan Reset floating controls) */}
        <div className="absolute bottom-4 left-4 flex gap-1.5 bg-glass-dark border border-white/10 rounded-xl p-1 z-20 backdrop-blur-md">
          <button
            onClick={() => setScale((prev) => Math.min(prev + 0.2, 3.5))}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale((prev) => {
              const next = Math.max(prev - 0.2, 1);
              if (next === 1) setPosition({ x: 0, y: 0 });
              return next;
            })}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetZoom}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
            title="Reset Zoom (ESC)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Scale Indicator */}
        {scale > 1 && (
          <div className="absolute bottom-5 right-5 text-[10px] font-mono tracking-widest text-gold bg-black/60 border border-gold/25 rounded-md px-2 py-0.5 pointer-events-none select-none z-20">
            {Math.round(scale * 100)}% ZOOM
          </div>
        )}
      </div>

      {/* Helpful Hint */}
      <p className="text-[11px] text-white/40 font-sans tracking-wide text-center leading-normal max-w-sm">
        💡 Use <strong className="text-white/60">scroll wheel</strong> to zoom. Click and <strong className="text-white/60">drag</strong> to pan. Press <strong className="text-white/60">ESC</strong> to reset the view.
      </p>
    </div>
  );
};
