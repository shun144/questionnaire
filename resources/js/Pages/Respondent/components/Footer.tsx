import React from 'react'

type Props = {
  ownerName: string;
}

const Footer = ({ ownerName }: Props) => {
  return (
    <div className='bg-indigo-200 min-h-10 max-h-10 md:min-h-14 md:max-h-14'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='text-white text-xl md:text-3xl'>
          {`${ownerName} / 診断マスター`}
        </div>
      </div>
    </div>


  )
}

export default Footer