import {
  useState, createContext, ReactNode, Dispatch,
  SetStateAction, useContext
} from 'react';
import { AnswerHistoryType } from './types';
import { QuizeNodeType } from '../Quize/types';

type Props = {
  children: ReactNode
}

type ContextType = {
  quizeData: QuizeNodeType[];
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  showScore: boolean;
  setShowScore: Dispatch<SetStateAction<boolean>>;
  answerHistories: AnswerHistoryType[];
  setAnswerHistories: Dispatch<SetStateAction<AnswerHistoryType[]>>;
}


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

  return (
    <QuestionnaireContext.Provider value={{ quizeData, currentQuestion, setCurrentQuestion, showScore, setShowScore, answerHistories, setAnswerHistories }}>
      {children}
    </QuestionnaireContext.Provider>
  )
}

export const useQuestionnaireContext = (() => useContext(QuestionnaireContext));
export default QuestionnaireProvider