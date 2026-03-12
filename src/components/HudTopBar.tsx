import { User, ScrollText } from "lucide-react";
import { useEffect, useState } from "react";
import { useGitHubUser } from "@/hooks/useGitHub";
import { useLanguage } from "@/contexts/LanguageContext";

type HudTopBarProps = {
  onOpenProfile?: () => void;
  onOpenQuest?: () => void;
};

const HudTopBar = ({ onOpenProfile, onOpenQuest }: HudTopBarProps) => {
  const { t, locale, setLocale } = useLanguage();
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
    <div className="h-10 sm:h-10 bg-black/50 backdrop-blur-sm border-b border-border/80 flex items-center justify-between gap-2 px-2 sm:px-4 shrink-0 safe-area-top">
      {/* Left - само иконка профил */}
      <div className="flex-shrink-0 w-10 flex items-center justify-start">
        {onOpenProfile ? (
          <button
            type="button"
            onClick={onOpenProfile}
            className="md:hidden p-2 border border-primary/60 rounded text-primary hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary touch-manipulation"
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
          className="font-display text-base sm:text-2xl font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded shrink-0"
        >
          {loading ? "…" : error ? "!" : user !== null ? user.public_repos : "—"}
        </a>
        <span className="font-display text-[9px] sm:text-[10px] tracking-widest text-gray-200 shrink-0">{t("hud.level")}</span>
        <div className="flex items-center gap-1 ml-1 shrink-0">
          <button
            type="button"
            onClick={() => setLocale("bg")}
            className={`font-mono text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded ${locale === "bg" ? "text-primary bg-primary/20" : "text-gray-400 hover:text-gray-200"}`}
          >
            BG
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`font-mono text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded ${locale === "en" ? "text-primary bg-primary/20" : "text-gray-400 hover:text-gray-200"}`}
          >
            EN
          </button>
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] text-gray-200 shrink-0">{t("hud.server")}</span>
        <span className="font-mono text-[9px] sm:text-[10px] text-primary shrink-0" title="Server time">{serverTime}</span>
        <span className="font-mono text-[9px] sm:text-[10px] text-gray-200 shrink-0">{t("hud.local")}</span>
        <span className="font-mono text-[9px] sm:text-[10px] text-primary shrink-0" title="Local time">{localTime}</span>
      </div>

      {/* Right - само иконка quest */}
      <div className="flex-shrink-0 flex items-center gap-1 w-10 sm:w-auto justify-end">
        {onOpenQuest ? (
          <button
            type="button"
            onClick={onOpenQuest}
            className="lg:hidden p-2 border border-primary/60 rounded text-primary hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary touch-manipulation"
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
