export type CharacterEmotion =
  | 'happy'
  | 'shy'
  | 'sad'
  | 'excited'
  | 'thoughtful'
  | 'blushing'
  | 'upset'
  | 'neutral';

export interface Choice {
  id: string;
  text: string;
  heartDelta: number;
  responseText: string;
  responseEmotion: CharacterEmotion;
}

export interface DialogueStep {
  id: string;
  speaker: 'infp' | 'narrator';
  text: string;
  emotion: CharacterEmotion;
  choices?: Choice[];
}

export type BackgroundType =
  | 'cafe'
  | 'park'
  | 'bedroom'
  | 'texting'
  | 'movieTheater'
  | 'rainyday'
  | 'starryNight'
  | 'artStudio';

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  background: BackgroundType;
  steps: DialogueStep[];
}

export type GamePhase = 'title' | 'intro' | 'playing' | 'response' | 'transition' | 'ending';

export interface EndingTier {
  minScore: number;
  title: string;
  description: string;
  color: string;
}
