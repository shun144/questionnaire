import { Head } from '@inertiajs/react'
import { useEffect, useRef, useState, memo } from 'react';

const quizeData = [
  {
    id: 1,
    question: '太陽系で最も大きな惑星は？',
    options: ['地aaa球', '火星', '木星', '土星']
  },
  {
    id: 2,
    question: '次のうち、哺乳類ではない動物はどれですか？',
    options: ['A', 'B', 'C', 'D']
  },
  {
    id: 3,
    question: '次のうち、',
    options: ['A1', 'B2', 'C3', 'D4']
  },
]

type AnswerHistoryType = {
  id: number,
  question: string;
  answer: string;
}

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answerHistories, setAnswerHistories] = useState<AnswerHistoryType[]>([]);

  const backQuestion = () => {
    // 1つ前の質問に戻る
    setCurrentQuestion(prev => prev - 1);

    // 回答履歴を1つ前の状態に戻す
    setAnswerHistories(prev => prev.slice(0, -1));
  };

  // 
  const handleAnswer = (answer: string) => {

    const newAnswer: AnswerHistoryType = {
      id: quizeData[currentQuestion].id,
      question: quizeData[currentQuestion].question,
      answer,
    };
    setAnswerHistories(prev => [...prev, newAnswer]);

    // 質問が残っている→次の質問へ
    // 質問が残っていない→結果へ
    const nextQuestion = currentQuestion + 1
    if (nextQuestion === quizeData.length) {
      setShowScore(true);
    } else {
      setCurrentQuestion(nextQuestion)
    }
  }

  // 質問を最初からやり直す
  const retryQuestion = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setAnswerHistories([]);
  }

  return (
    <>
      <Head title="quize" />

      {showScore ? (
        <div className='flex flex-col justify-center items-center w-full'>
          <h2>スコア</h2>
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
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={retryQuestion}>もう一度診断を始める
          </button>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center bg-slate-100 w-full'>
          <h2>質問 {currentQuestion + 1}/{quizeData.length}</h2>
          <h3>{quizeData[currentQuestion].question}</h3>
          {
            quizeData[currentQuestion].options.map(opt => (
              <button
                key={opt}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))
          }

          {currentQuestion + 1 > 1 && (
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={backQuestion}>前の質問に戻る
            </button>
          )}
        </div >
      )}
    </>
  );
}

export default memo(Exam);

