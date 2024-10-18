import { Head, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import NotFound from '../components/NotFound';
import CityHeavenQuestion from './CityHeavenQuestion';
import CityHeavenResult from './CityHeavenResult';
import { Header, Footer } from '../../components/Index';
import { useRespondentStore } from '../../store';
import { QuestionnarieType, DbQuestionType, DbResultType, DbEdgeType } from '../../types';
// import { getQuestionnairByUrl, getFirstQuestionIdByUrl, getCityHeavenGirls, } from '../../utils';

type Props = {
  ownerName: string;
  title: string;
  questions: string;
  results: string;
  edges: string;
  firstQuestionId: string;
}


const Questionnaire = ({ ownerName, title, questions, results, edges, firstQuestionId }: Props) => {

  // const { flowUrl } = usePage().props;

  const setQuestionnarieDatas = useRespondentStore((state) => state.setQuestionnarieDatas);
  const setCurrentQuestionnarie = useRespondentStore((state) => state.setCurrentQuestionnarie);
  const currentQuestionnarie = useRespondentStore((state) => state.currentQuestionnarie);
  const setIsLoading = useRespondentStore((state) => state.setIsLoading);
  const isLoading = useRespondentStore((state) => state.isLoading);
  const setBaseGirlDataList = useRespondentStore((state) => state.setBaseGirlDataList);
  const setisGirlsLoading = useRespondentStore((state) => state.setisGirlsLoading);
  const setFirstQuestionId = useRespondentStore((state) => state.setFirstQuestionId);


  useEffect(() => {

    const parsedQuestions: DbQuestionType[] = JSON.parse(questions);
    const parsedResults: DbResultType[] = JSON.parse(results);
    const parsedEdges: DbEdgeType[] = JSON.parse(edges);

    const formattedQuestions: QuestionnarieType[] = parsedQuestions.map((x) => {
      return {
        id: x.id,
        topic: x.data.topic,
        choices: x.data.choices.map(choice => {
          return {
            id: choice.id,
            content: choice.content,
            salesPoints: choice.salePoints,
            nextId: parsedEdges.find(edge => edge.sourceHandle === choice.id)?.targetHandle
          }
        }),
        category: 'question',
      }
    })

    const formattedResults: QuestionnarieType[] = parsedResults.map((x) => {
      return {
        id: x.id,
        result: x.data.result,
        message: x.data.message,
        img: x.data.img,
        url: x.data.url,
        category: 'result',
      }
    })
    setQuestionnarieDatas([...formattedQuestions, ...formattedResults]);
    setFirstQuestionId(firstQuestionId);
    setCurrentQuestionnarie(firstQuestionId);
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head title="診断" />

      <div className='w-screen min-h-screen h-screen flex flex-col'>

        <Header title={title} />

        <div className=' bg-slate-100 md:grow'>
          {!isLoading && (
            <>
              {currentQuestionnarie.category === 'question' && <CityHeavenQuestion />}
              {currentQuestionnarie.category === 'result' && <CityHeavenResult />}
              {currentQuestionnarie.category === 'none' && <NotFound />}
            </>
          )}
        </div>

        <Footer ownerName={ownerName} />
      </div>
    </>
  );

  // return (
  //   <>
  //     <Head title="診断" />

  //     <div className='w-screen h-screen overflow-auto bg-amber-50'>

  //       <div className='h-[5%] min-h-[45px]'>
  //         <Header />
  //       </div>

  //       <div className='min-h-[550px] md:min-h-[800px]'>
  //         {!isLoading && (
  //           <>
  //             {currentQuestionnarie.category === 'question' && <CityHeavenQuestion />}
  //             {currentQuestionnarie.category === 'result' && <CityHeavenResult />}
  //             {currentQuestionnarie.category === 'none' && <NotFound />}
  //           </>
  //         )}
  //       </div>

  //       <div className='h-[5%] min-h-[45px] '>
  //         <Footer />
  //       </div>
  //     </div>
  //   </>
  // );
}

export default memo(Questionnaire);






// import { Head, usePage } from '@inertiajs/react'
// import { useEffect, useRef, useState, memo, useCallback } from 'react';
// import NotFound from '../components/NotFound';
// import CityHeavenQuestion from './CityHeavenQuestion';
// import CityHeavenResult from './CityHeavenResult';
// import { Header, Footer } from '../../components/Index';
// import { useRespondentStore } from '../../store';
// import { QuestionnarieType } from '../../types';
// import { getQuestionnairByUrl, getFirstQuestionIdByUrl, getCityHeavenGirls } from '../../utils';
// import axios from 'axios';

// const Questionnaire = () => {

//   const { flowUrl } = usePage().props;

//   const { setQuestionnarieDatas, setCurrentQuestionnarie, currentQuestionnarie, setIsLoading, isLoading, setBaseGirlDataList, setisGirlsLoading, setFirstQuestionId } = useRespondentStore();


//   useEffect(() => {
//     (async () => {
//       try {
//         const axiosFirstQuestionId = getFirstQuestionIdByUrl(flowUrl as string);
//         const axiosQuestionnair = getQuestionnairByUrl(flowUrl as string);
//         const [firstQuestionId, questionnair] = await Promise.all([axiosFirstQuestionId, axiosQuestionnair]);

//         setQuestionnarieDatas(questionnair);
//         setFirstQuestionId(firstQuestionId);
//         setCurrentQuestionnarie(firstQuestionId);
//         setIsLoading(false);
//       } catch (error) {
//       }
//     })();

//     (async () => {
//       try {
//         const res = await getCityHeavenGirls(flowUrl as string);
//         setBaseGirlDataList(res.resultArray);
//         setisGirlsLoading(false);
//       } catch (error) {
//         setisGirlsLoading(true);
//       }
//     })();

//     // (async () => {
//     //   try {
//     //     const res = await axios.get(`${flowUrl as string}/cityheaven`);
//     //     setBaseGirlDataList(res.data.resultArray);
//     //     setisGirlsLoading(false);
//     //   } catch (error) {
//     //     setisGirlsLoading(true);
//     //   }
//     // })();

//   }, []);

//   return (
//     <>
//       <Head title="診断" />

//       <div className='w-screen h-screen overflow-auto bg-amber-50'>

//         {/* ヘッダー */}
//         <div className='h-[5%] min-h-[45px]'>
//           <Header />
//         </div>

//         {/* コンテンツ */}
//         {/* <div className='h-[90%] min-h-[550px] md:min-h-[800px]'> */}
//         <div className='min-h-[550px] md:min-h-[800px]'>
//           {!isLoading && (
//             <>
//               {currentQuestionnarie.category === 'question' && <CityHeavenQuestion />}
//               {currentQuestionnarie.category === 'result' && <CityHeavenResult />}
//               {currentQuestionnarie.category === 'none' && <NotFound />}
//             </>
//           )}
//         </div>

//         {/* フッター */}
//         <div className='h-[5%] min-h-[45px] '>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default memo(Questionnaire);


