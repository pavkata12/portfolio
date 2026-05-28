import { useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

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
    [],
  );
  const isCyan = color === "cyan";
  return (
    <div className="absolute inset-0 flex overflow-hidden matrix-rain-wrap opacity-60 sm:opacity-70" aria-hidden>
      {columns.map((col) => (
        <div
          key={col.id}
          className="matrix-column flex-1 min-w-0 text-[9px] sm:text-[10px] leading-[1.3] font-mono whitespace-pre"
          style={{
            color: isCyan ? "rgba(34, 211, 238, 0.85)" : "rgba(248, 113, 113, 0.85)",
            textShadow: isCyan
              ? "0 0 6px rgba(34, 211, 238, 0.5)"
              : "0 0 6px rgba(248, 113, 113, 0.5)",
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

type PillTextProps = {
  label: string;
  title: string;
  subtitle: string;
  accent: "cyan" | "red";
};

function PillText({ label, title, subtitle, accent }: PillTextProps) {
  const isCyan = accent === "cyan";
  return (
    <div
      className={`relative z-10 mx-3 sm:mx-6 px-4 sm:px-6 py-4 sm:py-5 rounded-2xl text-center max-w-[min(100%,220px)] sm:max-w-[260px] backdrop-blur-sm border ${
        isCyan
          ? "bg-black/20 border-cyan-400/25 shadow-[0_0_24px_rgba(34,211,238,0.08)]"
          : "bg-black/20 border-red-400/25 shadow-[0_0_24px_rgba(248,113,113,0.08)]"
      }`}
    >
      <span
        className={`block font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2 sm:mb-3 ${
          isCyan ? "text-cyan-300" : "text-red-300"
        }`}
        style={{ textShadow: isCyan ? "0 0 12px rgba(34,211,238,0.5)" : "0 0 12px rgba(248,113,113,0.5)" }}
      >
        {label}
      </span>
      <span
        className="block text-white text-base sm:text-2xl font-bold leading-snug"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)" }}
      >
        {title}
      </span>
      <span className={`block mt-2 sm:mt-3 text-xs sm:text-sm font-medium ${isCyan ? "text-cyan-200/90" : "text-red-200/90"}`}>
        {subtitle}
      </span>
    </div>
  );
}

type PillChoiceProps = {
  onChoose: () => void;
};

export default function PillChoice({ onChoose }: PillChoiceProps) {
  const { setTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  const choose = (theme: "cyber" | "corporate") => {
    setTheme(theme);
    try {
      localStorage.setItem(PILL_CHOSEN_KEY, "1");
    } catch {}
    onChoose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black">
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-center gap-2 px-4 py-3 safe-area-top bg-black/50 backdrop-blur-sm border-b border-white/10">
        <span className="text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-wider mr-1 hidden sm:inline">
          {t("pill.chooseLanguage")}
        </span>
        <button
          type="button"
          onClick={() => setLocale("bg")}
          className={`text-xs font-semibold px-3 py-1.5 rounded-md min-h-[36px] min-w-[40px] transition-colors touch-manipulation ${
            locale === "bg" ? "text-cyan-300 bg-cyan-400/15 border border-cyan-400/40" : "text-white/50 hover:text-white/80 border border-transparent"
          }`}
        >
          BG
        </button>
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={`text-xs font-semibold px-3 py-1.5 rounded-md min-h-[36px] min-w-[40px] transition-colors touch-manipulation ${
            locale === "en" ? "text-cyan-300 bg-cyan-400/15 border border-cyan-400/40" : "text-white/50 hover:text-white/80 border border-transparent"
          }`}
        >
          EN
        </button>
      </div>

      <div className="flex flex-1 min-h-0 pt-12 sm:pt-14">
        {/* Left: blue pill / Corporate */}
        <button
          type="button"
          onClick={() => choose("corporate")}
          className="group relative flex-1 flex flex-col items-center justify-center min-h-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-inset touch-manipulation border-r border-cyan-500/25"
          aria-label={t("pill.blueAria")}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/50 via-black/70 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,transparent_65%)]" />
          <MatrixRain color="cyan" />
          <div className="group-hover:scale-[1.02] transition-transform duration-300">
            <PillText
              label={t("pill.blueLabel")}
              title={t("pill.blueTitle")}
              subtitle={t("pill.blueSubtitle")}
              accent="cyan"
            />
          </div>
        </button>

        {/* Center: Morpheus */}
        <div className="absolute left-1/2 top-[54%] sm:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 sm:w-52 md:w-64 pointer-events-none flex items-center justify-center">
          <img
            src="/morpheus-pills.png"
            alt=""
            className="w-full h-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)]"
            aria-hidden
          />
        </div>

        {/* Right: red pill / Cyber */}
        <button
          type="button"
          onClick={() => choose("cyber")}
          className="group relative flex-1 flex flex-col items-center justify-center min-h-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset touch-manipulation border-l border-red-500/25"
          aria-label={t("pill.redAria")}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 via-black/70 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,transparent_65%)]" />
          <MatrixRain color="red" />
          <div className="group-hover:scale-[1.02] transition-transform duration-300">
            <PillText
              label={t("pill.redLabel")}
              title={t("pill.redTitle")}
              subtitle={t("pill.redSubtitle")}
              accent="red"
            />
          </div>
        </button>
      </div>

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
