import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
// import { QuestionnarieType, DbQuestionType, DbEdgeType, DbResultType, GirlType, AnswerHistoryType } from './types';

// interface GirlsResponse {
//   girlsData: GirlType[];
// }


// export const fetchGirls = async (answerHistories: AnswerHistoryType[]): Promise<GirlType[]> => {
//   try {
//     const baseUrl = window.location.origin;
//     const [_, owner, flowUrl] = window.location.pathname.split('/');
//     const res: AxiosResponse<GirlsResponse> = await axios.get(`${baseUrl}/${owner}/${flowUrl}/cityheaven`);
//     const girlsData: GirlType[] = res.data.girlsData;

//     // 各選択肢に設定されているセールスポイントの集計
//     const score: { [key: string]: number } = {};
//     answerHistories.map(x => x.salesPointNos).forEach(x => {
//       x.forEach(item => {
//         if (score[item]) {
//           score[item]++;
//         } else {
//           score[item] = 1;
//         }
//       });
//     })

//     const scoreKeys = Object.entries(score);

//     const girlsDataWithPoint: GirlType[] = [];
//     girlsData.forEach(girl => {
//       girlsDataWithPoint.push(countEarnPoint(girl))
//     })

//     function countEarnPoint(girl: GirlType) {
//       let point = 0;
//       scoreKeys.forEach((kv) => {
//         point += girl.salespoint_ids.includes(kv[0]) ? kv[1] : 0;
//       });
//       return { ...girl, earn_point: point };
//     };

//     girlsDataWithPoint.sort((a, b) => {

//       // ①当日出勤している
//       if (b.today_work_flg !== a.today_work_flg) {
//         return b.today_work_flg ? 1 : -1;
//       }

//       // ②チェック項目に一致している数が多い
//       if (b.earn_point !== a.earn_point) {
//         return b.earn_point - a.earn_point;
//       }

//       // ③写メ日記がある
//       if (b.diary_flg !== a.diary_flg) {
//         return b.diary_flg ? 1 : -1;
//       }

//       // ④口コミがある
//       if (b.review_flg !== a.review_flg) {
//         return b.review_flg ? 1 : -1;
//       }

//       // ⑤直近1週間以内に出勤予定がある。
//       return b.w_shukkin.filter(x => x !== null).length - a.w_shukkin.filter(x => x !== null).length;
//     })

//     return girlsDataWithPoint;
//   } catch (error) {
//     return [];
//   }
// }

export const countUpAchievement = async (pathname: string, result: string): Promise<void> => {
  (async () => {
    await axios.post(pathname, { result });
  })();
}

// export const fetchGirls = () => {
//   const baseUrl = window.location.origin;
//   const [_, owner, flowUrl] = window.location.pathname.split('/');

//   // const options: AxiosRequestConfig = {
//   //   baseURL: baseUrl,
//   //   url: `/${owner}/${flowUrl}/cityheaven`,
//   //   method: "GET",
//   // };

//   // const res = axios(options);

//   // const res = axios.get<string, GirlType[]>(`${baseUrl}/${owner}/${flowUrl}/cityheaven`);

//   // console.log(res.data);
//   return res;
// }



// export const getCityHeavenGirls = async () => {
//   try {
//     // console.log(flowUrl);
//     const baseUrl = window.location.origin;
//     const [_, owner, flowUrl] = window.location.pathname.split('/');

//     const res = await axios.get(`${baseUrl}/${owner}/${flowUrl}/cityheaven`);


//     // const res = await axios.get(`${flowUrl}/cityheaven`, {
//     //   headers: {
//     //     'Custom-Header': 'shun',
//     //   }
//     // });
//     console.log(res.data);
//     return res.data;
//   } catch (error) {
//     console.log(error)
//     return [];
//   }
// }






// export const getFirstQuestionIdByUrl = async (flowUrl: string): Promise<string> => {
//   const res = await axios.get<string>(`${flowUrl}/firstQuestionId`, {
//     params: {
//       flow_url: flowUrl
//     }
//   });
//   return res.data;
// }


// export const getQuestionnairByUrl = async (flowUrl: string): Promise<QuestionnarieType[]> => {
//   try {
//     const res = await axios.get(`${flowUrl}/questionnaire`, {
//       params: {
//         flow_url: flowUrl
//       }
//     });

//     const questions: DbQuestionType[] = JSON.parse(res.data.questions);
//     const results: DbResultType[] = JSON.parse(res.data.results);
//     const edges: DbEdgeType[] = JSON.parse(res.data.edges);


//     const formattedQuestions: QuestionnarieType[] = questions.map((x) => {
//       return {
//         id: x.id,
//         topic: x.data.topic,
//         choices: x.data.choices.map(choice => {
//           return {
//             id: choice.id,
//             content: choice.content,
//             salesPoints: choice.salePoints,
//             nextId: edges.find(edge => edge.sourceHandle === choice.id)?.targetHandle
//           }
//         }),
//         category: 'question',
//       }
//     })

//     const formattedResults: QuestionnarieType[] = results.map((x) => {
//       return {
//         id: x.id,
//         result: x.data.result,
//         message: x.data.message,
//         img: x.data.img,
//         url: x.data.url,
//         category: 'result',
//       }
//     })

//     return [...formattedQuestions, ...formattedResults];


//   } catch (error) {
//     console.log(error)
//     return [];
//   }
// }