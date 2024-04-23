import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from 'pages';

interface PolicyRoutesProps {
  isAuthenticated: boolean;
}

/**
 * PolicyRoutes Component
 *
 * This component handles routing for policy-related pages.
 * If the user is authenticated, it renders the NavBar and the nested routes.
 * If the user is not authenticated, it renders only the nested routes.
 *
 * @param isAuthenticated - A boolean indicating whether the user is authenticated or not.
 */
export const PolicyRoutes: FC<PolicyRoutesProps> = ({ isAuthenticated }) => {
  // If not authenticated, just show policy page
  if (!isAuthenticated)
    return (
      <div className='-mt-12'>
        <Outlet />
      </div>
    );

  // If authenticated, render the nested routes
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
