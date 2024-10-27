import { Loadable } from "./Loadable";
import { GirlType, ResultType } from '../../types';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRespondentStore } from "../../store";
import { MdOutlineRestartAlt } from "react-icons/md";
import ResponsivePagination from 'react-responsive-pagination';
import { motion } from "framer-motion";
type Props = {
  girlsLoadData: Loadable<GirlType[]>;
}
const peoplePerPage = 10;

const DataLoader = ({ girlsLoadData }: Props) => {
  const girlsData = girlsLoadData.getOrThrow();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<GirlType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const reset = useRespondentStore((state) => state.reset);
  const currentQuestionnarie = useRespondentStore((state) => state.currentQuestionnarie);

  useEffect(() => {
    setTotalPages(Math.ceil(girlsData.length / peoplePerPage));
  }, [girlsData])

  useEffect(() => {
    setCurrentItems(girlsData.slice((currentPage - 1) * peoplePerPage, currentPage * peoplePerPage));
  }, [currentPage])

  const paginationVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 200, },
    visible: {
      opacity: 1,
      y: 0,
      transiton: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2
      }
    }
  }), [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  return (
    <>
      <div className='h-full w-full flex flex-col justify-start items-center'>
        <div className='w-full h-12 flex flex-col justify-center items-center my-2 px-2 md:min-h-20 md:max-h-20' >
          <div className=' text-slate-700 font-bold text-md md:text-3xl'>
            {(currentQuestionnarie as ResultType).message}
          </div>
        </div>

        <div className='w-full px-1 md:w-11/12'>
          <div className='grid mb-4 grid-cols-2 gap-x-3 gap-y-4
          md:mb-10 md:grid-cols-5 md:gap-x-6 md:gap-y-8'>
            {
              currentItems &&
              currentItems.map(({ id, name, catchphrase, w_shukkin, diary_flg, review_flg, earn_point, today_work_flg, picture_url, mypage_url, bwh }, idx) => (

                <div
                  key={id}
                  className="flex flex-col items-center bg-white border  border-gray-200 rounded-lg shadow relative 
                  pt-2 px-1
                  md:max-w-xl md:pt-4 md:px-2"
                >
                  <div className='absolute -top-2 -left-1 md:-top-3 md:-left-3'>
                    <div className={`${idx + 1 + (currentPage - 1) * 10 <= 3 ? "bg-amber-400" : "bg-violet-300"} rounded-full shadow flex justify-center items-center border-2 md:border-4 border-slate-100 w-6 h-6 md:w-10 md:h-10`}>
                      <div className='text-white text-sm md:text-xl md:font-semibold'>{idx + 1 + (currentPage - 1) * 10}</div>
                    </div>
                  </div>

                  <div className='rounded-lg pb-2'>
                    <img className={`${idx + 1 + (currentPage - 1) * 10 <= 3 ? "border-yellow-200" : "border-violet-100"}  rounded-lg border-4 shadow-xl object-cover h-36 md:h-60`}
                      src={picture_url} alt={name} />
                  </div>

                  <div className="w-full flex flex-col justify-between leading-normal">
                    <div className="font-bold tracking-tight text-gray-900 text-md md:text-xl">
                      {name}
                    </div>
                    <div className="font-normal text-gray-700 pb-1 min-h-8 md:pb-2 md:min-h-12 ">
                      <div className='text-sm md:text-lg'>{catchphrase}</div>
                      <div className='text-sm md:text-md'>{`(B:${bwh[0]} W:${bwh[1]} H:${bwh[2]})`}</div>
                    </div>

                    <div className="w-full flex justify-end items-center md:min-h-7">
                      <a className="block px-2 py-2 underline text-end text-violet-500 text-sm md:text-md md:cursor-pointer md:trainstion-all md:duration-200 hover:text-violet-300"
                        target="_blank"
                        href={mypage_url}>女の子のマイページ
                      </a>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className='w-full flex justify-center items-start h-14 mb-3 md:h-20 md:mb-4'>
            <motion.div
              variants={paginationVariants}
              initial="hidden"
              animate="visible">
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
                maxWidth={350}
                className="pagination select-none md:flex md:space-x-2"
              />
            </motion.div>
          </div>

          <div className="w-full flex justify-center items-center mb-4 md:mb-10">
            <button
              className='bg-violet-500 hover:bg-violet-600 text-white font-bold rounded flex justify-center items-center gap-1 shadow-2xl trasiton-all duration-200  text-sm py-2 px-2 md:text-xl md:px-3'
              onClick={() => reset()} >
              <MdOutlineRestartAlt className='text-2xl' />
              <p>もう一度最初から始める</p>
            </button>
          </div>
        </div>
      </div >
    </>
  );
};

export default DataLoader;

