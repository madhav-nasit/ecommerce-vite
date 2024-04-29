import { strings } from 'constants';
import React from 'react';

/**
 * Props interface for the Pagination component
 */
interface PaginationProps {
  /** The current page number */
  currentPage: number;
  /** The total number of pages */
  totalPages: number;
  /** Callback function to handle page changes */
  onPageChange: (page: number) => void;
}

/**
 * Pagination component to display a pagination control.
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @param onPageChange - Callback function to handle page changes.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const {
    primary: { home },
  } = strings;

  /**
   * Handles click event for pagination buttons.
   * @param page - The page number clicked.
   */
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return <></>;
  return (
    <div className='my-4 flex justify-center'>
      <nav aria-label='Page navigation example'>
        <ul className='inline-flex -space-x-px text-sm'>
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`ms-0 flex h-8 items-center justify-center rounded-l-lg border border-e-0 border-border bg-card px-3 leading-tight text-color ${
                currentPage === 1
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-hover hover:text-primary-dark dark:border-border-dark dark:bg-card-dark dark:text-color-dark dark:hover:bg-hover-dark dark:hover:text-primary-dark'
              }`}
            >
              {home.previous}
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <li key={page} onClick={() => handlePageChange(page)}>
              <button
                disabled={currentPage === page}
                className={`flex h-8 items-center justify-center border ${
                  currentPage === page
                    ? 'data:bg-primary-dark bg-primary text-color-dark'
                    : 'bg-card text-color hover:bg-hover hover:text-primary-dark dark:bg-card-dark dark:text-color-dark dark:hover:bg-hover-dark dark:hover:text-primary-dark'
                } px-3 leading-tight dark:border-border-dark`}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex h-8 items-center justify-center rounded-r-lg border border-border bg-card px-3 leading-tight text-color ${
                currentPage === totalPages
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-hover hover:text-primary-dark dark:border-border-dark dark:bg-card-dark dark:text-color-dark dark:hover:bg-hover-dark dark:hover:text-primary-dark'
              }`}
            >
              {home.next}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
