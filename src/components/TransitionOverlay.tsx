import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface TransitionOverlayProps {
  title: string;
  subtitle: string;
  visible: boolean;
  onComplete: () => void;
}

export function TransitionOverlay({ title, subtitle, visible, onComplete }: TransitionOverlayProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-brown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-[12px] text-pink mb-4">{title}</h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-[8px] text-cream/70 italic max-w-[280px]"
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* Decorative hearts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 text-[10px] text-pink tracking-[1em]"
          >
            ♥ ♥ ♥
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
