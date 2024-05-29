// useWindowSize.ts
// import Anomaly from '@/components/maps/anomaly';
import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  wAnomaly: number | undefined;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    wAnomaly: undefined
  });
  // const [xlg, setXlg] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1536) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          wAnomaly: 800
        });
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          wAnomaly: 500
        });
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []); 


  return windowSize;
}

export default useWindowSize;
