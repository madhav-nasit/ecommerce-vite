import { useNavigate } from 'react-router-dom';
import { Button } from 'components';
import { routes } from 'constants';
import { useAuthContext } from 'hooks';

/**
 * Home Component
 * Represents the home page of the application.
 */
export const Home = () => {
  // Authentication context and navigation hook
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  /**
   * Handle logout action
   */
  const onLogout = () => {
    // Logout user
    logout();
    // Redirect to sign-in page
    navigate(routes.signIn, { replace: true });
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex flex-col'>
        {/* Heading */}
        <h1>Home Page</h1>
        {/* Logout Button */}
        <Button
          className='mt-4' // Additional CSS classes for styling
          title={'Logout'} // Button text
          onClick={onLogout}
        />
      </div>
    </div>
  );
};
