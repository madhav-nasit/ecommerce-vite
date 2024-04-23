import React from 'react';
import { useLocation } from 'react-router-dom';

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
}

/**
 * A component representing a menu item.
 *
 * @param href The URL the menu item links to.
 * @param children The content of the menu item.
 */
export const MenuItem: React.FC<MenuItemProps> = ({ href, children }) => {
  // Retrieve pathname to match with href
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li>
      <a
        href={href}
        className={`
          block rounded px-3 py-2 md:p-0 ${
            isActive
              ? 'bg-primary text-color-dark md:bg-transparent md:font-medium md:text-primary-dark dark:text-color-dark md:dark:text-color-dark'
              : 'hover:bg-hover dark:hover:bg-hover-dark text-light md:border-0 md:hover:bg-transparent md:hover:text-color dark:text-light-dark md:dark:hover:bg-transparent md:dark:hover:text-color-dark'
          }
        `}
      >
        {children}
      </a>
    </li>
  );
};
