import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type Lang = 'en' | 'am';

interface AppContextType {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  toggleLang: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Lang>('en');

  // Load configuration options from localStorage securely on initialization
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('omx_theme') as Theme;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.warn("Could not read theme settings:", e);
    }

    try {
      const savedLang = localStorage.getItem('omx_lang') as Lang;
      if (savedLang === 'en' || savedLang === 'am') {
        setLang(savedLang);
      }
    } catch (e) {
      console.warn("Could not read lang settings:", e);
    }
  }, []);

  // Synchronize document base properties for dark/light themes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    } else {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('omx_theme', next);
      } catch (e) {}
      return next;
    });
  };

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'am' : 'en';
      try {
        localStorage.setItem('omx_lang', next);
      } catch (e) {}
      return next;
    });
  };

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang }}>
      <div className={theme === 'light' ? 'light-mode' : 'dark-mode'}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
