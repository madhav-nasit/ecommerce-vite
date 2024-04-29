import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button } from 'components';
import { strings } from 'constants';
import { PrivateRouteContext } from 'routers';
import { useCartQuery } from 'queries';
import { Carts } from 'types';
import { CartItem } from './components';

/**
 * Cart Component
 *
 * This component displays the items in the cart along with their quantities,
 * allows the user to modify the quantity of each item, and displays the
 * total amount to be paid.
 */
export const Cart: React.FC = () => {
  const {
    primary: { cart: cartString },
  } = strings;

  // Outlet context for setting image assets
  const { setSticky } = useOutletContext<PrivateRouteContext>();

  // API call to fetch cart
  const { data: cartData } = useCartQuery();

  // State to hold the cart items
  const [cart, setCart] = useState<Carts>();

  // Disable sticky header
  useEffect(() => {
    setSticky(true);
  }, []);

  // Set cart details
  useEffect(() => {
    if (cartData && cartData?.carts.length > 0) {
      setCart(cartData?.carts[0]);
    }
  }, [cartData]);

  /** Function to handle quantity change for a specific item */
  const handleQuantityChange = (id: number, newQuantity: number) => {
    // setCartItems((prevItems) =>
    //   prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
    // );
  };

  /** Function to calculate the subtotal for a given item */
  const calculateSubtotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  return (
    <div className='mx-auto h-fit w-screen max-w-screen-xl bg-background p-8 dark:bg-background-dark'>
      <h1 className='mb-4 text-2xl font-bold text-color dark:text-color-dark'>
        {cartString.title}
      </h1>
      <div className='flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
        {/* Cart items list */}
        <div className='w-full md:w-3/5'>
          <div className='grid grid-cols-1 gap-4'>
            {cart?.products?.map((item) => (
              <CartItem
                item={item}
                key={item.id}
                handleQuantityChange={handleQuantityChange}
                calculateSubtotal={calculateSubtotal}
              />
            ))}
          </div>
        </div>
        {/* Cart summary */}
        <div className='w-full md:w-2/5'>
          {!!cart && (
            <div className='space-y-3 rounded-lg bg-card p-4 dark:bg-card-dark '>
              <h3>{cartString.cartSummary}</h3>
              <hr className='my-8 h-px border-0 bg-border dark:bg-border-dark'></hr>
              <div className='flex flex-row justify-between text-sm'>
                <p className='font-medium text-color dark:text-color-dark'>
                  {cartString.subTotal}:
                </p>
                <p className='text-light dark:text-light-dark'>${cart?.total.toFixed(2)}</p>
              </div>
              <div className='flex flex-row justify-between text-sm'>
                <p className='font-medium text-color dark:text-color-dark'>
                  {cartString.discount}:
                </p>
                <p className='text-light dark:text-light-dark'>
                  - ${(cart?.total - cart?.discountedTotal).toFixed(2)}
                </p>
              </div>
              <hr className='my-8 h-px border-0 bg-border dark:bg-border-dark'></hr>
              <div className='flex flex-row justify-between pb-1 text-sm'>
                <p className='font-medium text-color dark:text-color-dark'>{cartString.total}:</p>
                <p className='text-light dark:text-light-dark'>
                  ${cart?.discountedTotal.toFixed(2)}
                </p>
              </div>
              {/* Button to place order */}
              <Button title='Place Order' className='w-full' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
