import { useNavigate, useParams } from 'react-router-dom';
import { products } from 'constants';
import { CategoriesSlider, Pagination, ProductList } from 'pages';

/**
 * Home Component
 * Represents the home page of the application.
 */
export const Home = () => {
  // Use the useParams hook to get the value of categoryName
  const { categoryName = 'All', page = '1' } = useParams();
  const navigate = useNavigate();

  /** Handle pagination */
  const handlePagination = (page: number) => {
    navigate(`/${categoryName}/${page}`);
  };

  return (
    <div className='flex h-screen w-screen justify-center bg-background dark:bg-background-dark'>
      <div className='h-fit w-full'>
        <CategoriesSlider categoryName={categoryName} />
        <ProductList products={products.products} />
        <Pagination currentPage={parseInt(page)} totalPages={5} onPageChange={handlePagination} />
      </div>
    </div>
  );
};
