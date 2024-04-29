import { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartIcon } from 'assets/svgs';
import { routes } from 'constants';

/**
 * Props for the CartButton component.
 */
interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number;
}

/**
 * Cart button for Navbar
 * @returns
 */
export const CartButton = ({ className, count, ...rest }: CartButtonProps) => {
  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate(routes.cart);
  };
  return (
    <div className='relative'>
      <button
        type='button'
        className={`z-50 flex size-8 flex-col items-center justify-center rounded-full border border-border bg-secondary hover:scale-110 hover:bg-hover md:size-10 dark:border-border-dark dark:bg-secondary-dark dark:hover:bg-hover-dark ${className}`}
        onClick={navigateToCart}
        {...rest}
      >
        <CartIcon className='fill-light dark:fill-light-dark' />
      </button>
      {!!count && (
        <p className='text-8px leading-8px absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary p-1 text-background'>
          {count}
        </p>
      )}
    </div>
  );
};
