/**
 * Central site config for portfolio theme.
 * Edit this file (and .env for GitHub) to rebrand the theme.
 */

const env = import.meta.env;

export const siteConfig = {
  /** Your full name – used in header, profile, alt texts */
  name: "Pavlin Moinov",
  /** Short tagline under name (e.g. "Web Developer", "Full-Stack Dev") */
  tagline: "Web Developer",
  /** Organization/company (e.g. "FREELANCE", "ACME Corp") – shown in cyber profile */
  organization: "FREELANCE",
  /** Hero slogan on the main page (cyber theme); also "Motto" in profile */
  heroSlogan: "Pavlin Moynov",
  /** Contact */
  email: "pavkamoinov69@gmail.com",
  phone: "+359 884 823 842",
  /** GitHub username – also set VITE_GITHUB_USERNAME in .env for Level/Achievements */
  githubUsername: (env.VITE_GITHUB_USERNAME as string) || "pavkata12",
  /** Skills string shown in profile sidebar (corporate) */
  skills: "Vue.js, Node.js, Python, React, TypeScript, SQLite, PWA",
} as const;

export function githubUrl(path = ""): string {
  const base = `https://github.com/${siteConfig.githubUsername}`;
  return path ? `${base}/${path}` : base;
}
