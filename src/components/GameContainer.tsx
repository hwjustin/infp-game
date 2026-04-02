import type { ReactNode } from 'react';

export function GameContainer({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full h-full max-w-[800px] max-h-[600px] aspect-[4/3] bg-cream overflow-hidden"
      style={{ imageRendering: 'pixelated' }}
    >
      {children}
    </div>
  );
}
