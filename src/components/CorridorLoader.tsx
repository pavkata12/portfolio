import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const MATRIX_CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MATRIX_COLS = 24;
const CHARS_PER_COL = 60;
const RING_SPACING = 50;
const RING_COUNT = 50;
const RING_ANIMATION_DURATION = 2.2;
const MIN_DURATION_MS = 4500;
const TEXT_HOLD_MS = 1000;
const MAX_WAIT_VIDEO_MS = 8000;
const VIDEO_PRELOAD_SRC = "/hero-bg.mp4";
const CORRIDOR_PHASE_TIME = 2500; // колко време показваме коридора преди текста

export default function CorridorLoader({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isCorporate = theme === "corporate";
  const sentence = t("loader.matrixSentence");
  const words = sentence.split(" ");
  const [phase, setPhase] = useState<"corridor" | "sentence">("corridor");
  const [matrixColumns, setMatrixColumns] = useState<{ id: number; chars: string[] }[]>([]);
  const [sentenceVisible, setSentenceVisible] = useState(false);
  const [sentenceVisibleLongEnough, setSentenceVisibleLongEnough] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [minTimeReached, setMinTimeReached] = useState(false);
  const completedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    setMatrixColumns(
      Array.from({ length: MATRIX_COLS }, (_, i) => ({
        id: i,
        chars: Array.from({ length: CHARS_PER_COL }, () =>
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ),
      }))
    );
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMinTimeReached(true), MIN_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPhase("sentence"), CORRIDOR_PHASE_TIME);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (completedRef.current || !minTimeReached || !videoReady || !sentenceVisibleLongEnough) return;
    completedRef.current = true;
    onComplete();
  }, [minTimeReached, videoReady, sentenceVisibleLongEnough, onComplete]);

  useEffect(() => {
    if (phase !== "sentence") return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSentenceVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [phase]);

  useEffect(() => {
    if (!sentenceVisible) return;
    const t = setTimeout(() => setSentenceVisibleLongEnough(true), TEXT_HOLD_MS);
    return () => clearTimeout(t);
  }, [sentenceVisible]);

  const softGlowColor = isCorporate ? "rgba(56, 189, 248, 0.2)" : "rgba(220, 38, 38, 0.2)";

  return (
    <div
      className={`corridor-loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden ${isCorporate ? "corridor-loader-corporate" : ""}`}
    >
      <button
        type="button"
        onClick={onComplete}
        className="absolute top-4 right-4 z-[110] px-4 py-2 text-sm font-mono tracking-wider border border-white/40 text-white/80 hover:bg-white/10 hover:text-white transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label={t("loader.skip")}
      >
        {t("loader.skip")}
      </button>

      {/* Matrix rain – запълва целия обем на тунела */}
      {matrixColumns.length > 0 && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, black 65%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, black 65%, transparent 75%)",
          }}
        >
          <div
            className="absolute inset-0 grid gap-px"
            style={{
              fontFamily: "Share Tech Mono, monospace",
              gridTemplateColumns: `repeat(${matrixColumns.length}, 1fr)`,
              contain: "layout style paint",
            }}
          >
            {matrixColumns.map((col) => (
              <div key={col.id} className="h-full min-w-0 overflow-hidden">
                <MatrixColumn chars={col.chars} isCorporate={isCorporate} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Infinite 3D tunnel – кръгли пръстени */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden z-10"
        style={{ perspective: "500px", perspectiveOrigin: "50% 50%" }}
      >
        <div
          className="corridor-tunnel absolute"
          style={{
            width: "140vmin",
            height: "140vmin",
            left: "50%",
            top: "50%",
            marginLeft: "-70vmin",
            marginTop: "-70vmin",
            transformStyle: "preserve-3d",
            animation: `corridorMove ${RING_ANIMATION_DURATION}s linear infinite`,
          }}
        >
          {Array.from({ length: RING_COUNT }, (_, i) => {
            const depth = i / RING_COUNT;
            const near = i < 12;
            const opacity = near ? 0.35 + (1 - i / 12) * 0.25 : 0.06 + depth * 0.1;
            return (
              <div
                key={i}
                className="absolute corridor-ring rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "100%",
                  height: "100%",
                  marginLeft: "-50%",
                  marginTop: "-50%",
                  transform: `translateZ(${-i * RING_SPACING}px) scale(${1 / (1 + i * 0.08)})`,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: near
                    ? `rgba(${isCorporate ? "56, 189, 248" : "220, 38, 38"}, ${opacity})`
                    : `rgba(255,255,255,${opacity * 0.8})`,
                  boxShadow: near ? `0 0 12px ${softGlowColor}` : "none",
                  boxSizing: "border-box",
                  background: "transparent",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Sentence overlay */}
      {phase !== "corridor" && (
        <div className="corridor-loader-text-wrap fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" aria-hidden />
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
                  className="corridor-loader-sentence inline-flex whitespace-nowrap text-[clamp(0.7rem,3.5vw,2rem)] sm:text-[clamp(1rem,4vw,2rem)] font-semibold tracking-wider"
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

      {/* Лек vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.15) 100%)",
        }}
        aria-hidden
      />

      <style>{`
        .corridor-ring {
          backface-visibility: hidden;
        }
        @keyframes corridorMove {
          0% { transform: translateZ(0); }
          100% { transform: translateZ(${RING_SPACING}px); }
        }
        .corridor-loader-text-wrap {
          opacity: 1;
        }
        .corridor-loader-sentence {
          color: white;
          text-shadow: 0 0 20px rgba(255,255,255,0.15);
        }
        .corridor-loader-corporate .corridor-loader-sentence {
          color: rgb(56, 189, 248);
          text-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
        }
        @keyframes matrixFall {
          0% { transform: translate3d(0, -100%, 0); }
          100% { transform: translate3d(0, 100vh, 0); }
        }
      `}</style>
    </div>
  );
}

function MatrixColumn({ chars, isCorporate }: { chars: string[]; isCorporate?: boolean }) {
  const delay = Math.random() * 2;
  const duration = 2.5 + Math.random() * 1;
  return (
    <div
      className="flex flex-col w-full text-[9px] sm:text-[10px] leading-tight whitespace-nowrap min-h-[200vh]"
      style={{
        animation: `matrixFall ${duration}s linear ${delay}s infinite`,
        color: isCorporate ? "rgb(56, 189, 248)" : "rgb(220, 38, 38)",
        textShadow: isCorporate ? "0 0 4px rgb(56, 189, 248)" : "0 0 4px rgb(220, 38, 38)",
        willChange: "transform",
      }}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          className={
            i === 0 ? "opacity-100 font-bold" : i < 5 ? "opacity-60" : "opacity-30"
          }
        >
          {c}
        </span>
      ))}
    </div>
  );
}
