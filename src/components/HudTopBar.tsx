import { User, ScrollText } from "lucide-react";
import { useEffect, useState } from "react";
import { useGitHubUser } from "@/hooks/useGitHub";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

type HudTopBarProps = {
  onOpenProfile?: () => void;
  onOpenQuest?: () => void;
};

const HudTopBar = ({ onOpenProfile, onOpenQuest }: HudTopBarProps) => {
  const { t, locale, setLocale } = useLanguage();
  const { toggleCyberfication, isCyber } = useTheme();
  const [serverTime, setServerTime] = useState("0:00");
  const [localTime, setLocalTime] = useState("00:00");
  const { user, loading, error } = useGitHubUser();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
      const mins = now.getMinutes();
      const secs = now.getSeconds();
      setServerTime(`${mins}:${secs.toString().padStart(2, "0")}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hud-top-bar h-11 sm:h-12 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-2 px-2 sm:px-4 shrink-0 safe-area-top scan-lines">
      {/* Left - само иконка профил */}
      <div className="flex-shrink-0 w-10 flex items-center justify-start">
        {onOpenProfile ? (
          <button
            type="button"
            onClick={onOpenProfile}
            className="md:hidden p-2 border border-cyan-400/40 rounded text-cyan-400 hover:bg-cyan-400/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open profile"
          >
            <User className="w-5 h-5" />
          </button>
        ) : null}
      </div>

      {/* Center – level (брой репота), език и времета */}
      <div className="flex-1 min-w-0 flex items-center justify-start sm:justify-center gap-1.5 sm:gap-3 overflow-x-auto overflow-y-hidden py-1">
        <a
          href={user ? `https://github.com/${user.login}?tab=repositories` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          title={error ? `GitHub: ${error}. Restart dev server after changing .env` : undefined}
          className="font-display text-base sm:text-xl font-bold text-cyan-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded shrink-0 tabular-nums"
        >
          {loading ? "…" : error ? "!" : user !== null ? user.public_repos : "—"}
        </a>
        <span className="font-display text-[9px] sm:text-[10px] tracking-widest text-gray-200 shrink-0">{t("hud.level")}</span>
        <div className="flex items-center gap-1 ml-1 shrink-0">
          <button
            type="button"
            onClick={() => setLocale("bg")}
            className={`font-mono text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded min-h-[28px] min-w-[28px] ${locale === "bg" ? "text-cyan-400 bg-cyan-400/15 border border-cyan-400/30" : "text-gray-400 hover:text-gray-200 border border-transparent"}`}
          >
            BG
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`font-mono text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded min-h-[28px] min-w-[28px] ${locale === "en" ? "text-cyan-400 bg-cyan-400/15 border border-cyan-400/30" : "text-gray-400 hover:text-gray-200 border border-transparent"}`}
          >
            EN
          </button>
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] text-gray-200 shrink-0">{t("hud.server")}</span>
        <span className="font-mono text-[9px] sm:text-[10px] text-red-400 shrink-0 tabular-nums" title="Server time">{serverTime}</span>
        <span className="font-mono text-[9px] sm:text-[10px] text-gray-400 shrink-0 hidden sm:inline">{t("hud.local")}</span>
        <span className="font-mono text-[9px] sm:text-[10px] text-cyan-400 shrink-0 tabular-nums" title="Local time">{localTime}</span>
      </div>

      {/* Right - quest + corporate toggle on desktop */}
      <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2 justify-end">
        <button
          type="button"
          onClick={toggleCyberfication}
          className="hidden sm:inline-flex text-[9px] font-mono text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1 border border-transparent hover:border-white/10 rounded"
        >
          {t(isCyber ? "corp.corporateStyle" : "corp.cyberStyle")}
        </button>
        {onOpenQuest ? (
          <button
            type="button"
            onClick={onOpenQuest}
            className="lg:hidden p-2 border border-cyan-400/40 rounded text-cyan-400 hover:bg-cyan-400/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open quest"
          >
            <ScrollText className="w-5 h-5" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HudTopBar;
