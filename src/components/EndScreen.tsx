import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { endings } from '../data/scenarios';
import { giftMessage, secretMessage } from '../data/endings';
import { PixelCharacter } from './PixelCharacter';
import { HeartMeter } from './HeartMeter';

export function EndScreen() {
  const heartPoints = useGameStore(s => s.heartPoints);
  const resetGame = useGameStore(s => s.resetGame);

  const ending = endings.find(e => heartPoints >= e.minScore) ?? endings[endings.length - 1];
  const isPerfect = heartPoints >= 100;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-cream overflow-y-auto py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Confetti for high scores */}
      {heartPoints >= 75 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[10px]"
              style={{
                left: `${Math.random() * 100}%`,
                color: ['#E8788A', '#7EC8C8', '#C4A8D8', '#FFD700'][i % 4],
              }}
              initial={{ y: -20, opacity: 1 }}
              animate={{
                y: 600,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            >
              {['♥', '✦', '♪', '✿'][i % 4]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Character */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="mb-4 flex-none"
        style={{ width: 112, height: 160 }}
      >
        <div className="origin-top-left scale-[2]">
          <PixelCharacter emotion={heartPoints >= 75 ? 'blushing' : heartPoints >= 50 ? 'happy' : 'neutral'} />
        </div>
      </motion.div>

      {/* Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mb-4"
      >
        <h2 className="text-[14px] mb-3" style={{ color: ending.color }}>
          {ending.title}
        </h2>
        <div className="mb-3">
          <HeartMeter />
        </div>
        <p className="text-[8px] text-brown/70 max-w-[400px] px-6 leading-[2]">
          {ending.description}
        </p>
      </motion.div>

      {/* Gift message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="pixel-border bg-pink/10 p-5 mx-8 mt-4 max-w-[400px]"
      >
        <p className="text-[7px] text-brown/80 leading-[2.2] whitespace-pre-line text-center">
          {isPerfect ? secretMessage : giftMessage}
        </p>
      </motion.div>

      {/* Play Again */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={resetGame}
        className="pixel-border-pink bg-cream px-6 py-3 text-[8px] text-pink cursor-pointer hover:bg-pink hover:text-cream transition-colors duration-300 mt-6"
      >
        ♥ Play Again ♥
      </motion.button>
    </motion.div>
  );
}
