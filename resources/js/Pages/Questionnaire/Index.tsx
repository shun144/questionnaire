import { Head, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import NotFound from './NotFound';
import CountQuestion from './CountQuestion';
import RecommendScore from './score/RecommendScore';
import Header from './Header';
import Footer from './Footer';
import { useQuestionnaireStore } from './store';
import { getQuestionnairByUrl, getFirstQuestionIdByUrl } from './utils';
import axios from 'axios';
import { QuestionnarieType } from './types';

const Questionnaire = () => {

  const { flowUrl } = usePage().props;

  const { setQuestionnarieDatas, setCurrentQuestionnarie, currentQuestionnarie, setIsLoading, isLoading, setBaseGirlDataList, setisGirlsLoading, setFirstQuestionId } = useQuestionnaireStore();

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
        const res = await axios.get(`${flowUrl as string}/test`);
        setBaseGirlDataList(res.data.resultArray);
        setisGirlsLoading(false);
      } catch (error) {
        setisGirlsLoading(true);
      }
    })();
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
              {currentQuestionnarie.category === 'question' && <CountQuestion />}
              {currentQuestionnarie.category === 'result' && <RecommendScore />}
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


