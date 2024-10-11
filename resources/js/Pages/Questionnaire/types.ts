export type AnswerHistoryType = {
  id: string;
  question: string;
  answer: string;
}

type ChoiceType = {
  id: string;
  content: string;
  nextId?: string;
}

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
  answerHistories: AnswerHistoryType[]

  setIsLoading: (by: boolean) => void;
  setQuestionnarieDatas: (datas: QuestionnarieType[]) => void;
  setCurrentQuestionnarie: (id?: string) => void;
  setAnswerHistories: (id: string, question: string, answer: string) => void;
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
  data: { topic: string; choices: { id: string; content: string; }[] }
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

