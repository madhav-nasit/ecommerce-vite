import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'constants';
import { CategoryItem, ScrollButton } from 'pages';

interface CategoriesSlider {
  categories: string[] | undefined;
  categoryName: string;
}

export const CategoriesSlider = (props: CategoriesSlider) => {
  // Deconstruct props
  const { categoryName, categories } = props;

  // Navigation hook
  const navigate = useNavigate();

  // Container ref for scroll
  const containerRef = useRef<HTMLDivElement>(null);

  // States for show/hide scroll icons
  const [hideLeftIcon, setHideLeftIcon] = useState(true);
  const [hideRightIcon, setHideRightIcon] = useState(false);

  /**
   * Hook to handle initialization and cleanup of event listeners.
   * Monitors the scroll position to show/hide navigation buttons.
   */
  useEffect(() => {
    if (containerRef.current) {
      maxContainerItems();
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (containerRef.current) containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [categories]);

  /**
   * Gets the scroll offset based on screen width.
   * @returns {number} The scroll offset value.
   */
  const getScrollOffset = () => {
    const screenWidth = window.innerWidth;
    return screenWidth <= 768 ? 94 : 284;
  };

  /**
   * Event handler to monitor scroll position and manage visibility of navigation buttons.
   */
  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollPos = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      setHideLeftIcon(scrollPos <= 0);
      setHideRightIcon(Math.ceil(scrollPos) >= maxScroll);
    }
  };

  /**
   * Checks if the total width of categories is less than or equal to container width.
   * If true, hides the right navigation button.
   */
  const maxContainerItems = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const categoriesWidth = container.scrollWidth;
      const containerWidth = container.clientWidth;
      if (categoriesWidth <= containerWidth) {
        setHideRightIcon(true);
      }
    }
  };

  /**
   * Scrolls the categories container to the left by the scroll offset.
   */
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -getScrollOffset(), behavior: 'smooth' });
    }
  };

  /** Navigate to /category route */
  const onCategoryChange = (category: string) => {
    if (category === 'all') {
      navigate(routes.root);
    } else {
      navigate('/' + category);
    }
  };

  /**
   * Scrolls the categories container to the right by the scroll offset.
   */
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: getScrollOffset(), behavior: 'smooth' });
    }
  };
  return (
    <div className='sticky top-0 z-40 overflow-hidden border-b border-border bg-background shadow dark:border-border-dark dark:bg-background-dark'>
      <div
        ref={containerRef}
        className='no-scrollbar z-30 mx-0 flex snap-x items-center space-x-2 overflow-x-auto bg-background py-4 md:mx-4 md:space-x-4 dark:bg-background-dark'
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <ScrollButton direction='left' hide={hideLeftIcon} onClick={scrollLeft} />
        {categories?.map((item, index) => (
          <CategoryItem
            item={item}
            key={index}
            isSelected={item === categoryName}
            onClick={() => onCategoryChange(item)}
          />
        ))}
        <ScrollButton direction='right' hide={hideRightIcon} onClick={scrollRight} />
      </div>
    </div>
  );
};
