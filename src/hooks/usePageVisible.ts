import { useEffect, useState } from 'react';

export function usePageVisible() {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return isVisible;
}
