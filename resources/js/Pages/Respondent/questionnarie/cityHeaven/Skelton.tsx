import React, { memo } from 'react'

const Skelton = () => {
  return (

    <div className="h-full w-full flex flex-col justify-start items-center animate-pulse">

      <div className='w-full flex flex-col justify-center items-center my-2 px-2 gap-y-4 mb-4 md:min-h-20 md:max-h-20' >
        <div className=' text-slate-700 font-bold text-md md:text-3xl'>
          診断結果集計中...
        </div>
      </div>
      <div role="status" className=' grid mb-4 grid-cols-2 gap-x-3 gap-y-4  md:mb-10 md:grid-cols-5 md:gap-x-6 md:gap-y-8'>
        {[...Array(10)].map((_, i) => (
          <div key={i} className=" bg-slate-300 rounded-md w-36 h-44 md:w-64 md:h-80" />

        ))}
      </div>
    </div>
  );
}

export default memo(Skelton);