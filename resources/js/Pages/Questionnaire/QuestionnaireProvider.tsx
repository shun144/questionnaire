// import {
//   useState, createContext, ReactNode, Dispatch,
//   SetStateAction, useContext, useEffect
// } from 'react';
// import { AnswerHistoryType, } from './types';
// import { getQuestionnair } from './utils';
// import { QuestionNodeType, ResultNodeType, GirlType } from '../Quize/types';
// import axios, { AxiosResponse } from 'axios';

// type Props = {
//   children: ReactNode
// }




// type ChoiceType = {
//   id: string;
//   content: string;
//   next?: string;
// }

// type QuestionType = {
//   id: string;
//   topic: string;
//   choices: ChoiceType[];
// }


// type ResultType = {
//   id: string;
//   result: string;
//   message?: string;
//   img?: string;
//   url?: string;
// }

// // type QuestionnarieFlowType = {
// //   currentId: string;
// //   nextId?: string;
// //   nextCategory: 'question' | 'result';
// // }

// // const questionnarieFlow = [
// //   {
// //     id: "q-1"
// //   }
// // ]

// type QuestionnarieType = (QuestionType | ResultType);

// const questionnarieData: QuestionnarieType[] = [
//   {
//     id: "q-1",
//     topic: '太陽系で最も大きな惑星は？',
//     choices: [
//       {
//         id: "q-1-1",
//         content: "水星",
//         next: "q-2"
//       },
//       {
//         id: "q-1-2",
//         content: "金星",
//         next: "q-2"
//       },
//       {
//         id: "q-1-3",
//         content: "木星",
//         next: "q-2"
//       },
//     ]
//   },
//   {
//     id: "q-2",
//     topic: '次のうち、哺乳類ではない動物はどれですか？',
//     choices: [
//       {
//         id: "q-2-1",
//         content: "犬",
//         next: "q-3"
//       },
//       {
//         id: "q-2-2",
//         content: "猫",
//         next: "q-3"
//       },
//       {
//         id: "q-2-3",
//         content: "うさぎ",
//         next: "q-3"
//       },
//       {
//         id: "q-2-4",
//         content: "馬",
//         next: "q-3"
//       },
//       {
//         id: "q-2-5",
//         content: "亀",
//         next: "q-3"
//       },
//     ]
//   },
//   {
//     id: "q-3",
//     topic: '好きな季節はどれですか？',
//     choices: [
//       {
//         id: "q-3-1",
//         content: "春",
//         next: "r-1"
//       },
//       {
//         id: "q-3-2",
//         content: "夏",
//         next: "r-1"
//       },
//       {
//         id: "q-3-3",
//         content: "秋",
//         next: "r-1"
//       },
//       {
//         id: "q-3-4",
//         content: "冬",
//         next: "r-1"
//       },
//     ]
//   },
//   {
//     id: "r-1",
//     result: "あなたはAタイプです",
//     message: "孤独を感じ。",
//     img: "https://picsum.photos/id/237/200/300",
//     url: "https://shun-studio.com/"
//   }
// ]

// // const resultData: ResultType[] = [
// //   {
// //     id: "1",
// //     result: "あなたはAタイプです",
// //     message: "孤独を感じ。",
// //     img: "https://picsum.photos/id/237/200/300",
// //     url: "https://shun-studio.com/"
// //   }
// // ]


// // const questionData: QuestionNodeType[] = [
// //   {
// //     id: "1",
// //     topic: '太陽系で最も大きな惑星は？',
// //     choices: [
// //       {
// //         id: "1-1",
// //         content: "水星"
// //       },
// //       {
// //         id: "1-2",
// //         content: "金星aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
// //       },
// //       {
// //         id: "1-3",
// //         content: "木星"
// //       },
// //     ]
// //   },
// //   {
// //     id: "2",
// //     topic: '次のうち、哺乳類ではない動物はどれですかaaaabbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa？',
// //     choices: [
// //       {
// //         id: "2-1",
// //         content: "犬"
// //       },
// //       {
// //         id: "2-2",
// //         content: "猫"
// //       },
// //       {
// //         id: "2-3",
// //         content: "うさぎ"
// //       },
// //       {
// //         id: "2-4",
// //         content: "馬"
// //       },
// //       {
// //         id: "2-5",
// //         content: "亀"
// //       },
// //     ]
// //   },
// //   {
// //     id: "3",
// //     topic: '好きな季節はどれですか？',
// //     choices: [
// //       {
// //         id: "3-1",
// //         content: "春"
// //       },
// //       {
// //         id: "3-2",
// //         content: "夏"
// //       },
// //       {
// //         id: "3-3",
// //         content: "秋"
// //       },
// //       {
// //         id: "3-4",
// //         content: "冬"
// //       },
// //     ]
// //   }
// // ]

// // const resultData: ResultNodeType[] = [
// //   {
// //     result_no: "1",
// //     result: "あなたはAタイプです",
// //     message: "孤独を感じながらも自分というものをしっかりと持ち続けているあなたは氷元素の祝福を受けるのにふさわしい人物です。自分なりの信念を持つのは難しいことですが、あなたにはそれができているみたいです。周囲から完全に理解されることは難しいかもしれませんが、それでもきっと一番星の輝きは衰えないものです。よき伴星が現れたのなら、鬼に金棒ですね。",
// //     img: "https://picsum.photos/id/237/200/300",
// //     url: "https://shun-studio.com/"
// //   }
// // ]

// type ContextType = {
//   // questionData: QuestionNodeType[];
//   // resultData: ResultType[];

//   currentFlowId: string;
//   setCurrentFlowId: Dispatch<SetStateAction<string>>;
//   showScore: boolean;
//   setShowScore: Dispatch<SetStateAction<boolean>>;
//   answerHistories: AnswerHistoryType[];
//   setAnswerHistories: Dispatch<SetStateAction<AnswerHistoryType[]>>;
//   baseGirlDataList: GirlType[];
//   loading: boolean;
// }

// const QuestionnaireContext = createContext({} as ContextType);

// const QuestionnaireProvider = ({ children }: Props) => {
//   const [currentQuestion, setCurrentQuestion] = useState<number>(1);
//   const [showScore, setShowScore] = useState<boolean>(false);
//   const [answerHistories, setAnswerHistories] = useState<AnswerHistoryType[]>([]);
//   const [baseGirlDataList, setBaseGirlDataList] = useState<GirlType[]>([]);
//   const [loading, setLoading] = useState(true);


//   return (
//     <QuestionnaireContext.Provider value={{ questionData, resultData, currentQuestion, setCurrentQuestion, showScore, setShowScore, answerHistories, setAnswerHistories, baseGirlDataList, loading }}>
//       {children}
//     </QuestionnaireContext.Provider>
//   )
// }

// export const useQuestionnaireContext = (() => useContext(QuestionnaireContext));
// export default QuestionnaireProvider


// // useEffect(() => {
// //   (async () => {
// //     try {
// //       // const res = await axios.get('/questionnaire');
// //       const res = await getQuestionnair(1);
// //       // console.log(res)
// //     } catch (error) {
// //       // setLoading(false);
// //       console.log(error);
// //     }
// //   })();
// // }, [])


// // useEffect(() => {
// //   (async () => {
// //     try {
// //       const res = await axios.get('/test');
// //       setBaseGirlDataList(res.data.resultArray);
// //       setLoading(false);
// //     } catch (error) {
// //       setLoading(false);
// //       console.log(error);
// //     }
// //   })();
// // }, [])