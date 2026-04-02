import { motion } from 'framer-motion';
import type { CharacterEmotion } from '../types/game';

const PIXEL_SIZE = 4;

// Color palette matching the reference image:
// Long dark brown hair, pink oversized tee, blue jeans, warm skin
const PALETTE = {
  skin: '#FFD5C2',
  skinDark: '#F0B8A0',
  hair: '#6B2D8B',
  hairMid: '#9B4DCA',
  hairLight: '#E878A8',
  eyes: '#2A1A10',
  eyeWhite: '#FFFFFF',
  blush: '#FF9999',
  mouth: '#E87888',
  mouthSmall: '#D06878',
  tee: '#F5A0B8',
  teeDark: '#E088A0',
  teeLight: '#FBB8CC',
  jeans: '#6B8EC4',
  jeansDark: '#5878A8',
  necklace: '#D0D0D0',
  tear: '#88C8E8',
  _: 'transparent',
};

type PKey = keyof typeof PALETTE;
const p = PALETTE;

// 14x20 pixel character: girl with long hair, pink tee, jeans
const baseSprite: PKey[][] = [
  // Row 0: Hair top
  ['_','_','_','_','hair','hair','hair','hair','hair','hair','_','_','_','_'],
  // Row 1: Hair
  ['_','_','_','hair','hair','hair','hair','hair','hair','hair','hair','_','_','_'],
  // Row 2: Hair + forehead
  ['_','_','hair','hair','hairMid','hairMid','hairMid','hairMid','hairMid','hairMid','hair','hair','_','_'],
  // Row 3: Bangs + forehead
  ['_','hair','hair','hairMid','hair','hair','hair','hair','hairMid','hairMid','hairMid','hair','hair','_'],
  // Row 4: Eyes row (with hair sides)
  ['_','hair','hair','skin','skin','eyes','skin','skin','eyes','skin','skin','hair','hair','_'],
  // Row 5: Cheeks
  ['_','hair','hair','skin','skin','skin','skin','skin','skin','skin','skin','hair','hair','_'],
  // Row 6: Mouth - gentle smile
  ['_','hair','hair','skin','skin','mouth','mouth','mouth','mouth','skin','skin','hair','hair','_'],
  // Row 7: Chin
  ['_','hair','_','skin','skin','skin','skin','skin','skin','skin','skin','_','hair','_'],
  // Row 8: Neck + hair flowing down + necklace
  ['_','hair','_','_','skin','necklace','necklace','necklace','necklace','skin','_','_','hair','_'],
  // Row 9: Shoulders + pink tee + hair
  ['_','hair','_','tee','tee','tee','tee','tee','tee','tee','tee','_','hair','_'],
  // Row 10: Pink tee body + hair sides
  ['hair','hair','tee','tee','teeDark','tee','tee','tee','tee','teeDark','tee','tee','hair','hair'],
  // Row 11: Pink tee (oversized) + hair
  ['hair','_','tee','tee','tee','teeLight','tee','tee','teeLight','tee','tee','tee','_','hair'],
  // Row 12: Pink tee bottom + arms
  ['hair','skin','tee','tee','tee','tee','tee','tee','tee','tee','tee','tee','skin','hair'],
  // Row 13: Tee hem
  ['hair','_','tee','tee','tee','tee','tee','tee','tee','tee','tee','tee','_','hair'],
  // Row 14: Tee to jeans transition + hair ends
  ['hair','_','_','teeDark','teeDark','teeDark','teeDark','teeDark','teeDark','teeDark','teeDark','_','_','hair'],
  // Row 15: Jeans top + hair ends
  ['hairLight','_','_','jeans','jeans','jeans','jeans','jeans','jeans','jeans','jeans','_','_','hairLight'],
  // Row 16: Jeans
  ['_','_','_','jeans','jeans','jeansDark','jeans','jeans','jeansDark','jeans','jeans','_','_','_'],
  // Row 17: Jeans bottom
  ['_','_','_','jeans','jeans','jeans','jeansDark','jeansDark','jeans','jeans','jeans','_','_','_'],
  // Row 18: Jeans hem
  ['_','_','_','jeansDark','jeans','jeans','jeans','jeans','jeans','jeans','jeansDark','_','_','_'],
  // Row 19: Feet hint
  ['_','_','_','_','skin','skin','_','_','skin','skin','_','_','_','_'],
];

const COLS = 14;
const ROWS = 20;

type SpriteOverride = { row: number; col: number; color: PKey }[];

const emotionOverrides: Record<CharacterEmotion, SpriteOverride> = {
  neutral: [],
  happy: [
    // Wider smile
    { row: 6, col: 4, color: 'mouth' },
    { row: 6, col: 9, color: 'mouth' },
  ],
  shy: [
    // Blush + smaller mouth
    { row: 5, col: 3, color: 'blush' },
    { row: 5, col: 10, color: 'blush' },
    { row: 6, col: 5, color: 'mouthSmall' },
    { row: 6, col: 6, color: 'skin' },
    { row: 6, col: 7, color: 'skin' },
    { row: 6, col: 8, color: 'mouthSmall' },
  ],
  sad: [
    // Tear + small frown
    { row: 5, col: 5, color: 'tear' },
    { row: 6, col: 5, color: 'skin' },
    { row: 6, col: 6, color: 'mouthSmall' },
    { row: 6, col: 7, color: 'mouthSmall' },
    { row: 6, col: 8, color: 'skin' },
  ],
  excited: [
    // Big eyes + wide smile + blush
    { row: 4, col: 4, color: 'eyes' },
    { row: 4, col: 9, color: 'eyes' },
    { row: 5, col: 3, color: 'blush' },
    { row: 5, col: 10, color: 'blush' },
    { row: 6, col: 4, color: 'mouth' },
    { row: 6, col: 9, color: 'mouth' },
  ],
  thoughtful: [
    // Neutral mouth, one side up
    { row: 6, col: 5, color: 'skin' },
    { row: 6, col: 6, color: 'skin' },
    { row: 6, col: 7, color: 'mouthSmall' },
    { row: 6, col: 8, color: 'mouthSmall' },
  ],
  blushing: [
    // Heavy blush + gentle smile
    { row: 5, col: 3, color: 'blush' },
    { row: 5, col: 10, color: 'blush' },
    { row: 6, col: 3, color: 'blush' },
    { row: 6, col: 10, color: 'blush' },
    { row: 6, col: 4, color: 'mouth' },
    { row: 6, col: 9, color: 'mouth' },
  ],
  upset: [
    // Slight frown
    { row: 6, col: 5, color: 'skin' },
    { row: 6, col: 6, color: 'skin' },
    { row: 6, col: 7, color: 'skin' },
    { row: 6, col: 8, color: 'skin' },
    { row: 3, col: 5, color: 'hair' },
    { row: 3, col: 8, color: 'hair' },
  ],
};

function getSprite(emotion: CharacterEmotion): string[][] {
  const sprite = baseSprite.map(row => row.map(key => p[key]));
  const overrides = emotionOverrides[emotion];
  for (const { row, col, color } of overrides) {
    if (sprite[row]?.[col] !== undefined) {
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
            gridTemplateColumns: `repeat(${COLS}, ${PIXEL_SIZE}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${PIXEL_SIZE}px)`,
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
