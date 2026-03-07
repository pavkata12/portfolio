import { Trophy, Star, GitFork, ExternalLink } from "lucide-react";
import { useGitHubUser, useGitHubRepos, type GitHubRepo } from "@/hooks/useGitHub";

const AchievementsTab = () => {
  const { user, loading: userLoading } = useGitHubUser();
  const { repos, loading: reposLoading, error } = useGitHubRepos();

  const repoCount = user?.public_repos ?? 0;
  const progressTarget = Math.max(repoCount, 1);
  const progressRatio = Math.min(repoCount / progressTarget, 1);

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 animate-fade-in">
      <h2 className="font-display text-xs sm:text-sm tracking-widest text-center text-gray-200">achievements</h2>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
        {/* Progress Circle - public repos count */}
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
                {userLoading ? "…" : `${repoCount}`}
              </span>
            </div>
          </div>
          <span className="font-mono text-[9px] text-gray-200 tracking-widest">PUBLIC REPOS</span>
        </div>

        <div className="flex-1 space-y-3 min-w-0">
          <p className="font-body text-sm text-gray-200 leading-relaxed">
            Level is tied to GitHub: one level per public repository. Achievements below are your public repositories.
          </p>
          <a
            href={user ? `https://github.com/${user.login}?tab=repositories` : "https://github.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-border px-4 py-2 font-display text-[10px] tracking-widest text-foreground hover:border-primary hover:bg-primary/10 active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            VIEW ON GITHUB
          </a>
        </div>

        <div className="flex flex-wrap gap-4 shrink-0">
          <span className="font-mono text-[9px] text-[hsl(var(--neon-green))]">PUBLIC REPOSITORIES</span>
        </div>
      </div>

      {/* Public repositories as achievements */}
      <div className="space-y-3">
        <h3 className="font-mono text-[10px] text-gray-200 tracking-widest">PUBLIC REPOSITORIES</h3>
        {reposLoading && (
          <p className="font-body text-sm text-gray-200">Loading repositories…</p>
        )}
        {error && (
          <p className="font-body text-sm text-primary">Could not load repositories. Check VITE_GITHUB_USERNAME or try again later.</p>
        )}
        {!reposLoading && !error && repos.length === 0 && (
          <p className="font-body text-sm text-gray-200">No public repositories found.</p>
        )}
        {!reposLoading && repos.length > 0 && (
          <div className="space-y-4">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function RepoCard({ repo }: { repo: GitHubRepo }) {
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
      className="block rounded-lg border border-white/20 bg-black/50 backdrop-blur-md p-4 flex flex-wrap items-start gap-4 hover:border-primary/80 hover:bg-black/60 transition-all group shadow-lg shadow-black/30"
    >
      <div className="w-12 h-12 rounded-lg border border-white/20 bg-black/30 flex items-center justify-center shrink-0">
        <Trophy className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1 space-y-1 min-w-0">
        <h4 className="font-display text-sm tracking-wider text-gray-100 group-hover:text-primary group-hover:underline">{repo.name}</h4>
        {repo.description && (
          <p className="font-body text-xs text-gray-200 line-clamp-2">{repo.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {repo.language && (
            <span className="px-2 py-0.5 text-[8px] font-display tracking-widest bg-primary/20 text-primary border border-primary/30 rounded">
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
          <span className="font-mono text-[9px] text-primary">Updated {updated}</span>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary shrink-0" />
    </a>
  );
}

export default AchievementsTab;
