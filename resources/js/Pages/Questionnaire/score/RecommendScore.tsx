// import React, { memo, useEffect, useState } from 'react'
// import { MdOutlineRestartAlt } from "react-icons/md";
// import { GirlType } from '..//types';
// import ReactPaginate from 'react-paginate';
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
// import { motion } from "framer-motion";

// const Score = () => {

//   const [itemOffset, setItemOffset] = useState(0);

//   const [viewGirlList, setViewGirlList] = useState<GirlType[]>([]);
//   const { resultData, showScore, setShowScore, setCurrentQuestion, setAnswerHistories, answerHistories, baseGirlDataList, loading } = useQuestionnaireContext();

//   const itemsPerPage = 10;
//   const endOffset = itemOffset + itemsPerPage;
//   const currentItems = viewGirlList.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(viewGirlList.length / itemsPerPage);

//   // 質問を最初からやり直す
//   const retryQuestion = () => {
//     setShowScore(false);
//     setCurrentQuestion(1);
//     setAnswerHistories([]);
//   };

//   useEffect(() => {
//     if (loading) {
//       return;
//     }

//     const score = {
//       '04': 3,
//       '07': 2,
//       '11': 1,
//       '43': 4,
//     }
//     const scoreKeys = Object.entries(score);

//     const countEarnPoint = (girl: GirlType) => {
//       let point = 0;
//       scoreKeys.forEach((kv) => {
//         point += girl.salespoint_ids.includes(kv[0]) ? kv[1] : 0;
//       });

//       return {
//         ...girl,
//         earn_point: point
//       };
//     };

//     const girlDataListWithPoint: GirlType[] = []
//     baseGirlDataList.forEach(girl => {
//       girlDataListWithPoint.push(countEarnPoint(girl))
//     })


//     girlDataListWithPoint.sort((a, b) => {

//       // ①当日出勤している
//       if (b.today_work_flg !== a.today_work_flg) {
//         return b.today_work_flg ? 1 : -1;
//       }

//       // ②チェック項目に一致している数が多い
//       if (b.earn_point !== a.earn_point) {
//         return b.earn_point - a.earn_point;
//       }

//       // ③写メ日記がある
//       if (b.diary_flg !== a.diary_flg) {
//         return b.diary_flg ? 1 : -1;
//       }

//       // ④口コミがある
//       if (b.review_flg !== a.review_flg) {
//         return b.review_flg ? 1 : -1;
//       }

//       // ⑤直近1週間以内に出勤予定がある。
//       return b.w_shukkin.filter(x => x !== null).length - a.w_shukkin.filter(x => x !== null).length;

//     })

//     setViewGirlList(girlDataListWithPoint);
//   }, [loading])

//   const handlePageClick = (event: { selected: number; }) => {
//     const newOffset = (event.selected * itemsPerPage) % viewGirlList.length;
//     setItemOffset(newOffset);
//   };



//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const paginationVariants = {
//     hidden: {
//       opacity: 0,
//       y: 200,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transiton: {
//         type: "spring",
//         stiffness: 260,
//         damping: 20,
//         duration: 2
//       }
//     }
//   }

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

//           <div className='w-full md:w-10/12'>


//             <div className='h-20 flex justify-center items-start'>
//               <motion.div
//                 variants={paginationVariants}
//                 initial="hidden"
//                 animate="visible">
//                 <ReactPaginate
//                   pageCount={pageCount}
//                   onPageChange={handlePageClick}
//                   containerClassName="flex justify-center space-x-2 mt-4 select-none"
//                   pageClassName="inline-block"
//                   pageLinkClassName="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none "
//                   previousLinkClassName="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
//                   nextLinkClassName="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
//                   activeLinkClassName="bg-indigo-600 text-white"
//                   disabledLinkClassName="opacity-50 cursor-not-allowed"
//                 />
//               </motion.div>
//             </div>


//             <div className='grid grid-cols-3 gap-4'>
//               {
//                 currentItems &&
//                 currentItems.map(({ id, name, catchphrase, w_shukkin, diary_flg, review_flg, earn_point, today_work_flg, picture_url }) => (
//                   <a
//                     key={id}
//                     href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//                     <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={picture_url} alt={name} />
//                     <div className="flex flex-col justify-between p-4 leading-normal">
//                       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
//                       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{catchphrase}</p>
//                     </div>
//                   </a>
//                 ))
//               }
//             </div>
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



