import { useState } from "react";
import { Trophy, Star, Check, Volume2, Music, Video, Settings, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useGitHubRepos } from "@/hooks/useGitHub";
import { useAudio } from "@/contexts/AudioContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

type QuestSidebarProps = { drawer?: boolean };

const QuestSidebar = ({ drawer }: QuestSidebarProps) => {
  const { repos, loading, error } = useGitHubRepos();
  const { soundEffectsEnabled, musicEnabled, heroSoundEnabled, toggleSoundEffects, toggleMusic, toggleHeroSound } = useAudio();
  const { isCyber, toggleCyberfication } = useTheme();
  const { t } = useLanguage();
  const [visualSettingsOpen, setVisualSettingsOpen] = useState(false);
  const latestRepo = repos.length > 0 ? repos[0] : null;

  if (!isCyber) {
    return (
      <aside className={`${drawer ? "w-full" : "w-64 shrink-0"} border-l border-slate-700 flex flex-col overflow-y-auto bg-slate-800/60 backdrop-blur-md`}>
        <div className="p-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">GitHub</h3>
          {loading && <p className="text-sm text-slate-400">{t("repos.loading")}</p>}
          {error && <p className="text-sm text-amber-400">{t("repos.error")}</p>}
          {!loading && latestRepo && !error && (
            <div className="rounded-lg border border-slate-600 bg-slate-800/80 p-4 space-y-3">
              <p className="font-medium text-slate-100">{latestRepo.name}</p>
              {latestRepo.description && <p className="text-sm text-slate-400 line-clamp-2">{latestRepo.description}</p>}
              <a
                href={latestRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300"
              >
                {t("repos.viewOnGitHub")} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
        <div className="flex-1" />
        <div className="p-4 border-t border-slate-700">
          <button
            type="button"
            onClick={toggleCyberfication}
            className="w-full py-2 text-center text-xs text-slate-400 hover:text-sky-400 transition-colors"
          >
            {t("corp.cyberStyle")}
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${drawer ? "w-full" : "w-64 shrink-0"} border-l border-border/80 flex flex-col overflow-y-auto cyber-sidebar-bg backdrop-blur-md`}>
      <div className="border-b border-border/80 rounded-lg m-2 shadow-xl shadow-black/30 bg-black/50 backdrop-blur-md border border-white/10">
        <div className="bg-primary/90 px-4 py-2 flex items-center justify-between rounded-t-lg">
          <span className="font-display text-[10px] tracking-widest text-primary-foreground font-bold">{t("repos.title").toUpperCase()}</span>
        </div>

        <div className="p-4 space-y-4 rounded-b-lg">
          {loading && (
            <p className="font-mono text-[9px] text-gray-200">{t("repos.loading")}</p>
          )}
          {error && (
            <p className="font-mono text-[9px] text-primary">{t("repos.error")}</p>
          )}
          {!loading && !latestRepo && !error && (
            <p className="font-mono text-[9px] text-gray-200">{t("repos.empty")}</p>
          )}
          {latestRepo && (
            <>
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-primary tracking-widest">{t("repos.title").toUpperCase()}</span>
                <p className="font-display text-sm tracking-wider text-foreground">{latestRepo.name}</p>
              </div>

              {latestRepo.description && (
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-primary tracking-widest">ABOUT</span>
                  <p className="font-body text-xs text-gray-200 leading-relaxed line-clamp-3">
                    {latestRepo.description}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <span className="font-mono text-[9px] text-primary tracking-widest">STATS</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[hsl(var(--neon-amber))]" />
                    <span className="font-mono text-[10px] text-gray-200">{latestRepo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="font-mono text-[10px] text-gray-200">{latestRepo.forks_count}</span>
                  </div>
                  {latestRepo.language && (
                    <span className="font-mono text-[9px] text-primary">{latestRepo.language}</span>
                  )}
                </div>
              </div>

              <a
                href={latestRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-primary py-2 font-display text-[9px] tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {t("profile.openOnGitHub")}
                <ExternalLink className="w-3 h-3" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1" />
      <div className="border-t border-border">
        <SettingRow icon={Video} label="HERO SOUND EFFECT" enabled={heroSoundEnabled} onClick={toggleHeroSound} />
        <SettingRow icon={Volume2} label="CLICK SOUND EFFECT" enabled={soundEffectsEnabled} onClick={toggleSoundEffects} />
        <SettingRow icon={Music} label="MUSIC" enabled={musicEnabled} onClick={toggleMusic} />
        <div>
          <SettingRow
            icon={Settings}
            label="VISUAL SETTINGS"
            isGear
            onClick={() => setVisualSettingsOpen((v) => !v)}
            expandIcon={visualSettingsOpen ? <ChevronUp className="w-4 h-4 text-gray-200" /> : <ChevronDown className="w-4 h-4 text-gray-200" />}
          />
          {visualSettingsOpen && (
            <div className="border-b border-border bg-black/30">
              <SettingRow
                icon={Volume2}
                label="Cyberfication"
                enabled={isCyber}
                onClick={toggleCyberfication}
                indent
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

const SettingRow = ({
  icon: Icon,
  label,
  enabled,
  isGear,
  onClick,
  expandIcon,
  indent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  enabled?: boolean;
  isGear?: boolean;
  onClick?: () => void;
  expandIcon?: React.ReactNode;
  indent?: boolean;
}) => (
  <div
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    onKeyDown={onClick ? (e) => (e.key === "Enter" || e.key === " ") && onClick() : undefined}
    className={`flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0 ${indent ? "pl-6" : ""} ${onClick ? "cursor-pointer hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" : ""}`}
  >
    <span className="font-display text-[10px] tracking-wider text-gray-200">{label}</span>
    <div className="flex items-center gap-1">
      {expandIcon}
      {isGear && <Icon className="w-4 h-4 text-gray-200" />}
      {!isGear && enabled && <Check className="w-4 h-4 text-primary" />}
      {!isGear && enabled === false && <span className="text-gray-200 text-xs">✕</span>}
    </div>
  </div>
);

export default QuestSidebar;
