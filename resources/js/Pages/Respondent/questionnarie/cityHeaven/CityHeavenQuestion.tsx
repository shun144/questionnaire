import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useRespondentStore } from '../../store';
import { QuestionType, } from '../../types';
import { SalsPointType } from '../../../Owner/types';

const CityHeavenQuestion = () => {

  const { currentQuestionnarie, setCurrentQuestionnarie, setAnswerHistories, answerHistories, backStep } = useRespondentStore();

  const handleClick = useCallback((
    currentQuestion: QuestionType,
    answer: string,
    salesPoints: SalsPointType[],
    nextId?: string) => {
    setAnswerHistories(currentQuestion.id, currentQuestion.topic, answer, salesPoints);
    setCurrentQuestionnarie(nextId);
  }, []);

  return (
    <>
      < div className='h-full w-full flex flex-col justify-start items-center px-4'>
        <div className='w-full md:w-6/12'>
          <div
            className="rounded-t-lg w-full border border-red-100 mb-7"
            style={{ boxShadow: "10px 8px 1px rgba(0, 0, 0, .3)" }}>


            <div className='w-full rounded-t-lg bg-slate-900 text-white flex justify-center items-center text-lg px-3 py-3 md:text-2xl md:px-5 md:py-7 md:h-[100px]'>

              <div className="w-11/12 text-center break-all line-clamp-2 pl-4">
                {(currentQuestionnarie as QuestionType).topic}
              </div>
            </div>

            <div className='bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400'>
              <div className='flex flex-col justify-center items-center h-full gap-y-4 py-4 mb:gap-y-7 mb:py-8'>
                {
                  (currentQuestionnarie as QuestionType).choices.map(({ id, content, salesPoints, nextId }, idx) => (
                    <button
                      key={id}
                      className="w-[90%] min-h-[60px] max-h-[60px] py-4 overflow-hidden bg-white rounded-md flex justify-start items-center transition-opacity duration-300 hoverable:hover:opacity-70 md:min-h-[75px] md:max-h-[75px]"
                      style={{ boxShadow: "8px 6px 1px rgba(0, 0, 0, .3)" }}
                      onClick={() => handleClick(
                        currentQuestionnarie as QuestionType,
                        content,
                        salesPoints,
                        nextId
                      )}
                    >
                      <div className="w-1/12 px-1">
                        <div>{nextId}</div>
                        <div className='text-center font-bold bg-amber-100 rounded-full my-0 mx-auto flex justify-center items-center text-lg h-[35px] w-[35px] md:text-2xl md:h-[50px] md:w-[50px]'>
                          <p>{String.fromCharCode(idx + 65)}</p>
                        </div>
                      </div>
                      <div className="w-11/12  font-bold text-start break-all line-clamp-2 min-h-[20px] max-h-[40px] leading-[20px] text-lg pl-8 pr-4 md:text-2xl md:pl-4 md:min-h-[30px] md:max-h-[60px] md:leading-[30px]">
                        {content}
                      </div>
                      {salesPoints && salesPoints.map(x => (<span key={x.no}>{x.label}</span>))}
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
        </div >


        {/* 戻るボタン */}
        {answerHistories.length > 0 && (
          <div className='flex justify-start items-start'>
            <button
              className='bg-blue-500 hoverable:hover:bg-blue-700 text-white font-bold py-2 px-3 rounded flex justify-center items-center gap-1 shadow-2xl'
              onClick={backStep}>
              <IoArrowBack className="text-xl" />
              <p>1つ前の質問に戻る</p>
            </button>
          </div>
        )}
      </div >
    </>
  )
}

export default memo(CityHeavenQuestion);

