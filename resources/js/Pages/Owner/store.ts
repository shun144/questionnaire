import { create } from "zustand";
import { QuestionnaireState, QuestionnarieType, GirlType, } from '../Questionnaire/types';
import { OwnerState } from "./types";


export const useOwnerStore = create<OwnerState>(set => ({
  firstNodeId: "",

  setFirstNodeId: (by: string) => set({ firstNodeId: by }),

}))