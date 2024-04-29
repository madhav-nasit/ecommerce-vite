import { useQuery } from '@tanstack/react-query';
import useApi, { endPoints } from 'api';
import { useAuthContext } from 'hooks';
import { CartRes } from 'types';

/**
 * Custom hook for querying products based on category, limit, and skip parameters.
 *
 * @param categoryName The name of the category to filter products by. Pass 'all' to retrieve all products.
 * @param limit The maximum number of products to retrieve per request.
 * @param skip The number of products to skip from the beginning of the result set.
 */
const useCartQuery = () => {
  /**
   * useApi: A custom hook for accessing the API instance
   */
  const api = useApi();
  const { user } = useAuthContext();

  /**
   * getProducts: Function for fetching products based on category, limit, and skip parameters
   */
  const getCart = async () => {
    try {
      const res: CartRes = await api.get(`${endPoints.primary.cart}/${user?.id}`);
      return res;
    } catch (error: any) {
      throw error;
    }
  };

  return useQuery({
    queryKey: ['CartQueryKey'],
    queryFn: getCart,
  });
};

export { useCartQuery };
