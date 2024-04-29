import { useMutation, useQuery } from '@tanstack/react-query';
import useApi, { endPoints } from 'api';
import { useAuthContext } from 'hooks';
import { queryClient } from 'src/App';
import { AddCart, CartItem, CartRes, Carts, UpdateCartReq } from 'types';

/**
 * Custom hook for querying the cart items of the current user.
 */
const useCartQuery = () => {
  const api = useApi();
  const { user } = useAuthContext();

  // Function to fetch cart items
  const getCart = async () => {
    try {
      const res: CartRes = await api.get(`${endPoints.primary.cart}/${user?.id}`);
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
      const response: CartItem = await api.post(endPoints.primary.addCart, addCartReq);
      return response;
    } catch (error) {
      // Handle errors gracefully
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['CartQueryKey'],
    mutationFn: addCart,
  });
};

/**
 * Custom hook for updating a cart item.
 */
const useUpdateCartMutation = () => {
  const api = useApi();

  const updateCart = async ({
    cartId,
    updateData,
  }: {
    cartId: number;
    updateData: UpdateCartReq;
  }) => {
    try {
      const response: Carts = await api.put(`${endPoints.primary.carts}/${cartId}`, updateData);
      // Invalidate cache to reflect changes
      queryClient.invalidateQueries({ queryKey: ['CartQueryKey'] });
      return response;
    } catch (error) {
      // Handle errors gracefully
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['CartQueryKey'],
    mutationFn: updateCart,
  });
};

/**
 * Custom hook for deleting a cart item.
 */
const useDeleteCartMutation = () => {
  const api = useApi();

  const deleteCart = async ({ cartId }: { cartId: number }) => {
    try {
      const response: Carts = await api.delete(`${endPoints.primary.carts}/${cartId}`);
      // Invalidate cache to reflect changes
      queryClient.invalidateQueries({ queryKey: ['CartQueryKey'] });
      return response;
    } catch (error) {
      // Handle errors gracefully
      throw error;
    }
  };

  return useMutation({
    mutationKey: ['CartQueryKey'],
    mutationFn: deleteCart,
  });
};

export { useCartQuery, useAddCartMutation, useUpdateCartMutation, useDeleteCartMutation };
