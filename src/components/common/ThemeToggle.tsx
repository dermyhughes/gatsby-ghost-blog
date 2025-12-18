import React from 'react';
import { Expand } from '@theme-toggles/react';
import { ThemePreference } from '../../utils/theme';

interface ThemeToggleProps {
  theme: ThemePreference;
  onToggle?: (toggled?: boolean) => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  const isDark = theme === 'dark';
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  const handleToggle = (toggled?: boolean) => {
    if (typeof onToggle === 'function') onToggle(toggled);
  };

  return (
    <div className='theme-toggle-wrapper' data-theme={theme}>
      <Expand
        duration={750}
        onToggle={handleToggle}
        aria-label={label}
        title={label}
        toggled={isDark}
        placeholder=''
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />
      <span className='sr-only'>{label}</span>
    </div>
  );
};

export default ThemeToggle;
