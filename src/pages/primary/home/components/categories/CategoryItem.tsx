import { ButtonHTMLAttributes } from 'react';

interface CategoryItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: string;
  className?: string;
  isSelected?: boolean;
}

/**
 * CategoryItem component renders a single category item.
 *
 * @param {CategoryItemProps} props - The props for the CategoryItem component.
 */
export const CategoryItem = (props: CategoryItemProps) => {
  const { item, className, isSelected, ...rest } = props;
  return (
    <button
      type='button'
      className={`flex flex-shrink-0 cursor-pointer snap-center items-center justify-center rounded border border-border px-4 py-2  transition-shadow duration-300 ease-in-out dark:border-0
      ${isSelected ? `scale-105 bg-primary font-medium text-color-dark shadow-md md:scale-110 dark:bg-primary dark:text-color-dark` : `bg-secondary text-light shadow-sm hover:scale-110 hover:bg-hover hover:shadow-md dark:bg-secondary-dark dark:text-light-dark dark:hover:bg-hover-dark`} 
      ${className}
      `}
      {...rest}
    >
      <p className='text-sm'>{item}</p>
    </button>
  );
};
