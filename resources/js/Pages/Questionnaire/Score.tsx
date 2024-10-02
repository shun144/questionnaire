import React, { memo, useEffect, useState } from 'react'
import { useQuestionnaireContext } from './QuestionnaireProvider';
import { MdOutlineRestartAlt } from "react-icons/md";
import { GirlType } from '../Quize/types';

const Score = () => {

  const [viewGirlList, setViewGirlList] = useState<GirlType[]>([]);
  const { resultData, showScore, setShowScore, setCurrentQuestion, setAnswerHistories, answerHistories, baseGirlDataList, loading } = useQuestionnaireContext();


  // 質問を最初からやり直す
  const retryQuestion = () => {
    setShowScore(false);
    setCurrentQuestion(1);
    setAnswerHistories([]);
  };

  useEffect(() => {
    if (loading) {
      return;
    }

    const score = {
      '04': 3,
      '07': 2,
      '11': 1,
      '43': 4,
    }
    const scoreKeys = Object.entries(score);

    const countEarnPoint = (girl: GirlType) => {
      let point = 0;
      scoreKeys.forEach((kv) => {
        point += girl.salespoint_ids.includes(kv[0]) ? kv[1] : 0;
      });

      return {
        ...girl,
        earn_point: point
      };
    };

    const girlDataListWithPoint: GirlType[] = []
    baseGirlDataList.forEach(girl => {
      girlDataListWithPoint.push(countEarnPoint(girl))
    })


    girlDataListWithPoint.sort((a, b) => {

      // ①当日出勤している
      if (b.today_work_flg !== a.today_work_flg) {
        return b.today_work_flg ? 1 : -1;
      }

      // ②チェック項目に一致している数が多い
      if (b.earn_point !== a.earn_point) {
        return b.earn_point - a.earn_point;
      }

      // ③写メ日記がある
      if (b.diary_flg !== a.diary_flg) {
        return b.diary_flg ? 1 : -1;
      }

      // ④口コミがある
      if (b.review_flg !== a.review_flg) {
        return b.review_flg ? 1 : -1;
      }

      // ⑤直近1週間以内に出勤予定がある。
      return b.w_shukkin.filter(x => x !== null).length - a.w_shukkin.filter(x => x !== null).length;

      // // 第三条件: nameの長さでソート
      // return a.name.length - b.name.length;

    })

    setViewGirlList(girlDataListWithPoint);

    // setViewGirlList([
    //   ...girlDataListWithPoint.slice(0, 10)
    // ]);
  }, [loading])



  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <>
      {showScore && (
        <div className='flex flex-col justify-start items-center h-full w-full'>

          {/* バッファ */}
          <div className='w-full h-[50px] md:min-h-[75px] md:max-h-[75px] flex justify-center items-center my-2' >
            <div className='text-4xl text-slate-800 font-bold'>
              診断結果
            </div>
          </div>

          <div className='w-full md:w-6/12'>

            {viewGirlList.map(({ id, name, w_shukkin, diary_flg, review_flg, earn_point, today_work_flg }) => (
              <div key={id}>
                <div>
                  {today_work_flg ? (<span className='text-red-300'>本日出勤 </span>) : (<span className='text-blue-300'>本日欠勤 </span>)}　{earn_point}点　 {name} 　 {diary_flg ? "1" : "0"} {review_flg ? "1" : "0"}　{w_shukkin.filter(x => x !== null).length}出勤
                </div>
              </div>
            ))}
          </div>

          <button
            className='bg-blue-500 hoverable: hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-1'
            onClick={retryQuestion} >
            <MdOutlineRestartAlt className='text-2xl' />
            <p>もう一度最初から始める</p>
          </button>
        </div >
      )}
    </>
  );
}

export default memo(Score);


// import React, { memo } from 'react'
// import { useQuestionnaireContext } from './QuestionnaireProvider';
// import { MdOutlineRestartAlt } from "react-icons/md";

// const Score = () => {

//   const { resultData, showScore, setShowScore, setCurrentQuestion, setAnswerHistories, answerHistories, girlData } = useQuestionnaireContext();

//   // 質問を最初からやり直す
//   const retryQuestion = () => {
//     setShowScore(false);
//     setCurrentQuestion(1);
//     setAnswerHistories([]);
//   };

//   return (
//     <>
//       {showScore && (
//         <div className='flex flex-col justify-start items-center h-full w-full'>

//           {/* バッファ */}
//           <div className='w-full h-[50px] md:min-h-[75px] md:max-h-[75px] flex justify-center items-center my-2' >
//             <div className='text-4xl text-slate-800 font-bold'>
//               診断結果
//             </div>
//           </div>

//           <div className='w-full md:w-6/12'>

//             {resultData.map(({ resultNo, result, message, img, url }) => (
//               <div
//                 key={resultNo}
//                 className="rounded-t-lg w-full border border-red-100 mb-7"
//                 style={{ boxShadow: "10px 8px 1px rgba(0, 0, 0, .3)" }}>

//                 {/* 診断結果タイトル */}
//                 <div className='w-full rounded-t-lg bg-slate-900 text-white flex justify-center items-center text-lg px-3 py-3 md:text-4xl md:px-5 md:py-7 md:h-[100px]'>
//                   {result}
//                 </div>

//                 <div className='bg-gradient-to-r from-amber-100 via-slate-50 to-amber-100'>
//                   {/* <div className='flex flex-col justify-center items-center h-full gap-y-7 py-8'> */}
//                   <div className='flex flex-col justify-center items-center h-full mx-8 gap-y-4 py-4 mb:gap-y-7 mb:py-8'>
//                     <div>
//                       <img className="" src={img} alt="" />
//                     </div>
//                     <div>
//                       <p className='text-2xl'>{message}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             className='bg-blue-500 hoverable: hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-1'
//             onClick={retryQuestion} >
//             <MdOutlineRestartAlt className='text-2xl' />
//             <p>もう一度最初から始める</p>
//           </button>
//         </div >
//       )}
//     </>
//   );
// }

// export default memo(Score);