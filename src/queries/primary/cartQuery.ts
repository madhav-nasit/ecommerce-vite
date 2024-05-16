import { useMutation, useQuery } from '@tanstack/react-query';
import useApi, { endPoints } from 'api';
import { queryClient } from 'src/App';
import { AddCart, CartItem, Carts } from 'types';

/**
 * Custom hook for querying the cart items of the current user.
 */
const useCartQuery = () => {
  const api = useApi();

  // Function to fetch cart items
  const getCart = async () => {
    try {
      const res: Carts = await api.get(`${endPoints.primary.cart}`);
      return res;
    } catch (error) {
      // Handle errors gracefully
      throw error;
    }
  };

  // Execute the query
  return useQuery({
    queryKey: ['CartQueryKey'],
    queryFn: getCart,
  });
};

/**
 * Custom hook for adding an item to the cart.
 */
const useAddCartMutation = () => {
  const api = useApi();

  const addCart = async (addCartReq: AddCart) => {
    try {
      const response: CartItem = await api.post(endPoints.primary.cart, addCartReq);
      return response;
    } catch (error) {
      // Handle errors gracefully
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['CartQueryKey'],
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CartQueryKey'] });
    },
  });
};

/**
 * Custom hook for deleting a cart item.
 */
const useDeleteCartMutation = () => {
  const api = useApi();

  const deleteCart = async ({ cartId, productId }: { cartId?: string; productId?: string }) => {
    try {
      const response: Carts = await api.delete(`${endPoints.primary.cart}`, {
        params: { cartId, productId },
      });
      return response;
    } catch (error) {
      // Handle errors gracefully
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['CartQueryKey'],
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CartQueryKey'] });
    },
  });
};

export { useCartQuery, useAddCartMutation, useDeleteCartMutation };
