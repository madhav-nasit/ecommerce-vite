import React from 'react';
import { Spinner } from './Spinner';
import { Error } from './Error';

interface PageWrapperProps {
  isPending?: boolean;
  isError?: boolean;
  emptyMsg?: string;
  children: React.ReactNode;
}

/**
 * Component that wraps content based on loading and error states.
 * Renders different components based on the provided props.
 * @param {PageWrapperProps} props - Props for the PageWrapper component.
 */
export const PageWrapper: React.FC<PageWrapperProps> = ({
  isPending,
  isError,
  emptyMsg,
  children,
}) => {
  if (isPending) {
    return <Spinner />;
  } else if (isError) {
    return <Error />;
  } else if (!!emptyMsg) {
    return <Error errorMessage={emptyMsg} />;
  } else {
    return children;
  }
};
