import { Trophy, Star, GitFork, ExternalLink } from "lucide-react";
import { useGitHubUser, useGitHubRepos, type GitHubRepo } from "@/hooks/useGitHub";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const AchievementsTab = () => {
  const { t } = useLanguage();
  const { isCyber } = useTheme();
  const { user, loading: userLoading } = useGitHubUser();
  const { repos, loading: reposLoading, error } = useGitHubRepos();

  const repoCount = user?.public_repos ?? 0;
  const progressTarget = Math.max(repoCount, 1);
  const progressRatio = Math.min(repoCount / progressTarget, 1);

  return (
    <div className={`p-4 sm:p-6 space-y-6 sm:space-y-8 animate-fade-in ${isCyber ? "cyber-content max-w-4xl mx-auto" : "corporate-content max-w-4xl mx-auto"}`}>
      <h2
        className={
          isCyber
            ? "font-display text-xs sm:text-sm tracking-widest text-center text-gray-200"
            : "text-lg sm:text-xl font-semibold text-center text-slate-100"
        }
      >
        {t("repos.title")}
      </h2>

      <div className={`flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 ${isCyber ? "cyber-hud-panel rounded-lg p-4 sm:p-5" : ""}`}>
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
              <circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke="hsl(var(--neon-green))"
                strokeWidth="3"
                strokeDasharray={`${progressRatio * 220} 220`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-lg text-[hsl(var(--neon-green))]">
                {userLoading ? t("common.loading") : `${repoCount}`}
              </span>
            </div>
          </div>
          <span className="font-mono text-[9px] text-gray-200 tracking-widest">{t("repos.publicRepos")}</span>
        </div>

        <div className="flex-1 space-y-3 min-w-0">
          <p className="font-body text-sm text-gray-200 leading-relaxed">
            {t("repos.levelTied")}
          </p>
          <a
            href={user ? `https://github.com/${user.login}?tab=repositories` : "https://github.com"}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block border px-4 py-2 font-display text-[10px] tracking-widest active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isCyber
                ? "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 focus-visible:ring-cyan-400"
                : "border-border text-foreground hover:border-primary hover:bg-primary/10 focus-visible:ring-primary"
            }`}
          >
            {t("repos.viewOnGitHub")}
          </a>
        </div>

        <div className="flex flex-wrap gap-4 shrink-0">
          <span className="font-mono text-[9px] text-[hsl(var(--neon-green))]">{t("repos.publicRepos")}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-mono text-[10px] text-gray-200 tracking-widest">{t("repos.publicRepos")}</h3>
        {reposLoading && (
          <p className="font-body text-sm text-gray-200">{t("repos.loading")}</p>
        )}
        {error && (
          <p className={`font-body text-sm ${isCyber ? "text-red-400" : "text-primary"}`}>{t("repos.error")}</p>
        )}
        {!reposLoading && !error && repos.length === 0 && (
          <p className="font-body text-sm text-gray-200">{t("repos.empty")}</p>
        )}
        {!reposLoading && repos.length > 0 && (
          <div className="space-y-4">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} isCyber={isCyber} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function RepoCard({ repo, isCyber }: { repo: GitHubRepo; isCyber: boolean }) {
  const updated = new Date(repo.updated_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        isCyber
          ? "block rounded-lg border border-white/15 bg-black/55 backdrop-blur-md p-4 flex flex-wrap items-start gap-4 hover:border-cyan-400/50 hover:bg-black/65 transition-all group shadow-lg shadow-black/40 cyber-hud-panel"
          : "block rounded-xl border border-slate-600/60 bg-slate-800/50 backdrop-blur-sm p-4 sm:p-5 flex flex-wrap items-start gap-4 hover:border-sky-500/50 hover:bg-slate-800/80 transition-all group shadow-md shadow-black/20"
      }
    >
      <div
        className={
          isCyber
            ? "w-12 h-12 rounded-lg border border-white/20 bg-black/30 flex items-center justify-center shrink-0"
            : "w-12 h-12 rounded-lg border border-slate-600/50 bg-slate-700/40 flex items-center justify-center shrink-0"
        }
      >
        <Trophy className={`w-6 h-6 ${isCyber ? "text-cyan-400" : "text-sky-400"}`} />
      </div>
      <div className="flex-1 space-y-1 min-w-0">
        <h4
          className={
            isCyber
              ? "font-display text-sm tracking-wider text-gray-100 group-hover:text-cyan-400 group-hover:underline"
              : "text-base font-semibold text-slate-100 group-hover:text-sky-400 group-hover:underline"
          }
        >
          {repo.name}
        </h4>
        {repo.description && (
          <p className="font-body text-xs text-gray-200 line-clamp-2">{repo.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {repo.language && (
            <span className={`px-2 py-0.5 text-[8px] font-display tracking-widest rounded ${isCyber ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30" : "bg-primary/20 text-primary border border-primary/30"}`}>
              {repo.language}
            </span>
          )}
          <span className="font-mono text-[9px] text-gray-200 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400/90" />
            {repo.stargazers_count}
          </span>
          <span className="font-mono text-[9px] text-gray-200 flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5" />
            {repo.forks_count}
          </span>
          <span className={`font-mono text-[9px] ${isCyber ? "text-cyan-400/80" : "text-primary"}`}>Updated {updated}</span>
        </div>
      </div>
      <ExternalLink className={`w-4 h-4 shrink-0 ${isCyber ? "text-gray-400 group-hover:text-cyan-400" : "text-gray-400 group-hover:text-primary"}`} />
    </a>
  );
}

export default AchievementsTab;
