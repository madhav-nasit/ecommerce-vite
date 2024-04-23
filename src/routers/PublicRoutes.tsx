import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from 'constants';
import { AuthPage } from 'pages';

interface PublicRoutesProps {
  isAuthenticated: boolean;
}

/**
 * PublicRoutes component handles routes accessible to all users, regardless of authentication status.
 * If the user is authenticated and tries to access public routes, it redirects them to the home page.
 * If the user is not authenticated, it renders the nested routes using the Outlet component.
 * @param isAuthenticated - Indicates whether the user is authenticated or not.
 */
export const PublicRoutes: React.FC<PublicRoutesProps> = ({ isAuthenticated }) => {
  // If authenticated, redirect to the home page
  if (isAuthenticated) return <Navigate to={routes.root} />;

  // If not authenticated, render the nested routes
  return <AuthPage />;
};
