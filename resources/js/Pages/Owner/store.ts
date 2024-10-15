import { create } from "zustand";
import { QuestionnaireState, QuestionnarieType, GirlType, } from '../Respondent/types';
import { OwnerState } from "./types";


export const useOwnerStore = create<OwnerState>(set => ({
  firstNodeId: "",
  flowTitle: "",
  flowUrl: "",

  setFirstNodeId: (by: string) => set({ firstNodeId: by }),
  setFlowTitle: (by: string) => set({ flowTitle: by }),
  setFlowUrl: (by: string) => set({ flowUrl: by }),

}))