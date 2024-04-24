import React, { ButtonHTMLAttributes } from 'react';
import { useLocalStorage } from 'hooks';
import { DarkMode, LightMode } from 'assets/svgs';

/**
 * Props for the ThemeToggle component.
 */
interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Component for toggling between light and dark themes.
 * @param props - Props for the ThemeToggle component.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = (props) => {
  const { className, ...rest } = props;
  const { setItem, getItem } = useLocalStorage();

  /**
   * Toggles between light and dark themes.
   */
  const toggleTheme = () => {
    // Get the current theme from localStorage or default to 'light'
    const currentTheme = getItem('color-theme') || 'light';

    // Determine the next theme
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Toggle the class on documentElement
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    // Store the next theme in localStorage
    setItem('color-theme', nextTheme);
  };

  return (
    <button
      type='button'
      className={`z-50 flex size-8 flex-col items-center justify-center rounded-full border border-border bg-secondary hover:scale-110 hover:bg-hover md:size-10 dark:border-border-dark dark:bg-secondary-dark dark:hover:bg-hover-dark ${className}`}
      onClick={toggleTheme}
      {...rest}
    >
      <LightMode className='fill-light dark:hidden' />
      <DarkMode className='hidden dark:block dark:fill-light-dark' />
    </button>
  );
};
