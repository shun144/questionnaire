import { memo, useEffect } from 'react'
import { ResultType } from '../../types';
import { countUpAchievement } from '../../utils';
import { useRespondentStore } from '../../store';
import { MdOutlineRestartAlt } from "react-icons/md";
import 'react-responsive-pagination/themes/classic.css';
import './standardResult.css';

const StandardResult = () => {
  // const answerHistories = useRespondentStore((state) => state.answerHistories);
  const reset = useRespondentStore((state) => state.reset);
  const currentQuestionnarie = useRespondentStore((state) => state.currentQuestionnarie);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const result = (currentQuestionnarie as ResultType).result;
    countUpAchievement(currentUrl, result);
  }, [])


  return (
    <>

      <div className='h-full w-full flex flex-col justify-start items-center relative'>

        <div className='h-full w-11/12  md:w-6/12'>

          <div
            className="animate-slide top-0 bottom-0 -left-1/2 -right-1/2 opacity-50 absolute"
            style={{
              backgroundImage: "linear-gradient(-60deg, #f3e8ff 50%, #ddd6fe 50%)",
              animationDuration: "83s"
            }}
          ></div>

          <div
            className="placeholder:animate-slide top-0 bottom-0 -left-1/2 -right-1/2 opacity-50 absolute"
            style={{
              backgroundImage: "linear-gradient(-65deg, #f3e8ff 50%, #ddd6fe 50%)",
              animationDirection: "alternate-reverse",
              animationDuration: "54s"
            }}
          ></div>

          <div
            className="animate-slide top-0 bottom-0 -left-1/2 -right-1/2 opacity-50 absolute"
            style={{
              backgroundImage: "linear-gradient(-76deg, #f3e8ff 50%, #ddd6fe 50%)",
              animationDuration: "78s"
            }}
          ></div>

          <div className='h-12 w-full flex justify-center items-center mt-2 mb-1 md:mt-12 md:mb-10'>
            <div className='text-xl text-violet-400/80 font-bold text-md select-none z-50 md:text-4xl'>
              診 断 結 果
            </div>
          </div>

          <div className='h-96 w-full bg-white/40 rounded-lg shadow-sm border-2 border-white/40 backdrop-blur-[4px]
          flex justify-start items-center flex-col'>
            <div className='h-[6rem] md:h-[8rem] w-full  flex justify-center items-center border-b-2 border-white/60 '>
              <div className='text-xl md:text-3xl text-slate-700 font-semibold z-50'>
                {(currentQuestionnarie as ResultType).result}
              </div>

            </div>

            <div className='grow w-full  flex justify-center items-center'>
              <div className='text-xl md:text-2xl text-slate-600 font-normal z-50'>
                {(currentQuestionnarie as ResultType).message}
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center items-center mt-6 mb-4 md:mt-10 md:mb-10">
            <button
              className='bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3 z-50'
              onClick={() => reset()} >
              <MdOutlineRestartAlt className='text-2xl' />
              <p>もう一度最初から始める</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(StandardResult);


