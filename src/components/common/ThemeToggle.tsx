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
    >
      <span className='theme-toggle__icon' aria-hidden='true'>
        {isDark ? '🌙' : '☀️'}
      </span>
      <span className='theme-toggle__track' aria-hidden='true'>
        <span className={`theme-toggle__thumb ${isDark ? 'is-dark' : 'is-light'}`} />
      </span>
      <span className='theme-toggle__text'>{isDark ? 'Dark' : 'Light'} mode</span>
    </button>
  );
};

export default ThemeToggle;
