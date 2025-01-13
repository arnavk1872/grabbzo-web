import { useState, useEffect } from 'react';

const checkScreenWidth = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 480);
    };

    window.addEventListener('resize', handleResize);
    handleResize();  // Set initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export default checkScreenWidth;
