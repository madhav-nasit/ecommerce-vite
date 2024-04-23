import { useContext } from 'react';
import { AuthContext } from '../contexts';

/**
 * A custom hook for accessing the authentication context provided by AuthProvider.
 * This hook allows components to access the current user and authentication-related functions.
 * It simplifies the process of accessing authentication state and actions throughout the application.
 * @returns An object containing the authentication context, including the current user and authentication functions.
 */
export const useAuthContext = () => {
  return useContext(AuthContext);
};
