import { FC } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ErrorPage, Home, PrivacyPolicy, SignIn, SignUp, TermsOfUse } from 'pages';
import { routes } from 'constants';
import { useAuthContext } from 'hooks';
import { PrivateRoute, PublicRoutes, PolicyRoutes } from 'routers';

/**
 * AppRouter component manages the routing configuration of the application.
 * It sets up routes for different pages and handles authentication-related routing.
 * It also provides error handling for undefined routes.
 */
export const AppRouter: FC = () => {
  // Fetching user authentication status from context
  const { user, isAppReady } = useAuthContext();
  const isAuthenticated = !!user;

  // Creating a browser router instance
  const router = createBrowserRouter(
    // Generating routes from JSX elements
    createRoutesFromElements(
      <Route path={routes.root} errorElement={<ErrorPage />}>
        {/* Private Route for authenticated users */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route index element={<Home />} />
          <Route path={'/:categoryName'} element={<Home />} />
        </Route>
        {/* Auth page route */}
        <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
          <Route path={routes.signIn} element={<SignIn />} />
          <Route path={routes.signUp} element={<SignUp />} />
        </Route>
        <Route element={<PolicyRoutes isAuthenticated={isAuthenticated} />}>
          <Route path={routes.termsCondition} element={<TermsOfUse />} />
          <Route path={routes.privacyPolicy} element={<PrivacyPolicy />} />
        </Route>
      </Route>,
    ),
  );

  if (!isAppReady) return null;

  // Rendering the RouterProvider with the created router
  return <RouterProvider router={router} />;
};
