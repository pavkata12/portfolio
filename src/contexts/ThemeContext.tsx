import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "portfolio-theme";

export type PortfolioTheme = "cyber" | "corporate";

type ThemeContextType = {
  theme: PortfolioTheme;
  isCyber: boolean;
  setTheme: (t: PortfolioTheme) => void;
  toggleCyberfication: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function loadTheme(): PortfolioTheme {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === "corporate" || s === "cyber") return s;
  } catch {}
  return "cyber";
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<PortfolioTheme>(() => loadTheme());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = useCallback((t: PortfolioTheme) => setThemeState(t), []);
  const isCyber = theme === "cyber";
  const toggleCyberfication = useCallback(() => {
    setThemeState((prev) => (prev === "cyber" ? "corporate" : "cyber"));
  }, []);

  const value: ThemeContextType = { theme, isCyber, setTheme, toggleCyberfication };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
