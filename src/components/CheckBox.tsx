import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}

/**
 * Checkbox component.
 * @param {string} id - The ID for the checkbox input.
 * @param {string} [error] - Optional error message to display.
 * @param {string} [className] - Additional CSS class names for styling.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} rest - Additional props to pass to the checkbox input element.
 */
export const Checkbox: React.FC<CheckboxProps> = ({ id, error, children, className, ...rest }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className='flex items-center'>
        <input
          id={id}
          type='checkbox'
          className='size-4 rounded border-border bg-card accent-primary dark:border-border-dark dark:bg-card-dark dark:accent-color-dark'
          {...rest}
        />
        {children}
      </div>
      {!!error && (
        <p
          className='animate-fadeInDown text-xs text-error
          transition-all 
          duration-500 dark:text-error-dark'
        >
          {error}
        </p>
      )}
    </div>
  );
};
