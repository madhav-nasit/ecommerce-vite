import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { strings } from 'constants';

interface AuthPageProps {
  className?: string;
}

interface ImageAssets {
  src: string;
  srcSet?: string | undefined;
}

export interface AuthPageContext {
  setImageAssets: React.Dispatch<React.SetStateAction<ImageAssets | undefined>>;
}

/**
 * AuthPage Component
 *
 * A wrapper component for the authentication screen, providing a consistent layout.
 *
 * @param className Additional CSS classes to be applied to the right component.
 */
export const AuthPage: FC<AuthPageProps> = ({ className }) => {
  // constants
  const { common } = strings;

  const [imageAssets, setImageAssets] = useState<ImageAssets | undefined>();

  return (
    <div className='h-screen bg-background dark:bg-background-dark'>
      <div className='flex h-screen w-screen flex-col md:h-screen md:flex-row'>
        {/* Left Section */}
        <div className='flex h-2/5 w-full flex-col content-center bg-secondary md:h-full lg:h-full dark:bg-secondary-dark'>
          <div className='flex items-center justify-center'>
            <img src='/logo.svg' className='size-8 md:size-10' />
            <h1 className='my-2 ml-2 inline text-2xl font-normal md:my-4 md:text-3xl'>
              {common.appName}
            </h1>
          </div>
          {!!imageAssets && (
            <img
              src={imageAssets.src}
              srcSet={imageAssets.srcSet}
              alt='cover image'
              className='m-auto block h-3/4 max-h-full w-4/5 max-w-full object-contain p-2 lg:p-4'
            />
          )}
        </div>

        {/* Right Section */}
        <div className={`flex w-full justify-center p-8 md:my-auto ${className}`}>
          <Outlet context={{ setImageAssets }} />
        </div>
      </div>
    </div>
  );
};
