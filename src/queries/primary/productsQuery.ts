import { useQuery } from '@tanstack/react-query';
import useApi, { endPoints } from 'api';
import { Product, ProductRes } from 'types';

/**
 * Custom hook for querying products based on category, limit, and skip parameters.
 *
 * @param categoryName The name of the category to filter products by. Pass 'all' to retrieve all products.
 * @param limit The maximum number of products to retrieve per request.
 * @param skip The number of products to skip from the beginning of the result set.
 */
const useProductQuery = (categoryName: string, limit: number, page: number) => {
  /**
   * useApi: A custom hook for accessing the API instance
   */
  const api = useApi();

  /**
   * getProducts: Function for fetching products based on category, limit, and skip parameters
   */
  const getProducts = async () => {
    try {
      const res: ProductRes = await api.get(endPoints.primary.products, {
        params: {
          limit,
          page,
          ...(categoryName && categoryName !== 'all' && { category: categoryName }),
        },
      });
      return res;
    } catch (error: any) {
      throw error;
    }
  };

  return useQuery({
    queryKey: ['ProductsQueryKey', limit, page, categoryName],
    queryFn: getProducts,
  });
};

/**
 * Custom hook for querying all available categories.
 */
const useCategoryQuery = () => {
  /**
   * useApi: A custom hook for accessing the API instance
   */
  const api = useApi();

  /**
   * getCategories: Function for fetching all available categories
   */
  const getCategories = async () => {
    try {
      const res: { _id: string; name: string }[] = await api.get(endPoints.primary.allCategories);
      return res;
    } catch (error: any) {
      throw error;
    }
  };

  /**
   * useQuery: React Query hook for handling data queries
   */
  return useQuery({
    queryKey: ['CategoriesQueryKey'],
    queryFn: getCategories,
  });
};

/**
 * Custom hook for querying product details by ID.
 *
 * @param productId The ID of the product to retrieve details for.
 */
const useProductDetails = (productId?: string) => {
  /**
   * useApi: A custom hook for accessing the API instance
   */
  const api = useApi();

  /**
   * getProductDetails: Function for fetching product details by ID
   */
  const getProductDetails = async () => {
    try {
      const res: Product = await api.get(`${endPoints.primary.products}/${productId}`);
      return res;
    } catch (error: any) {
      throw error;
    }
  };

  return useQuery({
    queryKey: ['ProductDetailsQueryKey', productId],
    queryFn: getProductDetails,
  });
};

export { useProductQuery, useCategoryQuery, useProductDetails };
