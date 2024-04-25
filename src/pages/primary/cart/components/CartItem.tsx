import { strings } from 'constants';
import { Cart } from 'types';

interface CartItemProps {
  item: Cart;
  handleQuantityChange: (id: number, quantity: number) => void;
  calculateSubtotal: (price: number, quantity: number) => React.ReactNode;
}

/**
 * Represents a single item in the shopping cart.
 *
 * @component
 * @param {CartItemProps} props - The props for the CartItem component.
 * @param {Cart} props.item - The item object representing the product in the cart.
 * @param {(id: number, quantity: number) => void} props.handleQuantityChange - A function to handle quantity changes for the item.
 * @param {(price: number, quantity: number) => React.ReactNode} props.calculateSubtotal - A function to calculate the subtotal for the item.
 * @returns {React.ReactNode} The rendered CartItem component.
 */
export const CartItem = ({ item, handleQuantityChange, calculateSubtotal }: CartItemProps) => {
  const {
    primary: { cart },
  } = strings;

  return (
    <div className='flex items-center rounded-lg bg-card p-4 dark:bg-card-dark'>
      {/* Display item thumbnail */}
      <img src={item.thumbnail} alt={item.title} className='mr-4 h-16 w-16 rounded' />

      <div className='flex w-full flex-col items-start space-y-1'>
        {/* Display item title */}
        <h2 className='text-base font-semibold md:text-lg'>{item.title}</h2>

        {/* Display item price */}
        <p className='text-sm text-color dark:text-color-dark'>
          {cart.price}: <span className='text-light dark:text-light-dark'>${item.price}</span>
        </p>

        {/* Quantity controls */}
        <div className='border-1 flex items-center justify-center rounded-md border-2 border-border text-base text-color-dark dark:border-border-dark dark:bg-button-dark dark:text-color-dark'>
          {/* Decrease quantity button */}
          <button
            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
            className='size-7 rounded-md bg-button font-bold'
            disabled={item.quantity === 1}
          >
            -
          </button>

          {/* Display current quantity */}
          <p className='w-7 text-center text-sm text-color dark:text-color-dark'>{item.quantity}</p>

          {/* Increase quantity button */}
          <button
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
            className='size-7 rounded-md bg-button font-bold'
          >
            +
          </button>
        </div>
      </div>

      {/* Display subtotal */}
      <p className='ml-auto text-color dark:text-color-dark'>
        ${calculateSubtotal(item.price, item.quantity)}
      </p>
    </div>
  );
};
