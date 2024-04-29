import React from 'react';
import { strings } from 'constants';

/**
 * Props for the Error component.
 */
interface ErrorProps {
  /** The error message to be displayed. */
  errorMessage?: string;
}

/**
 * Error Component
 * Displays an error message.
 * @param errorMessage The error message to be displayed.
 */
export const Error: React.FC<ErrorProps> = ({ errorMessage }) => {
  return (
    <div className='absolute bottom-0 left-0 right-0 top-12 flex items-center justify-center'>
      <p>{errorMessage || strings.apiErrors.unexpectedError}</p>
    </div>
  );
};
