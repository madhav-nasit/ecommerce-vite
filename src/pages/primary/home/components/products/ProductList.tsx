import { routes } from 'constants';
import { useNavigate } from 'react-router-dom';
import { Product } from 'types';

interface ProductListProps {
  /** Array of products to be displayed */
  products: Product[];
}

/**
 * ProductList component displays a list of products.
 * @param {ProductListProps} props - The props for the ProductList component.
 */
export const ProductList = ({ products }: ProductListProps): JSX.Element => {
  const navigate = useNavigate();
  const navigateToProductDetails = (id: number) => {
    navigate(`${routes.products}/${id}`);
  };
  return (
    <div className='mx-auto grid max-w-screen-xl grid-cols-2 gap-4 px-2 py-2 sm:grid-cols-3 md:grid-cols-4 md:px-4 md:py-4 lg:grid-cols-5'>
      {products.map((product) => (
        <button
          key={product.id}
          type='button'
          className='flex flex-col overflow-hidden rounded-lg bg-card shadow-md hover:scale-105 dark:bg-card-dark'
          onClick={() => navigateToProductDetails(product.id)}
        >
          <img src={product.thumbnail} alt={product.title} className=' h-40 w-full object-cover' />
          <div className='flex w-full flex-col items-stretch p-3'>
            <h3 className='line-clamp-1 text-left text-sm'>{product.title}</h3>
            <div className='flex items-center space-x-1'>
              <p className='text-sm text-light dark:text-light-dark'>${product.price}</p>
              {product.discountPercentage > 0 && (
                <span className='text-xs text-light dark:text-light-dark'>
                  ({product.discountPercentage}% off)
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
