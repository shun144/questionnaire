import { Head } from '@inertiajs/react'
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import Score from './Score';
import Question from './Question';
import Header from './Header';
import Footer from './Footer';
import QuestionnaireProvider from './QuestionnaireProvider';

const Questionnaire = () => {
  return (
    <>
      <Head title="quize" />

      <div className='w-screen h-screen overflow-auto bg-amber-50'>

        {/* ヘッダー */}
        <div className='h-[5%] min-h-[45px]'>
          <Header />
        </div>

        {/* コンテンツ */}
        {/* <div className='h-[90%] min-h-[800px]'> */}
        <div className='h-[90%] min-h-[600px] md:min-h-[800px]'>
          <QuestionnaireProvider>
            <Question />
            <Score />
          </QuestionnaireProvider>
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
