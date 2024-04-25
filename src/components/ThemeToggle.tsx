import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from 'hooks';
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

  const { toggleTheme } = useTheme();

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
