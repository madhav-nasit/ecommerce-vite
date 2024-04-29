import { useQuery } from '@tanstack/react-query';
import useApi, { endPoints } from 'api';
import { User } from 'types';

/**
 * Custom hook for retrieving authenticated user information.
 *
 * This hook fetches the authenticated user's data from the API endpoint.
 * It utilizes React Query for managing asynchronous data fetching and updating the UI based on the response.
 */
const useUserQuery = () => {
  /**
   * useApi: A custom hook for accessing the API instance
   */
  const api = useApi();

  /**
   * getUser: Function for fetching the authenticated user's data
   */
  const getUser = async () => {
    try {
      const user: User = await api.get(endPoints.auth.getUser);
      return user;
    } catch (error: any) {
      throw error;
    }
  };

  return useQuery({
    queryKey: ['userQueryKey'],
    queryFn: getUser,
  });
};

export { useUserQuery };
