import React, { useEffect, useMemo, useState } from 'react';
import {
  applyTheme,
  getInitialTheme,
  getStoredTheme,
  persistTheme,
  subscribeToSystemTheme,
} from '../utils/theme';
import type { ThemePreference } from '../utils/theme';

function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>('light');

  useEffect(() => {
    const rootTheme = document.documentElement.dataset.theme;
    if (rootTheme === 'light' || rootTheme === 'dark') {
      setTheme(rootTheme);
      return;
    }

    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const hasStoredPreference = Boolean(getStoredTheme());

    if (hasStoredPreference) {
      return () => {};
    }

    const unsubscribe = subscribeToSystemTheme((systemTheme) => {
      setTheme(systemTheme);
      applyTheme(systemTheme);
    });

    return () => unsubscribe();
  }, []);

  const label = useMemo(() => `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`, [theme]);

  const handleToggle = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      persistTheme(nextTheme);
      applyTheme(nextTheme);
      return nextTheme;
    });
  };

  return (
    <div className='theme-toggle-wrapper' data-theme={theme}>
      <button
        type='button'
        className='theme-toggle'
        onClick={handleToggle}
        aria-label={label}
        title={label}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </button>
    </div>
  );
}

export default ThemeToggle;
