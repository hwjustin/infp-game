import { motion } from 'framer-motion';
import type { Choice } from '../types/game';

interface ChoicePanelProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  visible: boolean;
}

export function ChoicePanel({ choices, onSelect, visible }: ChoicePanelProps) {
  if (!visible) return null;

  return (
    <div className="flex flex-col gap-1.5 px-4 mt-1.5">
      {choices.map((choice, i) => (
        <motion.button
          key={choice.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.3 }}
          onClick={() => onSelect(choice)}
          className="pixel-border bg-cream hover:bg-pink-light/30 text-left px-3 py-1.5 text-[8px] leading-snug text-brown cursor-pointer transition-colors duration-200 active:scale-[0.98]"
        >
          <span className="text-pink mr-1.5">~</span>
          {choice.text}
        </motion.button>
      ))}
    </div>
  );
}
