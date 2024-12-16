import { create } from "zustand";
import { OwnerState } from "./types";

export const useOwnerStore = create<OwnerState>((set) => ({
    firstNodeId: "",
    flowTitle: "",
    flowUrl: "",
    isDirty: false,
    qNodeNum: 0,
    rNodeNum: 0,
    isSidebarOpen: true,

    setFirstNodeId: (by: string) => set({ firstNodeId: by }),
    setFlowTitle: (by: string) => set({ flowTitle: by }),
    setFlowUrl: (by: string) => set({ flowUrl: by }),
    setIsDirty: (by: boolean) => set({ isDirty: by }),

    setQnodeNum: (by: number) => set({ qNodeNum: by }),
    addQnodeNum: (by: number) =>
        set((state) => ({ qNodeNum: state.qNodeNum + by })),

    setRnodeNum: (by: number) => set({ rNodeNum: by }),
    addRnodeNum: (by: number) =>
        set((state) => ({ rNodeNum: state.rNodeNum + by })),

    setIsSidebarOpen: (by: boolean) => set({ isSidebarOpen: by }),
}));
