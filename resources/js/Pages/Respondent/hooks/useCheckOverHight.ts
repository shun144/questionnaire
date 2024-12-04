import React, { useState, useRef, useEffect } from 'react'

const useCheckOverHight = () => {
  const [isOverHeight, setIsOverHeight] = useState(false);
  const refCheckOverHeight = useRef<HTMLDivElement>(null);

  useEffect(() => {

    checkOverHeight();
    window.addEventListener('resize', checkOverHeight);

    return () => window.removeEventListener('resize', checkOverHeight);

  }, []);


  const checkOverHeight = () => {
    if (refCheckOverHeight.current) {
      setIsOverHeight(refCheckOverHeight.current.scrollHeight > refCheckOverHeight.current.clientHeight);
    }
  }

  return { refCheckOverHeight, isOverHeight };
}

export default useCheckOverHight;
