import { ChevronLeft, ChevronRight } from 'assets/svgs';

interface ScrollButtonProps {
  onClick: () => void;
  direction: 'left' | 'right';
  hide: boolean;
  className?: string;
}

/**
 * ScrollButton component renders a button for scrolling left or right.
 *
 * @param {ScrollButtonProps} props - The props for the ScrollButton component.
 */
export const ScrollButton = (props: ScrollButtonProps) => {
  const { onClick, direction, hide, className } = props;
  return (
    <button
      onClick={onClick}
      className={`absolute bottom-0 top-0 z-20 flex items-center justify-center ${className} ${direction === 'left' ? 'left-0 md:left-2' : 'right-0 md:right-2'} ${hide ? 'hidden' : ''}`}
    >
      <div className='flex h-5 w-5 items-center justify-center rounded-full bg-secondary shadow transition-colors duration-300 hover:scale-110 hover:bg-hover md:h-6 md:w-6 dark:bg-secondary-dark dark:hover:bg-hover-dark'>
        {direction === 'left' ? (
          <ChevronLeft className='h-3 w-3 fill-light dark:fill-light-dark' />
        ) : (
          <ChevronRight className='h-3 w-3 fill-light dark:fill-light-dark' />
        )}
      </div>
    </button>
  );
};
