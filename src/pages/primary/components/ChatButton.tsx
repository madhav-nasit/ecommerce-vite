import { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'constants';
import { ChatIcon } from 'assets/svgs/ChatIcon';

/**
 * Props for the ChatButton component.
 */
interface ChatButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Cart button for Navbar
 * @returns
 */
export const ChatButton = ({ className, ...rest }: ChatButtonProps) => {
  const navigate = useNavigate();
  const navigateToInbox = () => {
    navigate(routes.inbox);
  };
  return (
    <div className='relative'>
      <button
        type='button'
        className={`z-50 flex size-8 flex-col items-center justify-center rounded-full border border-border bg-secondary hover:scale-110 hover:bg-hover md:size-10 dark:border-border-dark dark:bg-secondary-dark dark:hover:bg-hover-dark ${className}`}
        onClick={navigateToInbox}
        {...rest}
      >
        <ChatIcon className='size-3 fill-light  md:size-4 dark:fill-light-dark' />
      </button>
    </div>
  );
};
