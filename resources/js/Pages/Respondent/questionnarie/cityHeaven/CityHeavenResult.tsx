import { memo, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useRespondentStore } from '../../store';
import { fetchGirls, } from '../../utils';
import 'react-responsive-pagination/themes/classic.css';
import './cityHeavenResult.css';

import DataLoader from './DataLoader';
import { Loadable } from './Loadable';
import Skelton from './Skelton';

const CityHeavenResult = () => {
  const answerHistories = useRespondentStore((state) => state.answerHistories);
  const [girlsData] = useState(() => new Loadable(fetchGirls(answerHistories)));

  return (
    <>
      <Suspense fallback={<Skelton />}>
        <DataLoader girlsLoadData={girlsData} />
      </Suspense>
    </>
  );
}
export default memo(CityHeavenResult);



















// import { memo, useCallback, useEffect, useMemo, useState } from 'react'

// import { GirlType, ResultType } from '../../types';
// import { useRespondentStore } from '../../store';
// import { getCityHeavenGirls, } from '../../utils';
// import ReactPaginate from 'react-paginate';
// import { MdOutlineRestartAlt } from "react-icons/md";
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
// import { motion } from "framer-motion";
// import { getDummyGirlsList } from './dummyGirlsList'
// import ResponsivePagination from 'react-responsive-pagination';
// import 'react-responsive-pagination/themes/classic.css';
// import './cityHeavenResult.css';


// const CityHeavenResult = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewGirlList, setViewGirlList] = useState<GirlType[]>([]);
//   const [currentItems, setCurrentItems] = useState<GirlType[]>([]);
//   const [totalPages, setTotalPages] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const answerHistories = useRespondentStore((state) => state.answerHistories);
//   const reset = useRespondentStore((state) => state.reset);
//   const baseGirlDataList = useRespondentStore((state) => state.baseGirlDataList);
//   const setBaseGirlDataList = useRespondentStore((state) => state.setBaseGirlDataList);
//   const currentQuestionnarie = useRespondentStore((state) => state.currentQuestionnarie);

//   const paginationVariants = useMemo(() => ({
//     hidden: { opacity: 0, y: 200, },
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
//   }), [])

//   const peoplePerPage = 10;

//   useEffect(() => {
//     setCurrentItems(viewGirlList.slice((currentPage - 1) * peoplePerPage, currentPage * peoplePerPage));
//   }, [viewGirlList, currentPage])


//   useEffect(() => {
//     const dummy = getDummyGirlsList();
//     setBaseGirlDataList(dummy);

//     // (async () => {
//     //   try {
//     //     const res = await getCityHeavenGirls();
//     //     setBaseGirlDataList(res.resultArray);
//     //   } catch (error) {
//     //     // setisGirlsLoading(true);
//     //   }
//     // })();
//   }, []);

//   useEffect(() => {

//     if (baseGirlDataList.length < 0) {
//       return;
//     }

//     // 各選択肢に設定されているセールスポイントの集計
//     const score: { [key: string]: number } = {};
//     answerHistories.map(x => x.salesPointNos).forEach(x => {
//       x.forEach(item => {
//         if (score[item]) {
//           score[item]++;
//         } else {
//           score[item] = 1;
//         }
//       });
//     })

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

//     const girlDataListWithPoint: GirlType[] = [];
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
//     setTotalPages(Math.ceil(girlDataListWithPoint.length / peoplePerPage));
//     setIsLoading(false);
//   }, [baseGirlDataList])

//   const handlePageChange = useCallback((page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({
//       top: 0,
//       behavior: "instant",
//     });
//   }, [setCurrentPage])


//   return (
//     <>
//       {isLoading ?
//         <Skelton />
//         :
//         <div className='h-full w-full flex flex-col justify-start items-center'>
//           <div className='w-full h-12 flex flex-col justify-center items-center my-2 px-2 md:min-h-20 md:max-h-20' >
//             <div className=' text-slate-700 font-bold text-md md:text-3xl'>
//               {(currentQuestionnarie as ResultType).message}
//             </div>
//           </div>

