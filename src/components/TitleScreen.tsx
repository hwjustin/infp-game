import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { PixelCharacter } from './PixelCharacter';

function Star({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-pink rounded-full"
      style={{ left: x, top: y }}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2, delay, repeat: Infinity }}
    />
  );
}

const stars = [
  { x: '10%', y: '15%', delay: 0 },
  { x: '25%', y: '8%', delay: 0.5 },
  { x: '40%', y: '20%', delay: 1.0 },
  { x: '60%', y: '12%', delay: 0.3 },
  { x: '75%', y: '18%', delay: 0.8 },
  { x: '85%', y: '10%', delay: 1.2 },
  { x: '15%', y: '25%', delay: 0.6 },
  { x: '90%', y: '22%', delay: 0.2 },
  { x: '50%', y: '5%', delay: 0.9 },
  { x: '70%', y: '25%', delay: 1.5 },
  { x: '30%', y: '30%', delay: 0.4 },
  { x: '80%', y: '28%', delay: 1.1 },
];

export function TitleScreen() {
  const startGame = useGameStore(s => s.startGame);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream overflow-hidden">
      {/* Stars */}
      {stars.map((star, i) => (
        <Star key={i} {...star} />
      ))}

      {/* Floating hearts background */}
      <motion.div
        className="absolute text-[40px] opacity-10"
        style={{ left: '5%', top: '40%' }}
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ♥
      </motion.div>
      <motion.div
        className="absolute text-[30px] opacity-10"
        style={{ right: '8%', top: '35%' }}
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
      >
        ♥
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center mb-6"
      >
        <h1 className="text-[16px] text-pink mb-3" style={{ animation: 'float 3s ease-in-out infinite' }}>
          Understanding
        </h1>
        <h2 className="text-[12px] text-brown">an INFP</h2>
        <p className="text-[7px] text-warm-gray mt-3">a tiny game about connection</p>
      </motion.div>

      {/* Character */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mb-6"
        style={{ width: 96, height: 128 }}
      >
        <div className="origin-top-left scale-[2]">
          <PixelCharacter emotion="shy" />
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={startGame}
        className="pixel-border-pink bg-cream px-8 py-4 text-[10px] text-pink cursor-pointer hover:bg-pink hover:text-cream transition-colors duration-300"
      >
        ♥ Press Start ♥
      </motion.button>
    </div>
  );
}
