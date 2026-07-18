import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Language = "en" | "bn";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (en: string, bn?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "bn" : "en"));
  }, []);

  const t = useCallback(
    (en: string, bn?: string) => {
      if (language === "bn" && bn) return bn;
      return en;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}
