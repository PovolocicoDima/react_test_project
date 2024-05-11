import { useState } from 'react';

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true);

      await callback();
    } catch (e) {
      setIsError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, isError];
};
