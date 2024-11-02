import React, { useMemo } from 'react'

type Props = {
  ownerName?: string;
}

const Footer = ({ ownerName }: Props) => {
  const appName = "診断マスター";
  return (
    <div className='bg-indigo-200 min-h-10 max-h-10 md:min-h-14 md:max-h-14'>
      <div className='w-full h-full flex justify-center items-center overflow-x-hidden'>
        <div className='text-white text-lg md:text-3xl'>
          {ownerName ? `${ownerName}  / ${appName}` : appName}
        </div>
      </div>
    </div>
  )
}

export default Footer