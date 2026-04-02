import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Choice } from '../types/game';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface ChoicePanelProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  visible: boolean;
}

export function ChoicePanel({ choices, onSelect, visible }: ChoicePanelProps) {
  const shuffled = useMemo(() => shuffle(choices), [choices]);

  if (!visible) return null;

  return (
    <div className="flex flex-col gap-2 px-4 mt-2">
      {shuffled.map((choice, i) => (
        <motion.button
          key={choice.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.3 }}
          onClick={() => onSelect(choice)}
          className="pixel-border bg-cream hover:bg-pink-light/30 text-left px-4 py-3 text-[9px] leading-relaxed text-brown cursor-pointer transition-colors duration-200 active:scale-[0.98]"
        >
          <span className="text-pink mr-2">{'♥'}</span>
          {choice.text}
        </motion.button>
      ))}
    </div>
  );
}
