/**
 * A custom hook for interacting with the browser's local storage.
 * This hook provides functions for setting, getting, and removing items from local storage.
 * It simplifies the process of managing data persistence in local storage.
 * @returns An object containing functions for setting, getting, and removing items from local storage.
 */
export const useLocalStorage = () => {
  /**
   * Sets a key-value pair in the local storage.
   * @param key The key under which to store the value.
   * @param value The value to be stored.
   */
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  /**
   * Retrieves the value associated with the specified key from local storage.
   * @param key The key of the item to retrieve.
   * @returns The value associated with the specified key, or null if the key does not exist.
   */
  const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value;
  };

  /**
   * Removes the item with the specified key from local storage.
   * @param key The key of the item to remove.
   */
  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  // Return functions for interacting with local storage
  return { setItem, getItem, removeItem };
};
