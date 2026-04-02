import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

function PixelHeart({ filled, index }: { filled: 'full' | 'half' | 'empty'; index: number }) {
  const fillColor = filled === 'full' ? '#E8788A' : filled === 'half' ? '#F2A5B0' : '#D4C4B0';
  const borderColor = '#5C3A21';

  return (
    <motion.div
      className="relative"
      initial={false}
      animate={
        filled === 'full'
          ? { scale: [1, 1.3, 1], rotate: [0, -5, 5, 0] }
          : { scale: 1 }
      }
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <svg width="24" height="22" viewBox="0 0 24 22" style={{ imageRendering: 'pixelated' }}>
        {/* Heart shape using pixel rectangles */}
        {/* Row 1 */}
        <rect x="4" y="0" width="4" height="2" fill={borderColor} />
        <rect x="14" y="0" width="4" height="2" fill={borderColor} />
        {/* Row 2 */}
        <rect x="2" y="2" width="2" height="2" fill={borderColor} />
        <rect x="4" y="2" width="6" height="2" fill={fillColor} />
        <rect x="10" y="2" width="2" height="2" fill={borderColor} />
        <rect x="12" y="2" width="6" height="2" fill={fillColor} />
        <rect x="18" y="2" width="2" height="2" fill={borderColor} />
        {/* Row 3 */}
        <rect x="0" y="4" width="2" height="2" fill={borderColor} />
        <rect x="2" y="4" width="8" height="2" fill={fillColor} />
        <rect x="12" y="4" width="8" height="2" fill={fillColor} />
        <rect x="10" y="4" width="2" height="2" fill={fillColor} />
        <rect x="20" y="4" width="2" height="2" fill={borderColor} />
        {/* Row 4 */}
        <rect x="0" y="6" width="2" height="2" fill={borderColor} />
        <rect x="2" y="6" width="18" height="2" fill={fillColor} />
        <rect x="20" y="6" width="2" height="2" fill={borderColor} />
        {/* Row 5 */}
        <rect x="0" y="8" width="2" height="2" fill={borderColor} />
        <rect x="2" y="8" width="18" height="2" fill={fillColor} />
        <rect x="20" y="8" width="2" height="2" fill={borderColor} />
        {/* Row 6 */}
        <rect x="2" y="10" width="2" height="2" fill={borderColor} />
        <rect x="4" y="10" width="14" height="2" fill={fillColor} />
        <rect x="18" y="10" width="2" height="2" fill={borderColor} />
        {/* Row 7 */}
        <rect x="4" y="12" width="2" height="2" fill={borderColor} />
        <rect x="6" y="12" width="10" height="2" fill={fillColor} />
        <rect x="16" y="12" width="2" height="2" fill={borderColor} />
        {/* Row 8 */}
        <rect x="6" y="14" width="2" height="2" fill={borderColor} />
        <rect x="8" y="14" width="6" height="2" fill={fillColor} />
        <rect x="14" y="14" width="2" height="2" fill={borderColor} />
        {/* Row 9 */}
        <rect x="8" y="16" width="2" height="2" fill={borderColor} />
        <rect x="10" y="16" width="2" height="2" fill={fillColor} />
        <rect x="12" y="16" width="2" height="2" fill={borderColor} />
        {/* Row 10 */}
        <rect x="10" y="18" width="2" height="2" fill={borderColor} />
        {/* Shine on full hearts */}
        {filled === 'full' && (
          <>
            <rect x="6" y="4" width="2" height="2" fill="#FFB8C4" />
            <rect x="4" y="6" width="2" height="2" fill="#FFB8C4" />
          </>
        )}
      </svg>
    </motion.div>
  );
}

export function HeartMeter() {
  const heartPoints = useGameStore(s => s.heartPoints);
  const hearts: ('full' | 'half' | 'empty')[] = [];

  for (let i = 0; i < 10; i++) {
    const threshold = (i + 1) * 10;
    if (heartPoints >= threshold) {
      hearts.push('full');
    } else if (heartPoints >= threshold - 5) {
      hearts.push('half');
    } else {
      hearts.push('empty');
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 px-4 py-2">
      {hearts.map((state, i) => (
        <PixelHeart key={i} filled={state} index={i} />
      ))}
    </div>
  );
}
