import { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { scenarios } from './data/scenarios';
import { GameContainer } from './components/GameContainer';
import { TitleScreen } from './components/TitleScreen';
import { IntroScreen } from './components/IntroScreen';
import { SceneRenderer } from './components/SceneRenderer';
import { TransitionOverlay } from './components/TransitionOverlay';
import { EndScreen } from './components/EndScreen';

function App() {
  const phase = useGameStore(s => s.phase);
  const scenarioIndex = useGameStore(s => s.scenarioIndex);
  const finishTransition = useGameStore(s => s.finishTransition);

  const scenario = scenarios[scenarioIndex];

  const handleTransitionComplete = useCallback(() => {
    finishTransition();
  }, [finishTransition]);

  return (
    <GameContainer>
      <AnimatePresence mode="wait">
        {phase === 'title' && <TitleScreen key="title" />}
        {phase === 'intro' && <IntroScreen key="intro" />}
        {(phase === 'playing' || phase === 'response') && (
          <SceneRenderer key={`scene-${scenarioIndex}`} />
        )}
        {phase === 'ending' && <EndScreen key="ending" />}
      </AnimatePresence>

      <TransitionOverlay
        title={scenario?.title ?? ''}
        subtitle={scenario?.subtitle ?? ''}
        visible={phase === 'transition'}
        onComplete={handleTransitionComplete}
      />
    </GameContainer>
  );
}

export default App;
