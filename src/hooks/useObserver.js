import { useEffect, useRef } from 'react';

export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef();
  useEffect(() => {
    if (isLoading) return;
    if (useObserver.current) useObserver.current.disconnect();

    const cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current);
  }, [isLoading, ref, callback, canLoad]);
};
