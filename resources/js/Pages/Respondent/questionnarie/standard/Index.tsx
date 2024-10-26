import { Head, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import NotFinished from '../components/NotFinished';
import StandardQuestion from './StandardQuestion';
import StandardResult from './StandardResult';
import { Header, Footer } from '../../components/Index';
import { useRespondentStore } from '../../store';
import { QuestionnarieType, DbQuestionType, DbResultType, DbEdgeType } from '../../types';


type Props = {
  ownerName: string;
  title: string;
  questions: string;
  results: string;
  edges: string;
  firstQuestionId: string;
}

const Questionnaire = ({ ownerName, title, questions, results, edges, firstQuestionId }: Props) => {

  const setQuestionnarieDatas = useRespondentStore((state) => state.setQuestionnarieDatas);
  const setCurrentQuestionnarie = useRespondentStore((state) => state.setCurrentQuestionnarie);
  const currentQuestionnarie = useRespondentStore((state) => state.currentQuestionnarie);
  const setFirstQuestionId = useRespondentStore((state) => state.setFirstQuestionId);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
            salesPoints: [],
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

      <div className='w-screen min-h-screen h-screen flex flex-col md:overflow-x-hidden'>

        <Header title={title} />

        <div className=' bg-slate-100 grow'>
          {!isLoading && (
            <>
              {currentQuestionnarie.category === 'question' && <StandardQuestion />}
              {currentQuestionnarie.category === 'result' && <StandardResult />}
              {currentQuestionnarie.category === 'none' && <NotFinished />}
            </>
          )}
        </div>

        <Footer ownerName={ownerName} />
      </div>
    </>
  );
}

export default memo(Questionnaire);




