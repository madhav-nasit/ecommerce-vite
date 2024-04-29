import { FC, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from 'constants';
import { NavBar } from 'pages';

interface PrivateRoutesProps {
  isAuthenticated: boolean;
}

export interface PrivateRouteContext {
  setSticky: React.Dispatch<React.SetStateAction<boolean>>;
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

  // set navbar as sticky top
  const [sticky, setSticky] = useState<boolean>(true);

  // If authenticated, render the nested routes
  return (
    <div className='h-screen w-screen'>
      <NavBar sticky={sticky} />
      <Outlet context={{ setSticky }} />
    </div>
  );
};
