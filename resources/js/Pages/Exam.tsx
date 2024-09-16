import { Head } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react';

const quizeData = [
  {
    id: 1,
    question: '太陽系で最も大きな惑星は？',
    options: ['地球', '火星', '木星', '土星']
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

type AnswerType = {
  id: number,
  question: string;
  answer: string;
}

const Quize = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const backQuestion = () => {
    // 1つ前の質問に戻る
    setCurrentQuestion(prev => prev - 1);

    // 回答履歴を1つ前の状態に戻す
    setAnswers(prev => prev.slice(0, -1));
  };

  // 
  const handleAnswer = (answer: string) => {

    const newAnswer: AnswerType = {
      id: quizeData[currentQuestion].id,
      question: quizeData[currentQuestion].question,
      answer,
    };
    setAnswers(prev => [...prev, newAnswer]);

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
    setAnswers([]);
  }

  return (
    <>
      <Head title="quize" />

      {showScore ? (
        <div className='flex flex-col justify-center items-center bg-slate-100 w-full'>
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
                answers.map((item) => (
                  <tr
                    key={item.id}>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
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

export default Quize;


// import { Head } from '@inertiajs/react'
// import { useEffect, useRef, useState } from 'react';

// const quizeData = [
//   {
//     id: 1,
//     question: '太陽系で最も大きな惑星は？',
//     options: ['地球', '火星', '木星', '土星'],
//     correct: '木星'
//   },
//   {
//     id: 2,
//     question: '次のうち、哺乳類ではない動物はどれですか？',
//     options: ['A', 'B', 'C', 'D'],
//     correct: 'B'
//   },
// ]

// type AnswerType = {
//   id: number,
//   question: string;
//   answer: string;
//   correct: boolean;
// }

// const Quize = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [next, setNext] = useState(false);
//   const [answers, setAnswers] = useState<AnswerType[]>([]);
//   // const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [showScore, setShowScore] = useState(false);


//   // const previousValue = useRef<number | null>(null);
//   // useEffect(() => {
//   //   previousValue.current = score;
//   // }, [score]);

//   // const undoChange = () => {
//   //   if (previousValue.current !== null) {
//   //     setCurrentQuestion(prev => prev - 1);
//   //     setScore(previousValue.current);
//   //   }
//   // };

//   const previousValue = useRef<AnswerType[] | null>(null);
//   useEffect(() => {
//     previousValue.current = answers;
//   }, [answers]);

//   const undoChange = () => {
//     if (previousValue.current !== null) {
//       setCurrentQuestion(prev => prev - 1);
//       console.log(previousValue.current);
//       setAnswers(previousValue.current);
//     }
//   };

//   const handleAnswer = (answer: string) => {

//     const newAnswer: AnswerType = {
//       id: quizeData[currentQuestion].id,
//       question: quizeData[currentQuestion].question,
//       answer,
//       correct: answer === quizeData[currentQuestion].correct
//     };

//     if (newAnswer.correct) {
//       // setScore(prev => prev + 1);
//       setFeedback("●")
//     } else {
//       setFeedback("✕")
//     }

//     setAnswers(prev => [...prev, newAnswer]);
//     setNext(true);
//   }

//   const goToNextQuestion = () => {

//     const nextQuestion = currentQuestion + 1

//     if (nextQuestion < quizeData.length) {
//       setCurrentQuestion(nextQuestion)
//     } else {
//       setShowScore(true);
//     }

//     setNext(false);
//   }

//   const retryQuestion = () => {
//     setCurrentQuestion(0);
//     // setScore(0);
//     setAnswers([]);
//     setShowScore(false);
//   }

//   return (
//     <>
//       <Head title="quize" />

//       {showScore ? (
//         <div className='flex flex-col justify-center items-center bg-slate-100 w-full'>
//           <h2>スコア</h2>
//           {/* <h3>{score}/{quizeData.length}</h3> */}
//           <h3>{answers.filter(x => x.correct).length}/{quizeData.length}</h3>
//           <table>
//             <thead>
//               <tr>
//                 <td>質問</td>
//                 <td>あなたの回答</td>
//                 <td>合否</td>
//               </tr>
//             </thead>
//             <tbody>
//               {
//                 answers.map((item) => (
//                   <tr
//                     key={item.id}
//                     className={item.correct ? "true" : "false"}>
//                     <td>{item.question}</td>
//                     <td>{item.answer}</td>
//                     <td>{item.correct ? "●" : "✕"} </td>
//                   </tr>
//                 ))
//               }
//             </tbody>
//           </table>
//           <button
//             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//             onClick={retryQuestion}>もう一度診断を始める
//           </button>
//         </div>
//       ) : (
//         <div className='flex flex-col justify-center items-center bg-slate-100 w-full'>
//           <h2>問題 {currentQuestion + 1}/{quizeData.length}</h2>
//           <h3>{quizeData[currentQuestion].question}</h3>

//           {next ? (
//             <>
//               <div>{feedback}</div>
//               <p>解答</p>
//               <p>{quizeData[currentQuestion].correct}</p>
//               <button
//                 className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//                 onClick={goToNextQuestion}>
//                 {currentQuestion + 1 < quizeData.length ? "次の問題へ" : "スコアを見る"}
//               </button>

//               {currentQuestion + 1 > 1 && (
//                 <button
//                   className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//                   onClick={undoChange}>戻る
//                 </button>
//               )}

//             </>

//           ) : (
//             <>
//               {
//                 quizeData[currentQuestion].options.map(opt => (
//                   <button
//                     key={opt}
//                     className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//                     onClick={() => handleAnswer(opt)}
//                   >
//                     {opt}
//                   </button>
//                 ))
//               }
//             </>
//           )}


//         </div>)}



//     </>
//   );
// }

// export default Quize;