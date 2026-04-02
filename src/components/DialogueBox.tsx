import { useTypewriter } from '../hooks/useTypewriter';
import { useGameStore } from '../store/gameStore';
import { useEffect } from 'react';

interface DialogueBoxProps {
  text: string;
  speaker: 'infp' | 'narrator';
  onComplete?: () => void;
  onClick?: () => void;
}

export function DialogueBox({ text, speaker, onComplete, onClick }: DialogueBoxProps) {
  const { displayedText, isComplete, skipToEnd } = useTypewriter(text, 30);
  const setTextComplete = useGameStore(s => s.setTextComplete);

  useEffect(() => {
    if (isComplete) {
      setTextComplete(true);
      onComplete?.();
    }
  }, [isComplete, onComplete, setTextComplete]);

  const handleClick = () => {
    if (!isComplete) {
      skipToEnd();
    } else {
      onClick?.();
    }
  };

  return (
    <div
      className="pixel-border bg-cream/95 p-5 mx-4 cursor-pointer select-none"
      onClick={handleClick}
    >
      {speaker === 'infp' && (
        <div className="text-[8px] text-pink mb-2 tracking-wider">♥ HER ♥</div>
      )}
      {speaker === 'narrator' && (
        <div className="text-[8px] text-warm-gray mb-2 tracking-wider">~ narrator ~</div>
      )}
      <p className="text-[10px] leading-relaxed text-brown min-h-[40px]">
        {displayedText}
        {!isComplete && (
          <span className="inline-block ml-1 w-2 h-3 bg-brown" style={{ animation: 'blink 0.8s step-end infinite' }} />
        )}
      </p>
      {isComplete && (
        <div className="text-right mt-2">
          <span className="text-[8px] text-pink" style={{ animation: 'blink 1s step-end infinite' }}>
            ▼
          </span>
        </div>
      )}
    </div>
  );
}