//           <div className='w-full px-1 md:w-11/12'>
//             <div className='grid mb-4 grid-cols-2 gap-x-3 gap-y-4
//           md:mb-10 md:grid-cols-5 md:gap-x-6 md:gap-y-8'>
//               {
//                 currentItems &&
//                 currentItems.map(({ id, name, catchphrase, w_shukkin, diary_flg, review_flg, earn_point, today_work_flg, picture_url, mypage_url, bwh }, idx) => (

//                   <div
//                     key={id}
//                     className="flex flex-col items-center bg-white border  border-gray-200 rounded-lg shadow relative
//                   pt-2 px-1
//                   md:max-w-xl md:pt-4 md:px-2"
//                   >
//                     <div className='absolute -top-2 -left-1 md:-top-3 md:-left-3'>
//                       <div className={`${idx + 1 + (currentPage - 1) * 10 <= 3 ? "bg-amber-400" : "bg-violet-300"} rounded-full shadow flex justify-center items-center border-2 md:border-4 border-slate-100 w-6 h-6 md:w-10 md:h-10`}>
//                         <div className='text-white text-sm md:text-xl md:font-semibold'>{idx + 1 + (currentPage - 1) * 10}</div>
//                       </div>
//                     </div>

//                     <div className='rounded-lg pb-2'>
//                       <img className={`${idx + 1 + (currentPage - 1) * 10 <= 3 ? "border-yellow-200" : "border-violet-100"}  rounded-lg border-4 shadow-xl object-cover h-36 md:h-60`}
//                         src={picture_url} alt={name} />
//                     </div>

//                     <div className="w-full flex flex-col justify-between leading-normal">
//                       <div className="font-bold tracking-tight text-gray-900 text-md md:text-xl">
//                         {name}
//                       </div>
//                       <div className="font-normal text-gray-700 pb-1 min-h-8 md:pb-2 md:min-h-12 ">
//                         <div className='text-sm md:text-lg'>{catchphrase}</div>
//                         <div className='text-sm md:text-md'>{`(B:${bwh[0]} W:${bwh[1]} H:${bwh[2]})`}</div>
//                       </div>

//                       <div className="w-full flex justify-end items-center md:min-h-7">
//                         <a className="block px-2 py-2 underline text-end text-violet-500 text-sm md:text-md md:cursor-pointer md:trainstion-all md:duration-200 hover:text-violet-300"
//                           target="_blank"
//                           href={mypage_url}>女の子のマイページ
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               }
//             </div>

//             <div className='w-full flex justify-center items-start h-14 mb-3 md:h-20 md:mb-4'>
//               <motion.div
//                 variants={paginationVariants}
//                 initial="hidden"
//                 animate="visible">
//                 <ResponsivePagination
//                   current={currentPage}
//                   total={totalPages}
//                   onPageChange={handlePageChange}
//                   maxWidth={350}
//                   className="pagination select-none md:flex md:space-x-2"
//                 />
//               </motion.div>
//             </div>

//             <div className="w-full flex justify-center items-center mb-4 md:mb-10">
//               <button
//                 className='bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3'
//                 onClick={() => reset()} >
//                 <MdOutlineRestartAlt className='text-2xl' />
//                 <p>もう一度最初から始める</p>
//               </button>
//             </div>
//           </div>
//         </div >
//       }
//     </>
//   );
// }
// export default memo(CityHeavenResult);


// const Skelton = () => {
//   return (

//     <div className="h-full w-full flex flex-col justify-start items-center animate-pulse">

//       <div className='w-full flex flex-col justify-center items-center my-2 px-2 gap-y-4 mb-4 md:min-h-20 md:max-h-20' >
//         <div className=' text-slate-700 font-bold text-md md:text-3xl'>
//           診断結果集計中...
//         </div>
//       </div>
//       <div role="status" className=' grid mb-4 grid-cols-2 gap-x-3 gap-y-4  md:mb-10 md:grid-cols-5 md:gap-x-6 md:gap-y-8'>
//         {[...Array(10)].map(() => (
//           <div className=" bg-slate-300 rounded-md w-36 h-44 md:w-64 md:h-80" />
//         ))}
//       </div>
//     </div>
//   );
// }

