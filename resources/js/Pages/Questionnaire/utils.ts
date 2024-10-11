import axios from 'axios';
import { QuestionnarieType, DbQuestionType, DbEdgeType, DbResultType } from './types';

// export const sample = (board_id: number): QuestionnarieType[] => {

//   return [
//     {
//       id: "q-1",
//       topic: '太陽系で最も大きな惑星は？',
//       choices: [
//         {
//           id: "q-1-1",
//           content: "水星",
//           nextId: "q-2"
//         },
//         {
//           id: "q-1-2",
//           content: "金星",
//           nextId: "r-1"
//         },
//         {
//           id: "q-1-3",
//           content: "木星",
//           nextId: "q-2"
//         },
//       ]
//     },
//     {
//       id: "q-2",
//       topic: '次のうち、哺乳類ではない動物はどれですか？',
//       choices: [
//         {
//           id: "q-2-1",
//           content: "犬",
//           nextId: "q-3"
//         },
//         {
//           id: "q-2-2",
//           content: "猫",
//           nextId: "q-3"
//         },
//         {
//           id: "q-2-3",
//           content: "うさぎ",
//           nextId: "q-3"
//         },
//         {
//           id: "q-2-4",
//           content: "馬",
//           nextId: "q-3"
//         },
//         {
//           id: "q-2-5",
//           content: "亀",
//           nextId: "q-3"
//         },
//       ]
//     },
//     {
//       id: "q-3",
//       topic: '好きな季節はどれですか？',
//       choices: [
//         {
//           id: "q-3-1",
//           content: "春",
//           nextId: "r-1"
//         },
//         {
//           id: "q-3-2",
//           content: "夏",
//           nextId: "r-1"
//         },
//         {
//           id: "q-3-3",
//           content: "秋",
//           nextId: "r-1"
//         },
//         {
//           id: "q-3-4",
//           content: "冬",
//           nextId: "r-1"
//         },
//       ]
//     },
//     {
//       id: "r-1",
//       result: "あなたはAタイプです",
//       message: "孤独を感じ。",
//       img: "https://picsum.photos/id/237/200/300",
//       url: "https://shun-studio.com/"
//     }
//   ]
// }


// export const getQuestionnair = (board_id: number) => {

//   const getAsyncQuestionnair = async () => {
//     try {
//       const res = await axios.get('/questionnaire');
//       const questions: DbQuestionType[] = JSON.parse(res.data.questions);
//       const results: DbResultType[] = JSON.parse(res.data.results);
//       const edges: DbEdgeType[] = JSON.parse(res.data.edges);

//       const formattedQuestions: QuestionnarieType[] = questions.map((x) => {
//         return {
//           id: x.id,
//           topic: x.data.topic,
//           choices: x.data.choices.map(choice => {
//             return {
//               id: choice.id,
//               content: choice.content,
//               nextId: edges.find(edge => edge.sourceHandle === choice.id)?.targetHandle
//             }
//           })
//         }
//       })

//       const formattedResults: QuestionnarieType[] = results.map((x) => {
//         return {
//           id: x.id,
//           result: x.data.result,
//           message: x.data.message,
//           img: x.data.img,
//           url: x.data.url,
//         }
//       })
//       return [...formattedQuestions, ...formattedResults];
//     } catch (error) {
//       return [];
//     }
//   }

//   getAsyncQuestionnair();


// }


export const getQuestionnair = async (board_id: number): Promise<QuestionnarieType[]> => {
  try {
    const res = await axios.get('/questionnaire');

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
    return [];
  }
}