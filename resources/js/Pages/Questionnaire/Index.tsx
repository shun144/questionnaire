import { Head } from '@inertiajs/react'
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import GenericScore from './score/GenericScore';
import Question from './Question';
import Header from './Header';
import Footer from './Footer';
import { useQuestionnaireStore } from './store';
import { getQuestionnair } from './utils';
import NotFound from './NotFound';
// import QuestionnaireProvider from './QuestionnaireProvider';

const Questionnaire = () => {

  const { setQuestionnarieDatas, setCurrentQuestionnarie, setIsLoading, isLoading } = useQuestionnaireStore();
  useEffect(() => {

    (async () => {
      try {
        const res = await getQuestionnair(1);
        setQuestionnarieDatas(res);
        setCurrentQuestionnarie("e89b857d-0f54-4569-9500-72a1c943691f");
        setIsLoading(false);
      } catch (error) {
      }
    })();



  }, []);


  return (
    <>
      <Head title="quize" />

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
              <Question />
              <GenericScore />
              <NotFound />
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
