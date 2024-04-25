import React, { useState } from 'react';
import { Button } from 'components';
import { cart as cartData, strings } from 'constants';
import { Cart as CartData } from 'types';
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
    primary: { cart },
  } = strings;

  // State to hold the cart items
  const [cartItems, setCartItems] = useState<CartData[]>(cartData.products);

  /** Calculate the total amount to be paid */
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  /** Function to handle quantity change for a specific item */
  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
    );
  };

  /** Function to calculate the subtotal for a given item */
  const calculateSubtotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  return (
    <div className='mx-auto h-fit w-screen max-w-screen-xl bg-background p-8 dark:bg-background-dark'>
      <h1 className='mb-4 text-2xl font-bold text-color dark:text-color-dark'>{cart.title}</h1>
      <div className='flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
        {/* Cart items list */}
        <div className='w-full md:w-3/5'>
          <div className='grid grid-cols-1 gap-4'>
            {cartItems.map((item) => (
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
          <div className='space-y-2 rounded-lg bg-card p-4 dark:bg-card-dark'>
            <h3>{cart.cartSummary}</h3>
            <p className='font-medium text-color dark:text-color-dark'>
              {cart.total}:{' '}
              <span className='text-light dark:text-light-dark'>${totalAmount.toFixed(2)}</span>
            </p>
            {/* Button to place order */}
            <Button title='Place Order' className='w-full min-w-64 lg:w-auto' />
          </div>
        </div>
      </div>
    </div>
  );
};
