import { useMemo } from 'react';

export const usePagination = (totalPages) => {
  const pagesArray = useMemo(() => {
    return Array.from({ length: totalPages }, (_, idx) => {
      return idx + 1;
    });
  }, [totalPages]);

  return pagesArray;
};
