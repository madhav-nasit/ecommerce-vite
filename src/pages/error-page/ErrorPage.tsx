import { FC } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { routes, strings } from '../../constants';
import { NotFound } from '../../assets/svgs';

/**
 * ErrorPage component renders an error page with a relevant error message
 * and a button to navigate back to the home page.
 */
export const ErrorPage: FC = () => {
  // Fetching error details from the route
  const error: any = useRouteError();

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Destructuring common strings from the constants
  const { common } = strings;

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background dark:bg-background-dark'>
      {/* Image for error illustration */}
      <NotFound className='size-40 fill-color object-contain md:size-52 dark:fill-color-dark' />
      {/* Error message section */}
      <div className='text-center'>
        <h1 className='mb-4 text-4xl font-bold text-error dark:text-error-dark'>{common.oops}</h1>
        <p className='mb-2 text-sm text-color dark:text-color-dark'>
          {error?.statusText || error?.message || common.genericErrorMessage}
        </p>
        <p className='text-lg text-error dark:text-error-dark'>{common.notFound}</p>
      </div>
      {/* Button to navigate back to the home page */}
      <Button className='mt-4' title={common.goBack} onClick={() => navigate(routes.root)} />
    </div>
  );
};
