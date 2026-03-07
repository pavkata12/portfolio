import { useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const PILL_CHOSEN_KEY = "portfolio-pill-chosen";

const MATRIX_CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const COLUMNS = 48;
const CHARS_PER_COL = 55;

function getRandomChar() {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
}

function MatrixRain({ color }: { color: "cyan" | "red" }) {
  const columns = useMemo(
    () =>
      Array.from({ length: COLUMNS }, (_, i) => ({
        id: i,
        chars: Array.from({ length: CHARS_PER_COL }, () => getRandomChar()),
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 3,
      })),
    []
  );
  const isCyan = color === "cyan";
  return (
    <div className="absolute inset-0 flex overflow-hidden matrix-rain-wrap" aria-hidden>
      {columns.map((col) => (
        <div
          key={col.id}
          className="matrix-column flex-1 min-w-0 text-[9px] sm:text-[10px] leading-[1.3] font-mono opacity-90 whitespace-pre"
          style={{
            color: isCyan ? "rgba(34, 211, 238, 0.95)" : "rgba(248, 113, 113, 0.95)",
            textShadow: isCyan
              ? "0 0 8px rgba(34, 211, 238, 0.7)"
              : "0 0 8px rgba(248, 113, 113, 0.7)",
            animationDelay: `${col.delay}s`,
            animationDuration: `${col.duration}s`,
          }}
        >
          {col.chars.join("\n")}
        </div>
      ))}
    </div>
  );
}

type PillChoiceProps = {
  onChoose: () => void;
};

export default function PillChoice({ onChoose }: PillChoiceProps) {
  const { setTheme } = useTheme();

  const choose = (theme: "cyber" | "corporate") => {
    setTheme(theme);
    try {
      localStorage.setItem(PILL_CHOSEN_KEY, "1");
    } catch {}
    onChoose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex bg-black">
      {/* Left: синя матрица – Blue pill / Corporate */}
      <button
        type="button"
        onClick={() => choose("corporate")}
        className="group relative flex-1 flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-inset touch-manipulation border-r border-cyan-500/20"
        aria-label="Blue pill – Corporate theme"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/40 via-black/50 to-black" />
        <MatrixRain color="cyan" />
        <span className="relative z-10 font-mono text-cyan-400/90 text-xs sm:text-base tracking-widest uppercase mb-2 sm:mb-4 group-hover:text-cyan-300 transition-colors">
          Blue pill
        </span>
        <span className="relative z-10 text-white/90 text-sm sm:text-xl font-semibold max-w-[90px] sm:max-w-[140px] text-center group-hover:text-white transition-colors leading-tight">
          See the truth
        </span>
        <span className="relative z-10 mt-1 sm:mt-2 text-cyan-500/70 text-[10px] sm:text-sm">Corporate style</span>
      </button>

      {/* Center: Morpheus */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 sm:w-52 md:w-64 pointer-events-none flex items-center justify-center">
        <img
          src="/morpheus-pills.png"
          alt=""
          className="w-full h-auto drop-shadow-2xl"
          aria-hidden
        />
      </div>

      {/* Right: червена матрица – Red pill / Cyber */}
      <button
        type="button"
        onClick={() => choose("cyber")}
        className="group relative flex-1 flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset touch-manipulation border-l border-red-500/20"
        aria-label="Red pill – Cyber theme"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-black/50 to-black" />
        <MatrixRain color="red" />
        <span className="relative z-10 font-mono text-red-400/90 text-xs sm:text-base tracking-widest uppercase mb-2 sm:mb-4 group-hover:text-red-300 transition-colors">
          Red pill
        </span>
        <span className="relative z-10 text-white/90 text-sm sm:text-xl font-semibold max-w-[90px] sm:max-w-[140px] text-center group-hover:text-white transition-colors leading-tight">
          Stay in the Matrix
        </span>
        <span className="relative z-10 mt-1 sm:mt-2 text-red-500/70 text-[10px] sm:text-sm">Cyber style</span>
      </button>

      <style>{`
        .matrix-rain-wrap {
          gap: 0;
        }
        .matrix-column {
          flex: 1 1 0;
          min-width: 0;
          max-width: 100%;
          width: 0;
          animation: pill-matrix-fall linear infinite;
          letter-spacing: 0.02em;
        }
        @keyframes pill-matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}
