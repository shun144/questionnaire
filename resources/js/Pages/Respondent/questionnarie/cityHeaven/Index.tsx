import { Head, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import NotFound from '../components/NotFound';
import CityHeavenQuestion from './CityHeavenQuestion';
import CityHeavenResult from './CityHeavenResult';
import { Header, Footer } from '../../components/Index';
import { useRespondentStore } from '../../store';
import { QuestionnarieType } from '../../types';
import { getQuestionnairByUrl, getFirstQuestionIdByUrl, getCityHeavenGirls } from '../../utils';
import axios from 'axios';

const Questionnaire = () => {

  const { flowUrl } = usePage().props;

  const { setQuestionnarieDatas, setCurrentQuestionnarie, currentQuestionnarie, setIsLoading, isLoading, setBaseGirlDataList, setisGirlsLoading, setFirstQuestionId } = useRespondentStore();


  useEffect(() => {
    (async () => {
      try {
        const axiosFirstQuestionId = getFirstQuestionIdByUrl(flowUrl as string);
        const axiosQuestionnair = getQuestionnairByUrl(flowUrl as string);
        const [firstQuestionId, questionnair] = await Promise.all([axiosFirstQuestionId, axiosQuestionnair]);

        setQuestionnarieDatas(questionnair);
        setFirstQuestionId(firstQuestionId);
        setCurrentQuestionnarie(firstQuestionId);
        setIsLoading(false);
      } catch (error) {
      }
    })();

    (async () => {
      try {
        const res = await getCityHeavenGirls(flowUrl as string);
        setBaseGirlDataList(res.resultArray);
        setisGirlsLoading(false);
      } catch (error) {
        setisGirlsLoading(true);
      }
    })();

    // (async () => {
    //   try {
    //     const res = await axios.get(`${flowUrl as string}/cityheaven`);
    //     setBaseGirlDataList(res.data.resultArray);
    //     setisGirlsLoading(false);
    //   } catch (error) {
    //     setisGirlsLoading(true);
    //   }
    // })();

  }, []);

  return (
    <>
      <Head title="診断" />

      <div className='w-screen h-screen overflow-auto bg-amber-50'>

        {/* ヘッダー */}
        <div className='h-[5%] min-h-[45px]'>
          <Header />
        </div>

        {/* コンテンツ */}
        {/* <div className='h-[90%] min-h-[550px] md:min-h-[800px]'> */}
        <div className='min-h-[550px] md:min-h-[800px]'>
          {!isLoading && (
            <>
              {currentQuestionnarie.category === 'question' && <CityHeavenQuestion />}
              {currentQuestionnarie.category === 'result' && <CityHeavenResult />}
              {currentQuestionnarie.category === 'none' && <NotFound />}
            </>
          )}
        </div>

        {/* フッター */}
        <div className='h-[5%] min-h-[45px] '>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default memo(Questionnaire);


