import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string;
}

/**
 * Button component renders a button element with specified title.
 * @param {ButtonProps} props - Props for the Button component.
 */
export const Button: FC<ButtonProps> = ({ title, className, ...rest }) => {
  return (
    <button
      className={`font-regular bg-button hover:bg-button-hover rounded px-4 py-2 text-background ${className}`}
      {...rest}
    >
      {title}
    </button>
  );
};
