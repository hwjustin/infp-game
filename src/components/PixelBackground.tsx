import type { ReactNode } from 'react';
import type { BackgroundType } from '../types/game';

const backgrounds: Record<BackgroundType, { gradient: string; elements: ReactNode }> = {
  cafe: {
    gradient: 'from-[#F5E6D3] to-[#E8D5C0]',
    elements: (
      <>
        {/* Warm cafe interior */}
        <div className="absolute bottom-0 w-full h-1/3 bg-[#8B6B4A]/20" />
        <div className="absolute bottom-1/3 left-1/4 w-16 h-20 bg-[#8B6B4A]/30 rounded-t-sm" />
        <div className="absolute bottom-1/3 right-1/4 w-16 h-20 bg-[#8B6B4A]/30 rounded-t-sm" />
        {/* Window */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-24 border-4 border-[#8B6B4A]/40 bg-[#FFF8E0]/50 rounded-sm" />
        {/* Hanging lamp */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-[#5C3A21]/30" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#FFE4B5]/60 rounded-b-full" />
        {/* Steam from cups */}
        <div className="absolute bottom-[38%] left-[30%] text-[12px] opacity-20 animate-pulse">~</div>
        <div className="absolute bottom-[40%] right-[30%] text-[12px] opacity-20 animate-pulse">~</div>
      </>
    ),
  },
  texting: {
    gradient: 'from-[#1a1a2e] to-[#16213e]',
    elements: (
      <>
        {/* Night sky with stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        {/* Moon */}
        <div className="absolute top-6 right-8 w-12 h-12 bg-[#FFF8DC]/80 rounded-full shadow-[0_0_20px_rgba(255,248,220,0.4)]" />
        {/* Phone glow */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-20 h-28 bg-[#E8F0FF]/10 rounded-lg" />
      </>
    ),
  },
  rainyday: {
    gradient: 'from-[#A8B5C8] to-[#8A9BB0]',
    elements: (
      <>
        {/* Rain drops */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-4 bg-white/20"
            style={{
              left: `${5 + i * 6.5}%`,
              top: `${Math.random() * 50}%`,
              animation: `float ${1 + Math.random()}s linear infinite`,
            }}
          />
        ))}
        {/* Window frame */}
        <div className="absolute top-4 right-4 w-28 h-24 border-4 border-[#8B6B4A]/40 bg-[#B8C8D8]/30 rounded-sm" />
        {/* Blanket/bed */}
        <div className="absolute bottom-0 w-full h-1/4 bg-[#C4A8D8]/30 rounded-t-lg" />
        {/* Pillow */}
        <div className="absolute bottom-[20%] left-[15%] w-16 h-8 bg-[#FFE4E1]/40 rounded-full" />
      </>
    ),
  },
  movieTheater: {
    gradient: 'from-[#2D1B3D] to-[#1A1025]',
    elements: (
      <>
        {/* Fairy lights */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${8 + i * 8}%`,
              top: '8%',
              backgroundColor: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98'][i % 4],
              opacity: 0.4,
              animation: `twinkle ${1.5 + Math.random()}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        {/* Couch */}
        <div className="absolute bottom-0 w-full h-1/4 bg-[#4A3728]/40 rounded-t-lg" />
        {/* Blanket drape */}
        <div className="absolute bottom-[15%] left-1/4 w-1/2 h-12 bg-[#C4A8D8]/20 rounded-lg" />
        {/* TV glow */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-40 h-24 bg-[#E8F0FF]/10 rounded-sm" />
      </>
    ),
  },
  artStudio: {
    gradient: 'from-[#FFF0E5] to-[#FFE8D5]',
    elements: (
      <>
        {/* Paintings on wall */}
        <div className="absolute top-4 left-4 w-12 h-10 border-2 border-[#8B6B4A]/30 bg-[#7EC8C8]/20" />
        <div className="absolute top-4 left-20 w-8 h-12 border-2 border-[#8B6B4A]/30 bg-[#E8788A]/20" />
        <div className="absolute top-4 right-4 w-14 h-10 border-2 border-[#8B6B4A]/30 bg-[#C4A8D8]/20" />
        {/* Easel */}
        <div className="absolute bottom-[30%] right-[15%] w-1 h-20 bg-[#8B6B4A]/30 rotate-6" />
        <div className="absolute bottom-[30%] right-[18%] w-1 h-20 bg-[#8B6B4A]/30 -rotate-6" />
        {/* Paint splashes */}
        <div className="absolute bottom-2 left-[20%] w-3 h-3 bg-[#E8788A]/20 rounded-full" />
        <div className="absolute bottom-4 left-[35%] w-2 h-2 bg-[#7EC8C8]/20 rounded-full" />
        <div className="absolute bottom-3 right-[25%] w-4 h-2 bg-[#C4A8D8]/20 rounded-full" />
        {/* Desk/table */}
        <div className="absolute bottom-0 w-full h-1/5 bg-[#DEB887]/30" />
      </>
    ),
  },
  park: {
    gradient: 'from-[#87CEEB] to-[#98D8A8]',
    elements: (
      <>
        {/* Clouds */}
        <div className="absolute top-4 left-[10%] w-20 h-6 bg-white/40 rounded-full" />
        <div className="absolute top-8 left-[60%] w-16 h-5 bg-white/30 rounded-full" />
        {/* Trees */}
        <div className="absolute bottom-[30%] left-[5%] w-2 h-16 bg-[#8B6B4A]/40" />
        <div className="absolute bottom-[45%] left-[2%] w-10 h-10 bg-[#5C8A4A]/40 rounded-full" />
        <div className="absolute bottom-[30%] right-[5%] w-2 h-20 bg-[#8B6B4A]/40" />
        <div className="absolute bottom-[48%] right-[2%] w-12 h-12 bg-[#5C8A4A]/40 rounded-full" />
        {/* Bench */}
        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-24 h-3 bg-[#8B6B4A]/40 rounded-sm" />
        <div className="absolute bottom-[18%] left-[42%] w-2 h-8 bg-[#8B6B4A]/30" />
        <div className="absolute bottom-[18%] right-[42%] w-2 h-8 bg-[#8B6B4A]/30" />
        {/* Grass */}
        <div className="absolute bottom-0 w-full h-1/5 bg-[#7CB868]/30" />
      </>
    ),
  },
  starryNight: {
    gradient: 'from-[#0F1B3D] to-[#1B2D5A]',
    elements: (
      <>
        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() > 0.7 ? '3px' : '1px',
              height: Math.random() > 0.7 ? '3px' : '1px',
              backgroundColor: '#FFFFFF',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              opacity: 0.3 + Math.random() * 0.5,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        {/* Moon */}
        <div className="absolute top-6 right-12 w-16 h-16 bg-[#FFF8DC] rounded-full shadow-[0_0_30px_rgba(255,248,220,0.3)]" />
        <div className="absolute top-5 right-10 w-14 h-14 bg-[#0F1B3D] rounded-full" />
        {/* Blanket on ground */}
        <div className="absolute bottom-0 w-full h-1/6 bg-[#2A1A4A]/40" />
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-40 h-8 bg-[#C4A8D8]/20 rounded-lg" />
      </>
    ),
  },
  bedroom: {
    gradient: 'from-[#F0E0D0] to-[#E8D0C0]',
    elements: (
      <>
        <div className="absolute bottom-0 w-full h-1/3 bg-[#C4A8D8]/20" />
      </>
    ),
  },
};

interface PixelBackgroundProps {
  type: BackgroundType;
}

export function PixelBackground({ type }: PixelBackgroundProps) {
  const bg = backgrounds[type];

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${bg.gradient} overflow-hidden`}>
      {bg.elements}
    </div>
  );
}
