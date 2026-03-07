import { Trophy, Star, Check, Volume2, Music, Settings, ExternalLink } from "lucide-react";
import { useGitHubRepos } from "@/hooks/useGitHub";

type QuestSidebarProps = { drawer?: boolean };

const QuestSidebar = ({ drawer }: QuestSidebarProps) => {
  const { repos, loading, error } = useGitHubRepos();
  const latestRepo = repos.length > 0 ? repos[0] : null;

  return (
    <aside className={`${drawer ? "w-full" : "w-64 shrink-0"} border-l border-border/80 flex flex-col overflow-y-auto bg-black/40 backdrop-blur-md`}>
      {/* Latest GitHub repo (was Active Quest) */}
      <div className="border-b border-border/80 rounded-lg m-2 shadow-xl shadow-black/30 bg-black/50 backdrop-blur-md border border-white/10">
        <div className="bg-primary/90 px-4 py-2 flex items-center justify-between rounded-t-lg">
          <span className="font-display text-[10px] tracking-widest text-primary-foreground font-bold">LATEST REPO</span>
        </div>

        <div className="p-4 space-y-4 rounded-b-lg">
          {loading && (
            <p className="font-mono text-[9px] text-gray-200">Loading…</p>
          )}
          {error && (
            <p className="font-mono text-[9px] text-primary">Could not load repo.</p>
          )}
          {!loading && !latestRepo && !error && (
            <p className="font-mono text-[9px] text-gray-200">No public repos.</p>
          )}
          {latestRepo && (
            <>
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-primary tracking-widest">REPOSITORY</span>
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
                OPEN ON GITHUB
                <ExternalLink className="w-3 h-3" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="flex-1" />
      <div className="border-t border-border">
        <SettingRow icon={Volume2} label="SOUND EFFECTS" enabled={true} />
        <SettingRow icon={Music} label="MUSIC" enabled={false} />
        <SettingRow icon={Settings} label="VISUAL SETTINGS" isGear />
      </div>
    </aside>
  );
};

const SettingRow = ({ icon: Icon, label, enabled, isGear }: { icon: any; label: string; enabled?: boolean; isGear?: boolean }) => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0">
    <span className="font-display text-[10px] tracking-wider text-gray-200">{label}</span>
    {isGear ? (
      <Icon className="w-4 h-4 text-gray-200" />
    ) : enabled ? (
      <Check className="w-4 h-4 text-primary" />
    ) : (
      <span className="text-gray-200 text-xs">✕</span>
    )}
  </div>
);

export default QuestSidebar;
