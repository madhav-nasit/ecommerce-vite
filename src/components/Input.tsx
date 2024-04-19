import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: string;
  label?: string;
  error?: string;
}

/**
 * Input component renders an input element with optional label, and error message.
 * @param {InputProps} props - Props for the Input component.
 */
export const Input = (props: InputProps) => {
  const { type = 'text', id, label, error, ...rest } = props;

  return (
    <div className='mb-4'>
      <div className='relative z-0 m-4'>
        <input
          type={type}
          id={id}
          className={`block py-2.5 px-0 w-full text-sm text-color bg-transparent border-0 border-b-2 border-border appearance-none dark:text-color-dark dark:border-border-dark dark:focus:border-background focus:outline-none focus:ring-0 focus:border-primary ${
            !!error
              ? 'border-error dark:border-error-dark focus:border-error dark:focus:border-error-dark'
              : ''
          } peer`}
          placeholder=' '
          {...rest}
        />
        <label
          htmlFor={id}
          className={`absolute text-sm text-light dark:text-light-dark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-required:after:content-['*'] peer-required:after:ml-0.5 after:text-error ${
            !!error ? 'text-error dark:text-error-dark' : ''
          }
          `}
        >
          {label}
        </label>
        {!!error && (
          <p id='standard_error_help' className='text-xs text-error dark:text-error-dark'>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
