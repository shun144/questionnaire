import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useRespondentStore } from '../../store';
import { QuestionType, } from '../../types';
import { SalsPointType } from '../../../Owner/types';

const StandardQuestion = () => {

  const currentQuestionnarie = useRespondentStore((state) => state.currentQuestionnarie);
  const setCurrentQuestionnarie = useRespondentStore((state) => state.setCurrentQuestionnarie);
  const setAnswerHistories = useRespondentStore((state) => state.setAnswerHistories);
  const answerHistories = useRespondentStore((state) => state.answerHistories);
  const backStep = useRespondentStore((state) => state.backStep);


  const handleClick = useCallback((currentQuestion: QuestionType, answer: string, salesPoints: SalsPointType[], nextId?: string) => {
    setAnswerHistories(currentQuestion.id, currentQuestion.topic, answer, salesPoints);
    setCurrentQuestionnarie(nextId);
  }, [setAnswerHistories, setCurrentQuestionnarie]);


  return (
    <>
      <div className='h-full w-full flex flex-col justify-start items-center pt-10 pb-6 md:py-12'>
        <div className='w-full px-2 md:w-6/12'>

          <div className="rounded-2xl shadow-md">
            <div
              className='rounded-t-2xl bg-gradient-to-br from-purple-400 via-violet-400 to-blue-200
               text-white text-lg flex justify-center items-center px-3 py-3 md:text-2xl md:px-5 md:py-7 md:h-[100px]'>

              <div className="w-full text-start break-all line-clamp-2 text-xl md:text-3xl">
                {(currentQuestionnarie as QuestionType).topic}
              </div>
            </div>

            <div className="bg-white rounded-b-2xl py-1 md:py-4">
              <div className='flex flex-col justify-center items-center gap-y-4 py-4 mb:gap-y-7 mb:py-8'>
                {
                  (currentQuestionnarie as QuestionType).choices.map(({ id, content, salesPoints, nextId }, idx) => (
                    <button
                      key={id}
                      className="w-11/12 border-4 border-gray-300 
                      flex justify-center items-center rounded-full hover:opacity-40 transiton-all duration-300
                      min-h-16 h-16 max-h-16
                      md:min-h-24 md:h-24 md:max-h-24"
                      onClick={() => handleClick(currentQuestionnarie as QuestionType, content, salesPoints, nextId)}
                    >
                      <div className="w-2/12 md:w-1/12 md:pl-4">
                        <div className='flex justify-center items-center'>
                          <div className="flex justify-center items-center rounded-full  bg-gradient-to-br from-purple-400 via-violet-400 to-blue-400 
                          w-[30px] h-[30px] md:w-[40px] md:h-[40px]">
                            <div className='rounded-full flex justify-center items-center bg-white 
                            w-[24px] h-[24px]
                            md:w-[34px] md:h-[34px]'>
                              <p
                                className="bg-gradient-to-br from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent font-bold text-xl md:text-3xl"
                              >
                                {String.fromCharCode(idx + 65)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='w-10/12 md:w-11/12'>
                        <div className='px-2 flex justify-start items-center'>
                          <p className='break-all line-clamp-2 text-lg md:text-2xl'>{content}</p>
                        </div>
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>
          </div>

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

        </div >

      </div >
    </>
  )
}

export default memo(StandardQuestion);

