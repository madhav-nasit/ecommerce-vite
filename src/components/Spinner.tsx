import { HTMLAttributes } from 'react';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Spinner Component
 * Displays a loading spinner.
 */
export const Spinner = (props: SpinnerProps) => {
  const { className, ...rest } = props;
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ${className}`}
      {...rest}
    >
      <img src='/logo.svg' className={`size-12 animate-spin rounded-full object-contain`} />
    </div>
  );
};
