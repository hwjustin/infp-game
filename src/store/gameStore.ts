import { create } from 'zustand';
import type { GamePhase, CharacterEmotion, Choice } from '../types/game';
import { scenarios } from '../data/scenarios';

interface GameStore {
  phase: GamePhase;
  scenarioIndex: number;
  stepIndex: number;
  heartPoints: number;
  currentEmotion: CharacterEmotion;
  currentResponseText: string | null;
  choiceHistory: { scenarioId: string; choiceId: string; delta: number }[];
  isTextComplete: boolean;

  startGame: () => void;
  startPlaying: () => void;
  setTextComplete: (complete: boolean) => void;
  selectChoice: (choice: Choice) => void;
  advanceAfterResponse: () => void;
  advanceStep: () => void;
  finishTransition: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  phase: 'title',
  scenarioIndex: 0,
  stepIndex: 0,
  heartPoints: 50,
  currentEmotion: 'neutral',
  currentResponseText: null,
  choiceHistory: [],
  isTextComplete: false,

  startGame: () => set({ phase: 'intro' }),

  startPlaying: () => set({ phase: 'transition', scenarioIndex: 0, stepIndex: 0 }),

  setTextComplete: (complete) => set({ isTextComplete: complete }),

  selectChoice: (choice: Choice) => {
    const state = get();
    const scenario = scenarios[state.scenarioIndex];
    const newHearts = Math.max(0, Math.min(100, state.heartPoints + choice.heartDelta));

    set({
      heartPoints: newHearts,
      currentEmotion: choice.responseEmotion,
      currentResponseText: choice.responseText,
      phase: 'response',
      isTextComplete: false,
      choiceHistory: [
        ...state.choiceHistory,
        { scenarioId: scenario.id, choiceId: choice.id, delta: choice.heartDelta },
      ],
    });
  },

  advanceAfterResponse: () => {
    const state = get();
    const scenario = scenarios[state.scenarioIndex];
    const nextStepIndex = state.stepIndex + 1;

    if (nextStepIndex >= scenario.steps.length) {
      // End of scenario
      const nextScenarioIndex = state.scenarioIndex + 1;
      if (nextScenarioIndex >= scenarios.length) {
        set({ phase: 'ending' });
      } else {
        set({
          phase: 'transition',
          scenarioIndex: nextScenarioIndex,
          stepIndex: 0,
          currentResponseText: null,
        });
      }
    } else {
      set({
        stepIndex: nextStepIndex,
        phase: 'playing',
        currentResponseText: null,
        isTextComplete: false,
        currentEmotion: scenario.steps[nextStepIndex].emotion,
      });
    }
  },

  advanceStep: () => {
    const state = get();
    const scenario = scenarios[state.scenarioIndex];
    const step = scenario.steps[state.stepIndex];

    // If this step has choices, don't auto-advance
    if (step.choices) return;

    const nextStepIndex = state.stepIndex + 1;
    if (nextStepIndex >= scenario.steps.length) {
      const nextScenarioIndex = state.scenarioIndex + 1;
      if (nextScenarioIndex >= scenarios.length) {
        set({ phase: 'ending' });
      } else {
        set({
          phase: 'transition',
          scenarioIndex: nextScenarioIndex,
          stepIndex: 0,
          currentResponseText: null,
        });
      }
    } else {
      set({
        stepIndex: nextStepIndex,
        isTextComplete: false,
        currentEmotion: scenario.steps[nextStepIndex].emotion,
      });
    }
  },

  finishTransition: () => {
    const state = get();
    const scenario = scenarios[state.scenarioIndex];
    set({
      phase: 'playing',
      isTextComplete: false,
      currentEmotion: scenario.steps[0].emotion,
      currentResponseText: null,
    });
  },

  resetGame: () =>
    set({
      phase: 'title',
      scenarioIndex: 0,
      stepIndex: 0,
      heartPoints: 50,
      currentEmotion: 'neutral',
      currentResponseText: null,
      choiceHistory: [],
      isTextComplete: false,
    }),
}));
