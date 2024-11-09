import { title } from 'process';
import React, { useMemo, useEffect, useState, useRef } from 'react'

type Props = {
  ownerName?: string;
}

const appName = "診断マスター";

const Footer = ({ ownerName }: Props) => {

  const [isOverFlow, setIsOverFlow] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const checkOverflow = () => {
      if (titleRef.current) {
        setIsOverFlow(titleRef.current.scrollWidth > titleRef.current.clientWidth);
      }
    }
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, [])

  return (
    <div className='bg-indigo-200 min-h-10 max-h-10 md:min-h-14 md:max-h-14'>
      <div
        ref={titleRef}
        className={`w-full h-full flex items-center overflow-x-auto ${isOverFlow ? "justify-start px-3" : "justify-center"}`}>
        <div className='text-white whitespace-nowrap text-lg md:text-3xl'>
          {ownerName ? `${ownerName}  / ${appName}` : appName}
        </div>
      </div>
    </div>
  )
}

export default Footer