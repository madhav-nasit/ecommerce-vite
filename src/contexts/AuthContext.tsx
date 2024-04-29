import { createContext } from 'react';
import { useAuthUser } from 'hooks';
import { User } from 'types';

/**
 * Represents the authentication context, including the current user,
 * app readiness status, login, and logout functions.
 */
interface AuthContext {
  /**
   * The current authenticated user.
   */
  user?: User;
  /**
   * User authenticated token to access user apis
   */
  token?: string;
  /**
   * Indicates whether the app is ready.
   */
  isAppReady: boolean;
  /**
   * Function to log in the user.
   * @param user The user object representing the logged-in user.
   */
  login: ({ user, token }: { user: User; token: string }) => void;
  /**
   * Adds a new user to the user state and persists it to local storage.
   */
  addUser: (newUser: User) => void;
  /**
   * Function to log out the user.
   */
  logout: () => void;
}

/**
 * The authentication context used throughout the application.
 */
export const AuthContext = createContext<AuthContext>({
  user: undefined,
  token: undefined,
  isAppReady: false,
  login: () => {},
  addUser: () => {},
  logout: () => {},
});

/**
 * A provider component that wraps the application with the authentication context.
 * It provides access to the user authentication state and functions.
 * @param children The child components to be wrapped by the AuthProvider.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Retrieve user authentication state and functions from useAuthUser hook
  const { user, token, isAppReady, login, logout, addUser } = useAuthUser();

  // Provide user authentication context to the wrapped components
  return (
    <AuthContext.Provider value={{ user, token, login, addUser, logout, isAppReady }}>
      {children}
    </AuthContext.Provider>
  );
};
