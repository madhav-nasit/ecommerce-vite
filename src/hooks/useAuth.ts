import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../types';

/**
 * A custom hook for managing user authentication state and persisting user data.
 * This hook provides functions for logging in, logging out, and accessing the current user.
 * It also handles user persistence using local storage.
 */
export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const { setItem, getItem } = useLocalStorage();

  // Load user data from local storage when the component mounts
  useEffect(() => {
    try {
      // Retrieve user data from local storage
      const storedUser = getItem('user');
      // If user data exists in local storage, set the user state
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
    } finally {
      // Set the app ready state to true
      setIsAppReady(true);
    }
  }, []);

  /**
   * Adds a new user to the user state and persists it to local storage.
   * @param newUser The user object to be added.
   */
  const addUser = (newUser: User) => {
    setUser(newUser);
    setItem('user', JSON.stringify(newUser));
  };

  /**
   * Removes the current user from the user state and local storage.
   */
  const removeUser = () => {
    setUser(null);
    setItem('user', '');
  };

  /**
   * Logs in the user by adding the provided user object to the user state and local storage.
   * @param user The user object representing the logged-in user.
   */
  const login = (user: User) => {
    addUser(user);
  };

  /**
   * Logs out the current user by removing them from the user state and local storage.
   */
  const logout = () => {
    removeUser();
  };

  // Return the user state, login and logout functions, and app ready status
  return { user, login, logout, isAppReady };
};
