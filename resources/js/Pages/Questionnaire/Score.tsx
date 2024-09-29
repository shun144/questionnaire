import React, { memo } from 'react'
import { useQuestionnaireContext } from './QuestionnaireProvider';
import { MdOutlineRestartAlt } from "react-icons/md";

const Score = () => {

  const { showScore, setShowScore, setCurrentQuestion, setAnswerHistories, answerHistories } = useQuestionnaireContext();

  // 質問を最初からやり直す
  const retryQuestion = () => {
    setShowScore(false);
    setCurrentQuestion(1);
    setAnswerHistories([]);
  };

  return (
    <>
      {showScore && (
        <div className='flex flex-col justify-start items-center h-full w-full'>
          <div className='font-bold text-8xl text-slate-900'>診断結果</div>
          <table>
            <thead>
              <tr>
                <td>質問</td>
                <td>あなたの回答</td>
              </tr>
            </thead>
            <tbody>
              {
                answerHistories.map(({ id, question, answer }) => (
                  <tr
                    key={id}>
                    <td>{question}</td>
                    <td>{answer}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-1'
            onClick={retryQuestion}>
            <MdOutlineRestartAlt className='text-2xl' />
            <p>最初から診断を始める</p>
          </button>
        </div>
      )}
    </>


  )
}

export default memo(Score);