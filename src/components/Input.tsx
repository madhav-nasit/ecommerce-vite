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
    <div className='mb-4 w-full'>
      <div className='relative z-0'>
        <input
          type={type}
          id={id}
          className={`block w-full appearance-none border-0 border-b-2 border-border bg-transparent px-0 pb-1 pt-4 text-sm text-color focus:border-primary focus:outline-none focus:ring-0 dark:border-border-dark dark:text-color-dark dark:focus:border-background ${
            !!error
              ? 'border-error focus:border-error dark:border-error-dark dark:focus:border-error-dark'
              : ''
          } peer`}
          placeholder=' '
          {...rest}
        />
        <label
          htmlFor={id}
          className={`absolute top-4 z-10 origin-[0] -translate-y-5 scale-75 transform text-sm text-light duration-300 after:text-error peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-required:after:ml-0.5 peer-required:after:content-['*'] peer-focus:start-0 peer-focus:-translate-y-5 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-light-dark ${
            !!error ? 'text-error dark:text-error-dark' : ''
          }
          `}
        >
          {label}
        </label>
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
    </div>
  );
};
