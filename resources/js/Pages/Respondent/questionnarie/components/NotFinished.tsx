import { memo } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useRespondentStore } from '../../store';


const NotFinished = () => {
  const { answerHistories, backStep } = useRespondentStore();

  return (
    <>
      <div className='h-full w-full flex flex-col justify-start items-center'>
        <div className='pt-12 w-9/12 md:pt-24 md:w-5/12'>

          <div className='w-full'>
            <div className='flex items-end gap-x-3'>
              <span className='text-2xl font-bold text-slate-600 md:text-3xl'>このアンケートはここで終了しています。</span>
            </div>
            <div className='pt-6 text-xl text-slate-600 md:pt-6 md:text-3xl'>
              アンケートをやり直していただくか、管理者へご確認ください。
            </div>
          </div>

          <div className='w-full flex pt-4 md:pt-8'>
            {answerHistories.length > 0 && (
              <div className='pt-4 flex justify-start items-start'>
                <button
                  className='bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3'
                  onClick={() => backStep()}>
                  <IoArrowBack className="text-sm md:text-xl" />
                  <p>1つ前の質問に戻る</p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(NotFinished);