import React, { memo } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { useQuestionnaireContext } from './QuestionnaireProvider';


/**
 * 診断回答の進捗状況を表示するドットインジケーター
 * @returns 
 */
const Indicator = () => {

  const { quizeData, currentQuestion } = useQuestionnaireContext();

  return (
    <>
      <ol className="flex items-center justify-center w-full h-full">
        {
          quizeData.map(({ quizeNo }, idx) => (
            <li key={quizeNo} className="relative w-full">
              <div className="flex items-center">
                <div className={`w-5/12 h-0.5 ${idx === 0 ? "bg-transparent" : "bg-gray-200 dark:bg-gray-700"}`} />
                <div className='w-2/12 min-w-[15px] flex justify-center'>
                  <FaCheckCircle className={`text-3xl ${idx + 1 <= currentQuestion ? "text-amber-400" : "text-slate-300"}`} />
                </div>
                <div className={`w-5/12 h-0.5 ${idx === quizeData.length - 1 ? "bg-transparent" : "bg-gray-200 dark:bg-gray-700"}`} />
              </div>
            </li>
          ))
        }
      </ol>
    </>
  );

}

export default memo(Indicator);