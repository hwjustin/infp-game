import { motion } from 'framer-motion';
import type { CharacterEmotion } from '../types/game';

const PIXEL_SIZE = 4;

// Cute pixel art character definitions for each emotion
// Each is a grid of colors representing a tiny character
const PALETTE = {
  skin: '#FFD5C2',
  skinDark: '#F0B8A0',
  hair: '#6B3A2A',
  hairLight: '#8B5A3A',
  eyes: '#3A2A1A',
  blush: '#FF9999',
  mouth: '#E8788A',
  sweater: '#C4A8D8',
  sweaterDark: '#A888C0',
  book: '#7EC8C8',
  bookDark: '#5BA8A8',
  tear: '#88C8E8',
  heart: '#E8788A',
  _: 'transparent',
};

type PKey = keyof typeof PALETTE;

const p = PALETTE;

// 12x16 pixel character sprite
const baseSprite: (PKey)[][] = [
  // Row 0-1: Hair top
  ['_','_','_','hair','hair','hair','hair','hair','hair','_','_','_'],
  ['_','_','hair','hair','hair','hair','hair','hair','hair','hair','_','_'],
  // Row 2-3: Hair + forehead
  ['_','hair','hair','hairLight','hair','hair','hair','hair','hairLight','hair','hair','_'],
  ['_','hair','hair','skin','skin','skin','skin','skin','skin','hair','hair','_'],
  // Row 4: Eyes row
  ['_','hair','skin','skin','eyes','skin','skin','eyes','skin','skin','hair','_'],
  // Row 5: Nose/mouth area
  ['_','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','_'],
  // Row 6: Mouth
  ['_','_','skin','skin','skin','mouth','mouth','skin','skin','skin','_','_'],
  // Row 7: Chin + hair sides
  ['_','_','hair','skin','skin','skin','skin','skin','skin','hair','_','_'],
  // Row 8-9: Neck + sweater
  ['_','_','_','_','skin','skin','skin','skin','_','_','_','_'],
  ['_','_','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','_','_'],
  // Row 10-11: Sweater body
  ['_','sweater','sweater','sweaterDark','sweater','sweater','sweater','sweater','sweaterDark','sweater','sweater','_'],
  ['_','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','_'],
  // Row 12: Sweater bottom + arms
  ['sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater'],
  ['skin','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','sweater','skin'],
  // Row 14-15: Skirt
  ['_','_','sweaterDark','sweaterDark','sweaterDark','sweaterDark','sweaterDark','sweaterDark','sweaterDark','sweaterDark','_','_'],
  ['_','_','_','sweaterDark','sweaterDark','sweaterDark','sweaterDark','sweaterDark','sweaterDark','_','_','_'],
];

// Modifications per emotion (coordinates to override)
type SpriteOverride = { row: number; col: number; color: PKey }[];

const emotionOverrides: Record<CharacterEmotion, SpriteOverride> = {
  neutral: [],
  happy: [
    // Curved happy mouth
    { row: 6, col: 4, color: 'mouth' },
    { row: 6, col: 7, color: 'mouth' },
  ],
  shy: [
    // Blush + small mouth
    { row: 5, col: 3, color: 'blush' },
    { row: 5, col: 8, color: 'blush' },
    { row: 6, col: 5, color: 'skin' },
  ],
  sad: [
    // Tear + frown
    { row: 5, col: 4, color: 'tear' },
    { row: 6, col: 5, color: 'skin' },
    { row: 6, col: 6, color: 'skin' },
  ],
  excited: [
    // Wide eyes + big smile
    { row: 4, col: 3, color: 'eyes' },
    { row: 4, col: 8, color: 'eyes' },
    { row: 6, col: 4, color: 'mouth' },
    { row: 6, col: 7, color: 'mouth' },
    { row: 5, col: 3, color: 'blush' },
    { row: 5, col: 8, color: 'blush' },
  ],
  thoughtful: [
    // One eye slightly different + hand on chin
    { row: 6, col: 5, color: 'skin' },
    { row: 6, col: 6, color: 'mouth' },
    { row: 6, col: 7, color: 'skin' },
  ],
  blushing: [
    // Heavy blush + shy smile
    { row: 5, col: 3, color: 'blush' },
    { row: 5, col: 8, color: 'blush' },
    { row: 6, col: 3, color: 'blush' },
    { row: 6, col: 8, color: 'blush' },
    { row: 6, col: 4, color: 'mouth' },
    { row: 6, col: 7, color: 'mouth' },
  ],
  upset: [
    // Furrowed expression
    { row: 6, col: 5, color: 'skin' },
    { row: 6, col: 6, color: 'skin' },
    { row: 3, col: 4, color: 'hair' },
    { row: 3, col: 7, color: 'hair' },
  ],
};

function getSprite(emotion: CharacterEmotion): string[][] {
  const sprite = baseSprite.map(row => row.map(key => p[key]));
  const overrides = emotionOverrides[emotion];
  for (const { row, col, color } of overrides) {
    if (sprite[row] && sprite[row][col] !== undefined) {
      sprite[row][col] = p[color];
    }
  }
  return sprite;
}

interface PixelCharacterProps {
  emotion: CharacterEmotion;
}

export function PixelCharacter({ emotion }: PixelCharacterProps) {
  const sprite = getSprite(emotion);

  return (
    <motion.div
      className="flex justify-center"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      key={emotion}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.3 }}
        key={emotion}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(12, ${PIXEL_SIZE}px)`,
            gridTemplateRows: `repeat(16, ${PIXEL_SIZE}px)`,
            gap: 0,
          }}
        >
          {sprite.flatMap((row, y) =>
            row.map((color, x) => (
              <div
                key={`${y}-${x}`}
                style={{
                  width: PIXEL_SIZE,
                  height: PIXEL_SIZE,
                  backgroundColor: color,
                }}
              />
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
