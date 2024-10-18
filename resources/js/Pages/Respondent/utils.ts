import axios from 'axios';
import { QuestionnarieType, DbQuestionType, DbEdgeType, DbResultType } from './types';


export const getCityHeavenGirls = async () => {
  try {
    // console.log(flowUrl);
    const baseUrl = window.location.origin;
    const [_, owner, flowUrl] = window.location.pathname.split('/');

    const res = await axios.get(`${baseUrl}/${owner}/${flowUrl}/cityheaven`);


    // const res = await axios.get(`${flowUrl}/cityheaven`, {
    //   headers: {
    //     'Custom-Header': 'shun',
    //   }
    // });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error)
    return [];
  }
}



export const getFirstQuestionIdByUrl = async (flowUrl: string): Promise<string> => {
  const res = await axios.get<string>(`${flowUrl}/firstQuestionId`, {
    params: {
      flow_url: flowUrl
    }
  });
  return res.data;
}


export const getQuestionnairByUrl = async (flowUrl: string): Promise<QuestionnarieType[]> => {
  try {
    const res = await axios.get(`${flowUrl}/questionnaire`, {
      params: {
        flow_url: flowUrl
      }
    });

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