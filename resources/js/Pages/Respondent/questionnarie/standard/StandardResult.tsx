import { memo, useEffect } from 'react'
import { ResultType } from '@/Pages/Respondent/types';
import { useRespondentStore } from '@/Pages/Respondent/store';
import { MdOutlineRestartAlt } from "react-icons/md";
import { countUpAchievement, sanitizeText } from '@/Pages/Respondent/utils';
import 'react-responsive-pagination/themes/classic.css';
import './standardResult.css';
import StandardResultBg from './StandardResultBg';
import useCheckOverHight from '@/Pages/Respondent/hooks/useCheckOverHight'



const StandardResult = () => {
  const { refCheckOverHeight: refResult, isOverHeight: isResultOverHeight } = useCheckOverHight();
  const { refCheckOverHeight: refMsg, isOverHeight: isMsgOverHeight } = useCheckOverHight();


  const reset = useRespondentStore((state) => state.reset);
  const currentQuestionnarie = useRespondentStore((state) => state.currentQuestionnarie);

  // 回答実績登録
  useEffect(() => {
    const currentPathname = window.location.pathname;
    const result = (currentQuestionnarie as ResultType).result;
    countUpAchievement(currentPathname, result);
  }, [])


  return (
    <>
      <div className='h-full max-h-full w-full flex justify-center items-center overflow-hidden relative'>

        <StandardResultBg />

        <div className='w-11/12 md:w-7/12 h-full flex flex-col justify-center items-center'>

          <div className='w-full h-[8%] md:h-[10%] text-center flex justify-center items-center z-50'>
            <div className='text-lg text-violet-400/80 font-bold text-md select-none md:text-4xl'>
              診 断 結 果
            </div>
          </div>

          <div className='w-full max-h-[82%] md:max-h-[80%] min-h-[40%] bg-white/40 rounded-lg shadow-sm backdrop-blur-[4px] flex flex-col justify-center items-center px-6'>

            <div
              className={`w-full h-2/6 max-h-2/6 min-h-2/6 overflow-y-auto mt-3 md:mt-6 flex ${isResultOverHeight ? "items-start" : "items-center"}`}
              ref={refResult}
            >
              <div className='whitespace-pre-wrap w-full text-base md:text-3xl text-slate-700 font-semibold flex justify-center break-all'
                dangerouslySetInnerHTML={sanitizeText((currentQuestionnarie as ResultType).result!)}
              />
            </div>

            <div className='w-full border-b-2 border-violet-600/20 my-3 md:my-6' />

            <div
              className={`w-full h-4/6 max-h-4/6 min-h-4/6 overflow-y-auto mb-3 md:mb-6 flex ${isMsgOverHeight ? "items-start" : "items-center"}`}
              ref={refMsg}
            >
              <div className='whitespace-pre-wrap  w-full text-base md:text-2xl text-slate-600 font-normal flex justify-center break-all'
                dangerouslySetInnerHTML={sanitizeText((currentQuestionnarie as ResultType).message!)}
              />

            </div>
          </div>

          <div className='w-full h-[10%] md:h-[10%] flex justify-center items-center z-50 mt-2'>
            <button
              className='bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200 text-sm py-2 px-2 md:text-xl md:px-3 z-50'
              onClick={() => reset()} >
              <MdOutlineRestartAlt className='text-lg md:text-2xl' />
              <p>もう一度最初から始める</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(StandardResult);

