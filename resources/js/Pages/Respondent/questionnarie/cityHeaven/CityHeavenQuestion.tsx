import { memo, useEffect, useState, useRef, useCallback } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useRespondentStore } from '../../store';
import { QuestionType, } from '../../types';
import { SalsPointType } from '../../../Owner/types';

const CityHeavenQuestion = () => {

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
      < div className='h-full w-full flex flex-col justify-start items-center py-12'>
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
                      md:min-h-28 md:h-28 md:max-h-28"
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

export default memo(CityHeavenQuestion);




// import { memo, useEffect, useState, useRef, useCallback } from 'react'
// import { IoArrowBack } from "react-icons/io5";
// import { useRespondentStore } from '../../store';
// import { QuestionType, } from '../../types';
// import { SalsPointType } from '../../../Owner/types';

// const CityHeavenQuestion = () => {

//   const { currentQuestionnarie, setCurrentQuestionnarie, setAnswerHistories, answerHistories, backStep } = useRespondentStore();

//   const handleClick = useCallback((
//     currentQuestion: QuestionType,
//     answer: string,
//     salesPoints: SalsPointType[],
//     nextId?: string) => {
//     setAnswerHistories(currentQuestion.id, currentQuestion.topic, answer, salesPoints);
//     setCurrentQuestionnarie(nextId);
//   }, []);

//   return (
//     <>
//       < div className='h-full w-full flex flex-col justify-start items-center px-4'>
//         <div className='w-full md:w-6/12'>
//           <div
//             className="rounded-t-lg w-full border border-red-100 mb-7"
//             style={{ boxShadow: "10px 8px 1px rgba(0, 0, 0, .3)" }}>


//             <div className='w-full rounded-t-lg bg-slate-900 text-white flex justify-center items-center text-lg px-3 py-3 md:text-2xl md:px-5 md:py-7 md:h-[100px]'>

//               <div className="w-11/12 text-center break-all line-clamp-2 pl-4">
//                 {(currentQuestionnarie as QuestionType).topic}
//               </div>
//             </div>

//             <div className='bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400'>
//               <div className='flex flex-col justify-center items-center h-full gap-y-4 py-4 mb:gap-y-7 mb:py-8'>
//                 {
//                   (currentQuestionnarie as QuestionType).choices.map(({ id, content, salesPoints, nextId }, idx) => (
//                     <button
//                       key={id}
//                       className="w-[90%] min-h-[60px] max-h-[60px] py-4 overflow-hidden bg-white rounded-md flex justify-start items-center transition-opacity duration-300 hoverable:hover:opacity-70 md:min-h-[75px] md:max-h-[75px]"
//                       style={{ boxShadow: "8px 6px 1px rgba(0, 0, 0, .3)" }}
//                       onClick={() => handleClick(
//                         currentQuestionnarie as QuestionType,
//                         content,
//                         salesPoints,
//                         nextId
//                       )}
//                     >
//                       <div className="w-1/12 px-1">
//                         <div>{nextId}</div>
//                         <div className='text-center font-bold bg-amber-100 rounded-full my-0 mx-auto flex justify-center items-center text-lg h-[35px] w-[35px] md:text-2xl md:h-[50px] md:w-[50px]'>
//                           <p>{String.fromCharCode(idx + 65)}</p>
//                         </div>
//                       </div>
//                       <div className="w-11/12  font-bold text-start break-all line-clamp-2 min-h-[20px] max-h-[40px] leading-[20px] text-lg pl-8 pr-4 md:text-2xl md:pl-4 md:min-h-[30px] md:max-h-[60px] md:leading-[30px]">
//                         {content}
//                       </div>
//                       {salesPoints && salesPoints.map(x => (<span key={x.no}>{x.label}</span>))}
//                     </button>
//                   ))
//                 }
//               </div>
//             </div>
//           </div>
//         </div >

//         {answerHistories.length > 0 && (
//           <div className='flex justify-start items-start'>
//             <button
//               className='bg-blue-500 hoverable:hover:bg-blue-700 text-white font-bold py-2 px-3 rounded flex justify-center items-center gap-1 shadow-2xl'
//               onClick={backStep}>
//               <IoArrowBack className="text-xl" />
//               <p>1つ前の質問に戻る</p>
//             </button>
//           </div>
//         )}
//       </div >
//     </>
//   )
// }

// export default memo(CityHeavenQuestion);

