import { useMutation, useQuery } from '@tanstack/react-query';
import useApi, { endPoints } from 'api';
import { ChatThread, NewUsers } from 'types';

/**
 * Custom hook to fetch new users for starting new chats.
 *
 * @returns {object} Query result with data, status, and error properties.
 */
const useUsersQuery = () => {
  const api = useApi();

  /**
   * Fetches new users from the API.
   *
   * @returns {Promise<NewUsers[]>} Array of new users.
   * @throws Will throw an error if the request fails.
   */
  const getUsers = async () => {
    try {
      const res: NewUsers[] = await api.get(`${endPoints.primary.newchat}`);
      return res;
    } catch (error) {
      throw error;
    }
  };

  return useQuery({
    queryKey: ['UsersQueryKey'],
    queryFn: getUsers,
  });
};

/**
 * Custom hook to fetch chat threads.
 *
 * @returns {object} Query result with data, status, and error properties.
 */
const useChatThreadsQuery = () => {
  const api = useApi();

  /**
   * Fetches chat threads from the API.
   *
   * @returns {Promise<ChatThread[]>} Array of chat threads.
   * @throws Will throw an error if the request fails.
   */
  const getChatThreads = async () => {
    try {
      const res: ChatThread[] = await api.get(`${endPoints.primary.chat}`);
      return res;
    } catch (error) {
      throw error;
    }
  };

  return useQuery({
    queryKey: ['ChatThreadsQueryKey'],
    queryFn: getChatThreads,
  });
};

/**
 * Custom hook to fetch or create a chat ID for a specific user.
 *
 * @returns {object} Mutation result with data, status, and error properties.
 */
const useChatIdMutation = () => {
  const api = useApi();

  /**
   * Fetches or creates a chat ID for the given user ID.
   *
   * @param {string} id - The user ID to fetch or create a chat for.
   * @returns {Promise<ChatThread>} The chat thread object.
   * @throws Will throw an error if the request fails.
   */
  const getChatId = async (id: string) => {
    try {
      const response: ChatThread = await api.get(`${endPoints.primary.chatId}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return useMutation({
    mutationFn: getChatId,
  });
};

export { useUsersQuery, useChatIdMutation, useChatThreadsQuery };
