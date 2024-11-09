import React, { useEffect, useRef, useState } from 'react'

type Props = {
  title?: string;
}


const Header = ({ title }: Props) => {
  const [isOverflow, setIsOverflow] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current) {
        setIsOverflow(titleRef.current.scrollWidth > titleRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <div className='bg-purple-300 min-h-10 max-h-10 md:min-h-14 md:max-h-14'>
      <div
        ref={titleRef}
        className={`overflow-x-auto h-full flex items-center  ${isOverflow ? 'justify-start px-3' : 'justify-center'}`}
      >
        <div
          className="text-white whitespace-nowrap text-xl md:text-3xl"
        >
          {title}
        </div>
      </div>
    </div>
  );

};

export default Header