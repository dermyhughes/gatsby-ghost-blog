import React from 'react';
import { ThemePreference } from '../../utils/theme';

interface ThemeToggleProps {
  theme: ThemePreference;
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  const isDark = theme === 'dark';
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  return (
    <button
      type='button'
      className='theme-toggle'
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isDark}
      data-theme={theme}
    >
      <span className='theme-toggle__rail' aria-hidden='true'>
        <span className='theme-toggle__stars'>
          <span />
          <span />
          <span />
        </span>
        <span className='theme-toggle__sun-moon' />
        <span className='theme-toggle__horizon' />
      </span>
      <span className='sr-only'>{label}</span>
    </button>
  );
};

export default ThemeToggle;
