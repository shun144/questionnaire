import axios from 'axios';
import { QuestionnarieType, DbQuestionType, DbEdgeType, DbResultType } from './types';

export const getFirstQuestionIdByUrl = async (flowUrl: string): Promise<string> => {
  const res = await axios.get<string>(`/aaa/${flowUrl}/firstQuestionId`, {
    params: {
      flow_url: flowUrl
    }
  });
  return res.data;
}


export const getQuestionnairByUrl = async (flowUrl: string): Promise<QuestionnarieType[]> => {
  try {

    const res = await axios.get(`/aaa/${flowUrl}/questionnaire`, {
      params: {
        flow_url: flowUrl
      }
    });

    // const res = await axios.get(`/${flowUrl}/questionnaire`, {
    //   params: {
    //     flow_url: flowUrl
    //   }
    // });

    const questions: DbQuestionType[] = JSON.parse(res.data.questions);
    const results: DbResultType[] = JSON.parse(res.data.results);
    const edges: DbEdgeType[] = JSON.parse(res.data.edges);


    const formattedQuestions: QuestionnarieType[] = questions.map((x) => {
      return {
        id: x.id,
        topic: x.data.topic,
        choices: x.data.choices.map(choice => {
          return {
            id: choice.id,
            content: choice.content,
            salesPoints: choice.salePoints,
            nextId: edges.find(edge => edge.sourceHandle === choice.id)?.targetHandle
          }
        }),
        category: 'question',
      }
    })

    const formattedResults: QuestionnarieType[] = results.map((x) => {
      return {
        id: x.id,
        result: x.data.result,
        message: x.data.message,
        img: x.data.img,
        url: x.data.url,
        category: 'result',
      }
    })

    return [...formattedQuestions, ...formattedResults];


  } catch (error) {
    console.log(error)
    return [];
  }
}