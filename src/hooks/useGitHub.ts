import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

function getGitHubUsername(): string {
  return siteConfig.githubUsername;
}

const GITHUB_HEADERS: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "Portfolio-App",
};

export interface GitHubUser {
  public_repos: number;
  login: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export function useGitHubUser() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = getGitHubUsername();
    fetch(`https://api.github.com/users/${username}`, { headers: GITHUB_HEADERS })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUser({ public_repos: data.public_repos, login: data.login });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = getGitHubUsername();
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=public`,
      { headers: GITHUB_HEADERS }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setRepos(
          data.map((r: any) => ({
            id: r.id,
            name: r.name,
            full_name: r.full_name,
            description: r.description,
            html_url: r.html_url,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            language: r.language,
            updated_at: r.updated_at,
          }))
        );
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { repos, loading, error };
}
