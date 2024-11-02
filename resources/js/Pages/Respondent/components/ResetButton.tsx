import React, { memo } from 'react'
import { MdOutlineRestartAlt } from "react-icons/md";
import { useRespondentStore } from '@/Pages/Respondent/store';

const ResetButton = () => {

  const reset = useRespondentStore((state) => state.reset);

  return (
    <>
      <div className="w-full flex justify-center items-center mb-4 md:mb-10">
        <button
          className='bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3'
          onClick={() => reset()} >
          <MdOutlineRestartAlt className='text-2xl' />
          <p>もう一度最初から始める</p>
        </button>
      </div>
    </>
  )
}

export default memo(ResetButton);