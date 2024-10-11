import { create } from "zustand";
import { QuestionnaireState, QuestionnarieType, QuestionType, ResultType } from './types';

const initCurrentQuestionnarieValue: QuestionnarieType = {
  id: "",
  topic: "",
  choices: [],
  category: 'none',
}


export const useQuestionnaireStore = create<QuestionnaireState>(set => ({
  isLoading: true,
  currentQuestionnarie: initCurrentQuestionnarieValue,
  questionnarieDatas: [],
  answerHistories: [],

  setIsLoading: (by: boolean) => set({ isLoading: by }),
  setQuestionnarieDatas: (datas: QuestionnarieType[]) => set({ questionnarieDatas: datas }),

  setCurrentQuestionnarie: (id?: string) => set(state => {
    return {
      currentQuestionnarie: state.questionnarieDatas.find(x => x.id === id) ?? initCurrentQuestionnarieValue
    }
  }),

  setAnswerHistories: (
    id: string,
    question: string,
    answer: string
  ) => set(state => ({
    answerHistories: [...state.answerHistories, { id, question, answer }]
  })),

  reset: () => set(state => ({
    currentQuestionnarie: state.questionnarieDatas[0],
    answerHistories: [],
  })),

  backStep: () => set(state => ({
    currentQuestionnarie: state.questionnarieDatas.find(x => x.id === state.answerHistories[state.answerHistories.length - 1].id),
    answerHistories: state.answerHistories.slice(0, -1),
  }))

}))


