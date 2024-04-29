import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { routes, strings } from 'constants';
import { Button, PageWrapper } from 'components';
import { Product } from 'types';
import { PrivateRouteContext } from 'routers';
import { useAddCartMutation, useCartQuery, useProductDetails } from 'queries';
import { DetailRow } from './components';
import { useAuthContext } from 'hooks';

/**
 * ProductDetails component displays the details of a specific product.
 */
export const ProductDetails = () => {
  // String constants
  const {
    primary: { productDetails },
  } = strings;

  // Navigation hook
  const { productId } = useParams();
  const navigate = useNavigate();

  // User auth context
  const { user } = useAuthContext();

  // Outlet context for setting image assets
  const { setSticky } = useOutletContext<PrivateRouteContext>();

  // react query hooks to fetch products data
  const { data: product, isPending, isError } = useProductDetails(productId);

  // API call to fetch cart
  const { data: cartData } = useCartQuery();

  // API call to add product to cart
  const { mutateAsync } = useAddCartMutation();

  // Main image path
  const [mainImage, setMainImage] = useState(product?.thumbnail);

  // Return current cart items count
  const productCart = useMemo(() => {
    if (cartData && productId && cartData?.carts?.length > 0) {
      return cartData?.carts[0]?.products.find((x) => x?.id === parseInt(productId));
    }
    return undefined;
  }, [cartData, productId]);

  // Disable sticky header
  useEffect(() => {
    setSticky(true);
  }, []);

  /**
   * Add to cart api call
   */
  const addToCart = () => {
    try {
      if (!!user && !!product) {
        navigate(routes.cart);
        mutateAsync({
          userId: user?.id,
          products: [
            {
              id: product?.id,
              quantity: 1,
            },
          ],
        });
      }
    } catch (error) {}
  };

  /**
   * Handles click on product thumbnail to change the main image.
   */
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  /**
   * Adds the current product to the cart and navigates to the cart page.
   */
  const goToCart = () => {
    navigate(routes.cart);
  };

  /** Render Product Image */
  const renderProductImage = () => (
    <div className='w-full md:w-3/5 lg:w-1/2'>
      <img
        src={mainImage || product?.thumbnail}
        alt={product?.title}
        className='mx-auto h-72 w-full rounded-lg border border-border bg-secondary object-contain shadow-md md:h-80 dark:border-border-dark dark:bg-secondary-dark'
      />
      <div className='mt-2 flex space-x-2 overflow-scroll p-2'>
        {product?.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className={`h-20 w-full max-w-24 cursor-pointer rounded-lg border border-border object-cover shadow-md transition-transform duration-300 hover:scale-110 dark:border-border-dark ${mainImage === image ? 'scale-105 border-2 border-primary shadow dark:border-border-dark' : ''}`}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>
    </div>
  );

  /** Render Product Details */
  const renderProductDetails = (product: Product) => (
    <div className='w-full pb-4 md:w-2/5 lg:w-1/2'>
      <h1 className='mb-4 text-3xl font-bold'>{product?.title}</h1>
      <p className='mb-4'>{product?.description}</p>
      <div className='mb-4 flex items-center'>
        <span className='text-lg font-bold'>${product?.price}</span>
        {product?.discountPercentage > 0 && (
          <span className='text-sm text-light dark:text-light-dark'>
            ({product?.discountPercentage}% off)
          </span>
        )}
      </div>
      <DetailRow heading={productDetails.rating} value={product?.rating} />
      <DetailRow heading={productDetails.brand} value={product?.brand} />
      <DetailRow heading={productDetails.category} value={product?.category} />
      <DetailRow heading={productDetails.stock} value={product?.stock} />
      {!!!productCart ? (
        <Button
          title={productDetails.addToCart}
          className='w-full min-w-64 lg:w-auto'
          onClick={addToCart}
        />
      ) : (
        <Button
          title={productDetails.goToCart}
          className='w-full min-w-64 lg:w-auto'
          onClick={goToCart}
        />
      )}
    </div>
  );

  return (
    <PageWrapper isError={isError} isPending={isPending}>
      <div className='mx-4 my-4 box-border h-fit max-w-screen-xl text-color md:my-8 xl:mx-auto dark:text-color-dark'>
        <div className='flex h-fit w-full flex-col space-y-4 md:flex-row md:space-x-8'>
          {renderProductImage()}
          {!!product && renderProductDetails(product)}
        </div>
      </div>
    </PageWrapper>
  );
};
