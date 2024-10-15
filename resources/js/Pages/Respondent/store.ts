import { create } from "zustand";
import { QuestionnaireState, QuestionnarieType, GirlType, } from './types';
import { SalsPointType } from "../Owner/types";

const initCurrentQuestionnarieValue: QuestionnarieType = {
  id: "",
  topic: "",
  choices: [],
  category: 'none',
}

export const useRespondentStore = create<QuestionnaireState>(set => ({
  isLoading: true,
  currentQuestionnarie: initCurrentQuestionnarieValue,
  questionnarieDatas: [],
  answerHistories: [],
  baseGirlDataList: [],
  isGirlsLoading: true,
  firstQuestionId: "",

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
    answer: string,
    salesPoints: SalsPointType[],
  ) => set(state => ({
    answerHistories: [
      ...state.answerHistories, {
        id,
        question,
        answer,
        salesPointNos: salesPoints ? salesPoints.map(x => x.no) : [],
      }
    ]
  })),

  setBaseGirlDataList: (by: GirlType[]) => { set({ baseGirlDataList: by }) },
  setisGirlsLoading: (by: boolean) => set({ isGirlsLoading: by }),
  setFirstQuestionId: (by: string) => set({ firstQuestionId: by }),

  reset: () => set(state => ({
    currentQuestionnarie: state.questionnarieDatas.find(x => x.id === state.firstQuestionId),
    answerHistories: [],
  })),

  backStep: () => set(state => ({
    currentQuestionnarie: state.questionnarieDatas.find(x => x.id === state.answerHistories[state.answerHistories.length - 1].id),
    answerHistories: state.answerHistories.slice(0, -1),
  }))

}))


