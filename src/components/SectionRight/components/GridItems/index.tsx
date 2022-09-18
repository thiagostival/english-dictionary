import React from 'react';

// STYLES
import { ContentMessages, WrapperGridItems } from './styles';

// COMPONENTS
import { Loading } from '../../../Loading';

// TYPES
interface IGridItemsProps {
  isEmpty?: boolean;
  isLoading?: boolean;
  isNeedAuth?: boolean;
  isAuthenticated?: boolean;
  name?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

export function GridItems({
  name = '',
  isEmpty = false,
  isLoading = false,
  isNeedAuth = false,
  isAuthenticated = false,
  errorMessage = '',
  children,
}: IGridItemsProps) {
  if (isNeedAuth && !isAuthenticated) {
    return (
      <ContentMessages>To access {name} you must be logged in</ContentMessages>
    );
  }
  if (isLoading) {
    return <Loading size={50} />;
  }
  if (errorMessage && isEmpty) {
    return <ContentMessages className="error">{errorMessage}</ContentMessages>;
  }
  if (isEmpty) {
    return (
      <ContentMessages className="empty">
        <span>No data for now</span>
      </ContentMessages>
    );
  }

  return (
    <>
      <WrapperGridItems>{children}</WrapperGridItems>
      <ContentMessages className="error">{errorMessage}</ContentMessages>
    </>
  );
}
