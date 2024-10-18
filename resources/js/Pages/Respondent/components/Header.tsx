import React from 'react'

type Props = {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <div className='bg-purple-300 min-h-10 max-h-10 md:min-h-14 md:max-h-14'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='text-white text-xl md:text-3xl'>
          {title}
        </div>
      </div>
    </div>
  )
}

export default Header