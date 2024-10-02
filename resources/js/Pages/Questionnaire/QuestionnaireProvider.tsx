import {
  useState, createContext, ReactNode, Dispatch,
  SetStateAction, useContext, useEffect
} from 'react';
import { AnswerHistoryType, } from './types';
import { QuizeNodeType, ResultNodeType, GirlType } from '../Quize/types';
import axios, { AxiosResponse } from 'axios';

type Props = {
  children: ReactNode
}

type ContextType = {
  quizeData: QuizeNodeType[];
  resultData: ResultNodeType[];
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  showScore: boolean;
  setShowScore: Dispatch<SetStateAction<boolean>>;
  answerHistories: AnswerHistoryType[];
  setAnswerHistories: Dispatch<SetStateAction<AnswerHistoryType[]>>;
  baseGirlDataList: GirlType[];
  loading: boolean;
}

const resultData: ResultNodeType[] = [
  {
    resultNo: "1",
    result: "あなたはAタイプです",
    message: "孤独を感じながらも自分というものをしっかりと持ち続けているあなたは氷元素の祝福を受けるのにふさわしい人物です。自分なりの信念を持つのは難しいことですが、あなたにはそれができているみたいです。周囲から完全に理解されることは難しいかもしれませんが、それでもきっと一番星の輝きは衰えないものです。よき伴星が現れたのなら、鬼に金棒ですね。",
    img: "https://picsum.photos/id/237/200/300",
    url: "https://shun-studio.com/"
  }
]


const quizeData: QuizeNodeType[] = [
  {
    quizeNo: "1",
    topic: '太陽系で最も大きな惑星は？',
    choices: [
      {
        choiceNo: "1-1",
        content: "水星"
      },
      {
        choiceNo: "1-2",
        content: "金星aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      {
        choiceNo: "1-3",
        content: "木星"
      },
    ]
  },
  {
    quizeNo: "2",
    topic: '次のうち、哺乳類ではない動物はどれですかaaaabbbbbbbbbbbbbbbbbbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa？',
    choices: [
      {
        choiceNo: "2-1",
        content: "犬"
      },
      {
        choiceNo: "2-2",
        content: "猫"
      },
      {
        choiceNo: "2-3",
        content: "うさぎ"
      },
      {
        choiceNo: "2-4",
        content: "馬"
      },
      {
        choiceNo: "2-5",
        content: "亀"
      },
    ]
  },
  {
    quizeNo: "3",
    topic: '好きな季節はどれですか？',
    choices: [
      {
        choiceNo: "3-1",
        content: "春"
      },
      {
        choiceNo: "3-2",
        content: "夏"
      },
      {
        choiceNo: "3-3",
        content: "秋"
      },
      {
        choiceNo: "3-4",
        content: "冬"
      },
    ]
  }
]

const QuestionnaireContext = createContext({} as ContextType);

const QuestionnaireProvider = ({ children }: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [answerHistories, setAnswerHistories] = useState<AnswerHistoryType[]>([]);
  const [baseGirlDataList, setBaseGirlDataList] = useState<GirlType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/test');
        setBaseGirlDataList(res.data.resultArray);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [])

  return (
    <QuestionnaireContext.Provider value={{ quizeData, resultData, currentQuestion, setCurrentQuestion, showScore, setShowScore, answerHistories, setAnswerHistories, baseGirlDataList, loading }}>
      {children}
    </QuestionnaireContext.Provider>
  )
}

export const useQuestionnaireContext = (() => useContext(QuestionnaireContext));
export default QuestionnaireProvider