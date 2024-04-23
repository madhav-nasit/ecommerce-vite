import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from 'constants';

interface PrivateRoutesProps {
  isAuthenticated: boolean;
}

/**
 * PrivateRoute component restricts access to routes based on the authentication status.
 * If the user is not authenticated, it redirects them to the sign-in page.
 * If the user is authenticated, it renders the nested routes using the Outlet component.
 * @param isAuthenticated - Indicates whether the user is authenticated or not.
 */
export const PrivateRoute: FC<PrivateRoutesProps> = ({ isAuthenticated }) => {
  // If not authenticated, redirect to the sign-in page
  if (!isAuthenticated) return <Navigate to={routes.signIn} />;

  // If authenticated, render the nested routes
  return <Outlet />;
};
