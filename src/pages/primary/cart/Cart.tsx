import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button, DeleteConfirm, PageWrapper, Spinner } from 'components';
import { routes, strings } from 'constants';
import { PrivateRouteContext } from 'routers';
import {
  useAddCartMutation,
  useCartQuery,
  useDeleteCartMutation,
  usePlaceOrderMutation,
} from 'queries';
import { CartItem } from './components';

interface DeleteConfirmation {
  isVisible: boolean;
  onDelete?: () => void;
}

/**
 * Cart Component
 *
 * This component displays the items in the cart along with their quantities,
 * allows the user to modify the quantity of each item, and displays the
 * total amount to be paid.
 */
export const Cart: React.FC = () => {
  // Strings for localization
  const {
    primary: { cart: cartString },
  } = strings;

  // Navigation hook
  const navigate = useNavigate();

  // Outlet context for setting image assets
  const { setSticky } = useOutletContext<PrivateRouteContext>();

  // Fetch cart data
  const { data: cart, isPending, isError } = useCartQuery();
  // Update cart data mutation
  const { mutateAsync, isPending: updateCartPending } = useAddCartMutation();
  // place order data mutation
  const { mutateAsync: placeOrderMutateAsync, isPending: placeOrderPending } =
    usePlaceOrderMutation();
  // Delete cart data mutation
  const { mutateAsync: deleteMutateAsync, isPending: deleteCartPending } = useDeleteCartMutation();

  // State to hold cart items
  const [showRemoveItem, setShowRemoveItem] = useState<DeleteConfirmation>({ isVisible: false });
  const [showRemoveCart, setShowRemoveCart] = useState<DeleteConfirmation>({ isVisible: false });

  // Error message handling
  const errorMsg = cart?.products && cart?.products?.length > 0 ? undefined : cartString?.noProduct;

  // Disable sticky header
  useEffect(() => {
    setSticky(true);
  }, []);

  /** Function to handle quantity change for a specific item */
  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItem(id, newQuantity);
    } else {
      setShowRemoveItem({
        isVisible: true,
        onDelete: () => {
          setShowRemoveItem({ isVisible: false });
          deleteMutateAsync({
            productId: id,
          });
        },
      });
    }
  };

  /** Function to remove item from cart */
  const updateCartItem = async (id: string, newQuantity: number) => {
    if (!!cart) {
      try {
        await mutateAsync({
          productId: id,
          quantity: newQuantity,
        });
      } catch (error) {}
    }
  };

  /** Function to delete cart */
  const deleteCart = async () => {
    setShowRemoveCart({
      isVisible: true,
      onDelete: async () => {
        setShowRemoveCart({ isVisible: false });
        if (!!cart) {
          try {
            await deleteMutateAsync({
              cartId: cart?._id,
            });
          } catch (error) {}
        }
      },
    });
  };

  /** Navigate to root on place order */
  const onPlaceOrder = async () => {
    await placeOrderMutateAsync();
    navigate(routes.root);
  };

  /** Function to hide remove item confirmation */
  const hideRemoveItem = () => {
    setShowRemoveItem({ isVisible: false });
  };

  /** Function to hide delete cart confirmation */
  const hideDeleteCart = () => {
    setShowRemoveCart({ isVisible: false });
  };

  /** Function to calculate the subtotal for a given item */
  const calculateSubtotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  /** Render Cart items list */
  const renderCartItems = () => (
    <div className='w-full md:w-3/5'>
      <div className='grid grid-cols-1 gap-4'>
        {cart?.products?.map((item) => (
          <CartItem
            item={item}
            key={item?.product?._id}
            handleQuantityChange={handleQuantityChange}
            calculateSubtotal={calculateSubtotal}
          />
        ))}
        <Button title={cartString.deleteCart} className='mx-auto' onClick={deleteCart} />
      </div>
    </div>
  );

  /** Render Cart summary */
  const renderCartSummary = () => (
    <div className='w-full md:w-2/5'>
      {!!cart && (
        <div className='space-y-3 rounded-lg bg-card p-4 dark:bg-card-dark '>
          <h3>{cartString.cartSummary}</h3>
          <hr className='my-8 h-px border-0 bg-border dark:bg-border-dark'></hr>
          <div className='flex flex-row justify-between text-sm'>
            <p className='font-medium text-color dark:text-color-dark'>{cartString.subTotal}:</p>
            <p className='text-light dark:text-light-dark'>${cart?.totalAmount.toFixed(2)}</p>
          </div>
          <div className='flex flex-row justify-between text-sm'>
            <p className='font-medium text-color dark:text-color-dark'>{cartString.discount}:</p>
            <p className='text-light dark:text-light-dark'>- ${(cart?.totalDiscount).toFixed(2)}</p>
          </div>
          <hr className='my-8 h-px border-0 bg-border dark:bg-border-dark'></hr>
          <div className='flex flex-row justify-between pb-1 text-sm'>
            <p className='font-medium text-color dark:text-color-dark'>{cartString.total}:</p>
            <p className='text-light dark:text-light-dark'>${cart?.finalAmount.toFixed(2)}</p>
          </div>
          {/* Button to place order */}
          <Button title={cartString.placeOrder} className='w-full' onClick={onPlaceOrder} />
        </div>
      )}
    </div>
  );

  /** Confirmation modal for remove item confirmation */
  const renderRemoveItemConfirmation = () => {
    if (showRemoveItem?.isVisible) {
      return (
        <DeleteConfirm
          heading={cartString.removeItem}
          message={cartString.removeItemMsg}
          onDelete={showRemoveItem?.onDelete}
          onCancel={hideRemoveItem}
        />
      );
    }
  };

  /** Confirmation modal for delete cart confirmation */
  const renderDeleteCartConfirmation = () => {
    if (showRemoveCart?.isVisible) {
      return (
        <DeleteConfirm
          heading={cartString.deleteCart}
          message={cartString.deleteCartMsg}
          onDelete={showRemoveCart?.onDelete}
          onCancel={hideDeleteCart}
        />
      );
    }
  };

  /** Render spinner component on update/delete */
  const renderSpinner = () => (
    <>
      {(updateCartPending || deleteCartPending || placeOrderPending) && (
        <div className='fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center'>
          <Spinner className='top-0 bg-card-dark bg-opacity-20 dark:bg-card' />
        </div>
      )}
    </>
  );

  return (
    <div className='h-fit w-full'>
      <PageWrapper isError={isError} isPending={isPending} emptyMsg={errorMsg}>
        <div className='mx-auto h-fit w-screen max-w-screen-xl bg-background p-8 dark:bg-background-dark'>
          <h1 className='mb-4 text-2xl font-bold text-color dark:text-color-dark'>
            {cartString.title}
          </h1>
          <div className='flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
            {/* Cart items list */}
            {renderCartItems()}
            {/* Cart summary */}
            {renderCartSummary()}
          </div>
        </div>
      </PageWrapper>
      {renderSpinner()}
      {renderRemoveItemConfirmation()}
      {renderDeleteCartConfirmation()}
    </div>
  );
};
