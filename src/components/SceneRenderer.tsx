import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { scenarios } from '../data/scenarios';
import { PixelBackground } from './PixelBackground';
import { PixelCharacter } from './PixelCharacter';
import { DialogueBox } from './DialogueBox';
import { ChoicePanel } from './ChoicePanel';
import { HeartMeter } from './HeartMeter';
import type { Choice } from '../types/game';

export function SceneRenderer() {
  const {
    scenarioIndex,
    stepIndex,
    currentEmotion,
    currentResponseText,
    phase,
    isTextComplete,
    selectChoice,
    advanceStep,
    advanceAfterResponse,
  } = useGameStore();

  const scenario = scenarios[scenarioIndex];
  const step = scenario.steps[stepIndex];

  const handleChoiceSelect = useCallback(
    (choice: Choice) => {
      selectChoice(choice);
    },
    [selectChoice]
  );

  const handleDialogueClick = useCallback(() => {
    if (phase === 'response') {
      advanceAfterResponse();
    } else if (!step.choices) {
      advanceStep();
    }
  }, [phase, step.choices, advanceStep, advanceAfterResponse]);

  const displayText = phase === 'response' && currentResponseText ? currentResponseText : step.text;
  const displaySpeaker = phase === 'response' ? 'narrator' as const : step.speaker;

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Background */}
      <PixelBackground type={scenario.background} />

      {/* Character area */}
      <div className="relative flex-none h-[40%] flex items-center justify-center">
        <motion.div
          className="scale-[3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <PixelCharacter emotion={currentEmotion} />
        </motion.div>
      </div>

      {/* Dialogue + choices area — scrollable */}
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto pb-1">
          <DialogueBox
            key={`${phase}-${stepIndex}-${currentResponseText}`}
            text={displayText}
            speaker={displaySpeaker}
            onClick={handleDialogueClick}
          />

          {/* Choices */}
          {phase === 'playing' && step.choices && (
            <ChoicePanel
              choices={step.choices}
              onSelect={handleChoiceSelect}
              visible={isTextComplete}
            />
          )}
        </div>

        {/* Heart meter — always visible at bottom */}
        <div className="flex-none bg-cream/90 py-1">
          <HeartMeter />
        </div>
      </div>
    </div>
  );
}
