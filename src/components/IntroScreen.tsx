import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { useTypewriter } from '../hooks/useTypewriter';

const introText = "You're about to meet someone special... an INFP. She lives in a world of deep feelings, quiet poetry, and unspoken beauty. She won't always tell you what she needs — but she'll always hope you understand. Are you ready to learn her language?";

export function IntroScreen() {
  const startPlaying = useGameStore(s => s.startPlaying);
  const { displayedText, isComplete, skipToEnd } = useTypewriter(introText, 40);

  const handleClick = () => {
    if (!isComplete) {
      skipToEnd();
    } else {
      startPlaying();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-cream cursor-pointer p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onClick={handleClick}
    >
      <div className="max-w-[500px] text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[20px] text-pink mb-6"
        >
          ♥
        </motion.div>

        <p className="text-[9px] leading-[2] text-brown/80">
          {displayedText}
          {!isComplete && (
            <span className="inline-block ml-1 w-2 h-3 bg-brown/60" style={{ animation: 'blink 0.8s step-end infinite' }} />
          )}
        </p>

        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <span className="text-[8px] text-pink" style={{ animation: 'blink 1.2s step-end infinite' }}>
              ♥ click to begin ♥
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
