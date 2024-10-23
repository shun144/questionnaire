import { SalsPointType } from '../Owner/types';


export type AnswerHistoryType = {
  id: string;
  question: string;
  answer: string;
  salesPointNos: string[];
  // salesPoints: SalsPointType[];
}

type ChoiceType = {
  id: string;
  content: string;
  salesPoints: SalsPointType[];
  nextId?: string;
}

// type ChoiceType = {
//   id: string;
//   content: string;
//   nextId?: string;
// }

export type QuestionType = {
  id: string;
  topic: string;
  choices: ChoiceType[];
  category: 'question' | 'result' | 'none';
}

export type ResultType = {
  id: string;
  result: string;
  message?: string;
  img?: string;
  url?: string;
  category: 'question' | 'result' | 'none';
}

export type QuestionnarieType = (QuestionType | ResultType);

export type QuestionnaireState = {
  isLoading: boolean;
  questionnarieDatas: QuestionnarieType[];
  currentQuestionnarie: QuestionnarieType;
  answerHistories: AnswerHistoryType[];
  baseGirlDataList: GirlType[];
  // isGirlsLoading: boolean;
  firstQuestionId: string;


  setIsLoading: (by: boolean) => void;
  setQuestionnarieDatas: (datas: QuestionnarieType[]) => void;
  setCurrentQuestionnarie: (id?: string) => void;
  setAnswerHistories: (id: string, question: string, answer: string, salesPoints: SalsPointType[]) => void;

  setBaseGirlDataList: (by: GirlType[]) => void;
  // setisGirlsLoading: (by: boolean) => void,
  setFirstQuestionId: (by: string) => void,

  reset: () => void;
  backStep: () => void;
};


export type DbQuestionType = {
  id: string;
  dragHandle: string;
  dragging: boolean;
  measured: { width: number; height: number };
  position: { x: number; y: number };
  selected: boolean;
  type: string;
  data: {
    topic: string;
    choices: {
      id: string;
      content: string;
      salePoints: SalsPointType[];
    }[]
  }
}

export type DbResultType = {
  id: string;
  dragHandle: string;
  dragging: boolean;
  measured: { width: number; height: number };
  position: { x: number; y: number };
  selected: boolean;
  type: string;
  data: { result: string; message?: string; img?: string; url?: string }
}

export type DbEdgeType = {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  type: string;
}


export type GirlType = {
  id: string;
  name: string;
  catchphrase: string | string[];
  diary_flg: boolean;
  review_flg: boolean;
  picture_url: string;
  mypage_url: string;
  bwh: string[];
  yoyaku_url: string;
  today_work_flg: boolean;
  w_shukkin: string[];
  salespoint_ids: string[];
  earn_point: number;
}
