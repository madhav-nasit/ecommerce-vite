import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'hooks';
import { routes, strings } from 'constants';
import { User } from 'types';
import { queryClient } from 'src/App';

interface ProfileMenuProps {
  user?: User;
}

/**
 * ProfileMenu component for displaying user profile menu.
 * It includes a button to toggle the menu and options like logout.
 */
export const ProfileMenu = ({ user }: ProfileMenuProps) => {
  // Authentication context and navigation hook
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  // Constants
  const {
    primary: { common },
  } = strings;

  // State for controlling the visibility of the profile menu
  const [menuVisible, setMenuVisible] = useState(false);

  /**
   * Handle logout action.
   * It logs out the user and redirects to the sign-in page.
   */
  const onLogout = () => {
    // Remove user data from AuthContext
    logout();
    // Invalidate all the queries data
    queryClient.invalidateQueries();
    // Navigate to sign-in page
    navigate(routes.signIn, { replace: true });
  };

  /**
   * Function to toggle the visibility of the profile menu.
   */
  const toggleMenu = () => setMenuVisible((prev) => !prev);

  /**
   * Render profile button.
   * This button toggles the visibility of the profile menu.
   */
  const renderProfileButton = () => (
    <button
      type='button'
      className='flex size-8 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary text-sm font-medium text-color-dark hover:bg-hover focus:ring-1 focus:ring-border md:me-0 md:size-10 dark:border-border-dark dark:bg-secondary-dark dark:hover:bg-hover-dark dark:focus:ring-2 dark:focus:ring-border-dark'
      id='user-menu-button'
      aria-expanded='false'
      data-dropdown-toggle='user-dropdown'
      data-dropdown-placement='bottom'
      onClick={toggleMenu}
    >
      <img src={user?.image} className='size-8 object-contain md:size-10' />
    </button>
  );

  /**
   * Render profile menu.
   * This menu appears when the profile button is clicked.
   * It contains options like user name, email, and logout.
   */
  const renderProfileMenu = () => (
    <div
      className={`${menuVisible ? 'block' : 'hidden'} absolute -right-10 z-50 my-2 list-none divide-y divide-border rounded-lg bg-secondary text-base shadow md:right-0 dark:divide-border-dark dark:bg-secondary-dark`}
      id='user-dropdown'
    >
      <div className='px-4 py-3'>
        <span className='block text-sm text-color dark:text-color-dark'>{`${user?.firstName} ${user?.lastName}`}</span>
        <span className='block truncate text-sm text-light dark:text-light-dark'>
          {user?.email}
        </span>
      </div>
      <ul className='py-2' aria-labelledby='user-menu-button'>
        <li>
          <button
            type='button'
            onClick={onLogout}
            className='block w-full px-4 py-2 text-sm text-light hover:bg-hover dark:text-light-dark dark:hover:bg-hover-dark dark:hover:text-light-dark'
          >
            {common.signOut}
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className='relative'>
      {renderProfileButton()}
      {renderProfileMenu()}
    </div>
  );
};
