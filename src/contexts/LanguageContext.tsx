import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Locale } from "@/i18n/translations";

const STORAGE_KEY = "portfolio-locale";

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

function loadLocale(): Locale {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === "bg" || s === "en") return s;
  } catch {}
  return "bg";
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => loadLocale());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const t = useCallback(
    (key: string) => translations[locale][key] ?? key,
    [locale]
  );

  const value: LanguageContextType = { locale, setLocale, t };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

const defaultLocale: Locale = "bg";
const defaultT = (key: string) => translations[defaultLocale][key] ?? key;

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      locale: defaultLocale,
      setLocale: () => {},
      t: defaultT,
    };
  }
  return ctx;
};
