import { useMutation, useQuery } from '@tanstack/react-query';
import useApi, { endPoints } from 'api';
import { queryClient } from 'src/App';
import { Order } from 'types';

/**
 * Custom hook for querying the orders of the current user.
 */
const useOrderQuery = () => {
  const api = useApi();

  // Function to fetch cart items
  const getCart = async () => {
    try {
      const res: Order = await api.get(`${endPoints.primary.order}`);
      return res;
    } catch (error) {
      // Handle errors gracefully
      throw error;
    }
  };

  // Execute the query
  return useQuery({
    queryKey: ['OrderQueryKey'],
    queryFn: getCart,
  });
};

/**
 * Custom hook for place an order.
 */
const usePlaceOrderMutation = () => {
  const api = useApi();

  const placeOrder = async () => {
    try {
      const response: Order = await api.post(endPoints.primary.order);
      return response;
    } catch (error) {
      // Handle errors gracefully
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['OrderQueryKey'],
    mutationFn: placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['OrderQueryKey'] });
      queryClient.invalidateQueries({ queryKey: ['CartQueryKey'] });
    },
  });
};

export { useOrderQuery, usePlaceOrderMutation };
