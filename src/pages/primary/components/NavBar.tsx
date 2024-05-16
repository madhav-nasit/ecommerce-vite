import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from 'assets/svgs';
import { ThemeToggle } from 'components';
import { routes, strings } from 'constants';
import { CartButton, MenuItem, ProfileMenu } from 'pages';
import { useCartQuery, useUserQuery } from 'queries';
import { useAuthContext } from 'hooks';

interface NavBarProps {
  sticky?: boolean;
}

/**
 * Navigation bar component for the application.
 */
export const NavBar = ({ sticky = true }: NavBarProps) => {
  // Constants for string literals
  const {
    common,
    primary: { home, common: homeCommon },
  } = strings;

  // State for controlling the visibility of the menu
  const [menuVisible, setMenuVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Functions of Auth Context
  const { addUser } = useAuthContext();

  // API call to fetch user
  const { data: userData } = useUserQuery();

  // API call to fetch cart
  const { data: cartData } = useCartQuery();

  // Return current cart items count
  useEffect(() => {
    if (cartData && cartData?.products?.length > 0) {
      setCartCount(cartData?.products.length);
    } else {
      setCartCount(0);
    }
  }, [cartData]);

  // Update user data to the Auth Context
  useEffect(() => {
    if (userData) {
      addUser(userData);
    }
  }, [userData]);

  /** Function to toggle the visibility of the menu */
  const toggleMenu = () => setMenuVisible((prev) => !prev);

  /** Renders the header section of the navigation bar */
  const renderHeader = () => (
    <Link to={routes.root} className='flex items-center space-x-3 rtl:space-x-reverse'>
      <img src='/logo.svg' className='size-8 h-8 md:size-10' alt='App logo' />
      <span className='hidden self-center whitespace-nowrap text-xl font-semibold text-color md:block md:text-2xl dark:text-color-dark'>
        {common.appName}
      </span>
    </Link>
  );

  /** Renders the menu button */
  const renderMenuButton = () => (
    <button
      data-collapse-toggle='navbar-default'
      type='button'
      className='group inline-flex size-8 items-center justify-center rounded-lg p-1 text-sm text-light focus:outline-none focus:ring-2 focus:ring-border md:hidden md:size-10 md:p-2 dark:text-light-dark dark:focus:ring-border-dark'
      aria-controls='navbar-default'
      aria-expanded='false'
      onClick={toggleMenu}
    >
      <MenuIcon className='h-5 w-5 fill-light group-hover:fill-color dark:fill-light-dark dark:group-hover:fill-color-dark' />
    </button>
  );

  /** Renders the menu items */
  const renderMenu = () => (
    <div
      className={`${menuVisible ? 'block' : 'hidden'} w-full md:block md:w-auto`}
      id='navbar-default'
    >
      <ul className='mt-4 flex flex-col rounded-lg border border-border bg-secondary p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-background md:p-0 rtl:space-x-reverse dark:border-border-dark dark:bg-secondary-dark md:dark:bg-background-dark'>
        <MenuItem href={routes.root}>{home.title}</MenuItem>
        <MenuItem href={routes.termsCondition}>{homeCommon.termsOfUse}</MenuItem>
        <MenuItem href={routes.privacyPolicy}>{homeCommon.privacyPolicy}</MenuItem>
      </ul>
    </div>
  );

  return (
    <nav
      className={`${sticky ? 'sticky' : ''} start-0 top-0 z-20 w-full border-b border-border bg-background shadow dark:border-border-dark dark:bg-background-dark`}
    >
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-2 md:p-4'>
        {renderHeader()}
        <div className='flex items-center space-x-2 md:order-2 md:space-x-3 rtl:space-x-reverse'>
          <ThemeToggle />
          <CartButton count={cartCount} />
          <ProfileMenu user={userData} />
          {renderMenuButton()}
        </div>
        {renderMenu()}
      </div>
    </nav>
  );
};
