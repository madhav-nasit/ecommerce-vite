import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { PageWrapper } from 'components';
import { strings } from 'constants';
import { useCategoryQuery, useProductQuery } from 'queries';
import { PrivateRouteContext } from 'routers';
import { CategoriesSlider, Pagination, ProductList } from './components';

/** Max products per page */
const PRODUCT_LIMIT = 15;

/**
 * Home Component
 * Represents the home page of the application.
 */
export const Home = () => {
  // Navigation hooks
  const { categoryName = 'all', page = '1' } = useParams();
  const navigate = useNavigate();

  // Constants
  const limit = PRODUCT_LIMIT;
  const {
    primary: { home },
  } = strings;

  // react query hooks to fetch categories data
  const { data: categories } = useCategoryQuery();
  // react query hooks to fetch products data
  const {
    data: productData,
    isPending,
    isError,
  } = useProductQuery(categoryName, limit, parseInt(page));

  // Outlet context for setting image assets
  const { setSticky } = useOutletContext<PrivateRouteContext>();

  // Error message handling
  const errorMsg = productData && productData?.products?.length === 0 ? home.noProduct : undefined;

  // Disable sticky header
  useEffect(() => {
    setSticky(false);
  }, []);

  /** Handle pagination */
  const handlePagination = (page: number) => {
    navigate(`/${categoryName}/${page}`);
  };

  // Render products and pagination
  const renderProduct = () => (
    <>
      <ProductList products={productData?.products ?? []} />
      <Pagination
        currentPage={parseInt(page)}
        totalPages={productData?.total ?? 1}
        onPageChange={handlePagination}
      />
    </>
  );

  return (
    <div className='flex h-fit w-screen justify-center bg-background dark:bg-background-dark'>
      <div className='h-fit w-full'>
        <CategoriesSlider
          categories={categories ? ['all', ...categories.map((item) => item.name)] : ['all']}
          categoryName={categoryName}
        />
        <PageWrapper isError={isError} isPending={isPending} emptyMsg={errorMsg}>
          {renderProduct()}
        </PageWrapper>
      </div>
    </div>
  );
};
