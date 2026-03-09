import { createContext, useCallback, useContext, useRef, useState, useEffect, type ReactNode } from "react";

const BEEP_SRC = "/sounds/beep.mp3";
const THEME_SRC = "/sounds/theme.mp3";

type AudioContextType = {
  soundEffectsEnabled: boolean;
  musicEnabled: boolean;
  heroSoundEnabled: boolean;
  toggleSoundEffects: () => void;
  toggleMusic: () => void;
  toggleHeroSound: () => void;
  playBeep: () => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

const HERO_SOUND_KEY = "portfolio-hero-sound";

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [heroSoundEnabled, setHeroSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(HERO_SOUND_KEY);
      return saved !== "0";
    } catch {
      return true;
    }
  });
  const beepRef = useRef<HTMLAudioElement | null>(null);
  const themeRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(HERO_SOUND_KEY, heroSoundEnabled ? "1" : "0");
    } catch {}
  }, [heroSoundEnabled]);

  const playBeep = useCallback(() => {
    if (!soundEffectsEnabled) return;
    try {
      if (!beepRef.current) {
        beepRef.current = new Audio(BEEP_SRC);
      }
      const a = beepRef.current;
      a.currentTime = 0;
      a.volume = 0.85;
      a.play().catch(() => {});
    } catch {
      // ignore
    }
  }, [soundEffectsEnabled]);

  const toggleSoundEffects = useCallback(() => {
    setSoundEffectsEnabled((v) => !v);
  }, []);

  const toggleMusic = useCallback(() => {
    setMusicEnabled((v) => !v);
  }, []);

  const toggleHeroSound = useCallback(() => {
    setHeroSoundEnabled((v) => !v);
  }, []);

  // Theme music: play on loop when enabled, pause when disabled
  useEffect(() => {
    if (!themeRef.current) {
      themeRef.current = new Audio(THEME_SRC);
    }
    const theme = themeRef.current;
    theme.loop = true;
    theme.volume = 0.2;
    if (musicEnabled) {
      theme.play().catch(() => {});
    } else {
      theme.pause();
      theme.currentTime = 0;
    }
  }, [musicEnabled]);

  // Global click: play beep when sound effects are on (навсякъде)
  useEffect(() => {
    const handleClick = () => playBeep();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [playBeep]);

  const value: AudioContextType = {
    soundEffectsEnabled,
    musicEnabled,
    heroSoundEnabled,
    toggleSoundEffects,
    toggleMusic,
    toggleHeroSound,
    playBeep,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
