import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const MATRIX_CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const EXTRA_COLS = 2;
const CHARS_PER_COL = 70;
const DURATION_RAIN_MS = 2000;
const MIN_DURATION_MS = 4500;
const TEXT_HOLD_MS = 1000; // текстът остава видим поне още 1 сек преди затваряне
const MAX_WAIT_VIDEO_MS = 8000;
const VIDEO_PRELOAD_SRC = "/hero-bg.mp4";

const getRandomChar = () =>
  MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];

export default function MatrixLoader({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
  const sentence = t("loader.matrixSentence");
  const words = sentence.split(" ");
  const [phase, setPhase] = useState<"rain" | "snap" | "hold">("rain");
  const [columns, setColumns] = useState<{ id: number; chars: string[] }[]>([]);
  const [sentenceVisible, setSentenceVisible] = useState(false);
  const [sentenceVisibleLongEnough, setSentenceVisibleLongEnough] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [minTimeReached, setMinTimeReached] = useState(false);
  const completedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const letterCount = sentence.length;
    const cols = letterCount + EXTRA_COLS;
    setColumns(
      Array.from({ length: cols }, (_, i) => ({
        id: i,
        chars: Array.from({ length: CHARS_PER_COL }, () => getRandomChar()),
      }))
    );
  }, [sentence]);

  // Preload background video as soon as loader mounts
  useEffect(() => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.src = VIDEO_PRELOAD_SRC;
    videoRef.current = video;
    let maxWaitId: ReturnType<typeof setTimeout>;
    const onReady = () => {
      setVideoReady(true);
      clearTimeout(maxWaitId);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("loadeddata", onReady);
    };
    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("loadeddata", onReady);
    if (video.readyState >= 2) onReady();
    else maxWaitId = setTimeout(() => setVideoReady(true), MAX_WAIT_VIDEO_MS);
    return () => {
      clearTimeout(maxWaitId);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.src = "";
      videoRef.current = null;
    };
  }, []);

  // Minimum display time
  useEffect(() => {
    const t = setTimeout(() => setMinTimeReached(true), MIN_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  // Phase: rain -> snap
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("snap"), DURATION_RAIN_MS);
    return () => clearTimeout(t1);
  }, []);

  // Finish only when video ready, min time passed, and text was visible at least TEXT_HOLD_MS
  useEffect(() => {
    if (completedRef.current || !minTimeReached || !videoReady || !sentenceVisibleLongEnough) return;
    completedRef.current = true;
    onComplete();
  }, [minTimeReached, videoReady, sentenceVisibleLongEnough, onComplete]);

  // Trigger smooth sentence reveal after phase switches to snap
  useEffect(() => {
    if (phase !== "snap") return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSentenceVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [phase]);

  // Текстът остава видим поне TEXT_HOLD_MS преди да може да приключи лоудърът
  useEffect(() => {
    if (!sentenceVisible) return;
    const t = setTimeout(() => setSentenceVisibleLongEnough(true), TEXT_HOLD_MS);
    return () => clearTimeout(t);
  }, [sentenceVisible]);

  return (
    <div className="matrix-loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Matrix rain columns - keeps running behind text */}
      <div
        className="absolute inset-0 grid gap-px"
        style={{
          fontFamily: "Share Tech Mono, monospace",
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          contain: "layout style paint",
        }}
      >
        {columns.map((col) => (
          <div key={col.id} className="h-full min-w-0 overflow-hidden">
            <MatrixColumn chars={col.chars} />
          </div>
        ))}
      </div>

      {/* Sentence with overlay so it pops over the matrix */}
      {phase !== "rain" && (
        <div className="matrix-loader-text-wrap fixed inset-0 flex items-center justify-center pointer-events-none">
          {/* Dark overlay behind text so it stands out */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            aria-hidden
          />
          <div
            className="relative flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5 px-4 py-4 sm:px-6 sm:py-5 max-w-[92vw] sm:max-w-[90vw] max-h-[85vh] overflow-y-auto rounded-lg bg-black/70 backdrop-blur-md border border-primary/30 shadow-xl transition-opacity duration-500"
            style={{
              fontFamily: "Orbitron, monospace",
              opacity: sentenceVisible ? 1 : 0,
            }}
          >
            {words.map((word, wordIndex) => {
              const letterOffset = words.slice(0, wordIndex).join(" ").length;
              return (
                <span
                  key={wordIndex}
                  className="matrix-loader-sentence inline-flex whitespace-nowrap text-[clamp(0.7rem,3.5vw,2rem)] sm:text-[clamp(1rem,4vw,2rem)] font-semibold tracking-wider"
                  style={{
                    opacity: sentenceVisible ? 1 : 0,
                    transform: sentenceVisible ? "translateY(0)" : "translateY(-18px)",
                    transition: "opacity 0.55s ease-out, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: `${letterOffset * 18}ms`,
                  }}
                >
                  {word.split("").map((char, i) => (
                    <span key={i}>{char}</span>
                  ))}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes matrixFall {
          0% { transform: translate3d(0, -100%, 0); }
          100% { transform: translate3d(0, 100vh, 0); }
        }
        .matrix-loader-text-wrap {
          animation: exposureSweep 2.2s ease-in-out infinite;
          will-change: opacity;
        }
        @keyframes exposureSweep {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function MatrixColumn({ chars }: { chars: string[] }) {
  const delay = Math.random() * 1.5;
  const duration = 2 + Math.random() * 0.6;
  return (
    <div
      className="matrix-loader-rain flex flex-col w-full text-[10px] sm:text-[11px] leading-tight whitespace-nowrap min-h-[200vh]"
      style={{
        animation: `matrixFall ${duration}s linear ${delay}s infinite`,
        textShadow: "0 0 6px hsl(0, 72%, 51%)",
        willChange: "transform",
      }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          className={
            i === 0
              ? "opacity-100 font-bold"
              : i < 6
                ? "opacity-70"
                : "opacity-40"
          }
        >
          {c}
        </span>
      ))}
    </div>
  );
}
