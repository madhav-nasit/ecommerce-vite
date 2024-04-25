/**
 * Module for handling queries related to products and categories.
 */

import { useQuery } from '@tanstack/react-query';
import api, { endPoints } from 'api';
import { ProductRes } from 'types';

/**
 * Custom hook for querying products based on category, limit, and skip parameters.
 * @param categoryName
 * @param limit
 * @param skip
 */
const useProductQuery = (categoryName: string, limit: number, skip: number) => {
  const getProducts = async () => {
    const endPoint =
      !!categoryName && categoryName !== 'all'
        ? `${endPoints.primary.productCategory}/${categoryName}`
        : endPoints.primary.products;

    const res: ProductRes = await api.get(endPoint, {
      params: {
        limit,
        skip,
      },
    });
    return res;
  };

  // Queries
  return useQuery({
    queryKey: ['ProductsQueryKey', limit, skip, categoryName],
    queryFn: getProducts,
  });
};

/**
 * Custom hook for querying all available categories.
 */
const useCategoryQuery = () => {
  const getCategories = async () => {
    const res: string[] = await api.get(endPoints.primary.allCategories);
    return res;
  };

  // Queries
  return useQuery({
    queryKey: ['CategoriesQueryKey'],
    queryFn: getCategories,
  });
};

export { useProductQuery, useCategoryQuery };
