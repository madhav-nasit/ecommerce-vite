import { FC } from 'react';
import { strings } from '../../../constants';

interface AuthPageProps {
  src: string;
  srcSet?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * AuthPage Component
 *
 * A wrapper component for the authentication screen, providing a consistent layout.
 *
 * @param src The URL of the cover image displayed on the left side of the screen.
 * @param srcSet Optional attribute for specifying multiple image sources for different display resolutions.
 * @param children The child components to be rendered within the authentication page.
 * @param className Additional CSS classes to be applied to the right component.
 */
export const AuthPage: FC<AuthPageProps> = ({ src, srcSet, className, children }) => {
  // constants
  const { common } = strings;

  return (
    <div className='h-screen bg-background dark:bg-background-dark'>
      <div className='flex h-screen w-screen flex-col md:h-screen md:flex-row'>
        {/* Left Section */}
        <div className='flex h-2/5 w-full flex-col content-center bg-secondary md:h-full lg:h-full dark:bg-secondary-dark'>
          <h1 className='mx-auto my-2 text-2xl font-normal md:my-4 md:text-3xl'>
            {common.appName}
          </h1>
          <img
            src={src}
            srcSet={srcSet}
            alt='cover image'
            className='m-auto block h-3/4 max-h-full w-4/5 max-w-full object-contain p-2 lg:p-4'
          />
        </div>

        {/* Right Section */}
        <div className={`flex w-full justify-center p-8 md:my-auto ${className}`}>{children}</div>
      </div>
    </div>
  );
};
