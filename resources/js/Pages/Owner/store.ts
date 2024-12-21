import { create } from "zustand";
import { OwnerState, type SubmitError, type FlowImage } from "./types";

export const useOwnerStore = create<OwnerState>((set) => ({
    flowId: undefined,
    flowTitle: "",
    flowUrl: "",
    firstNodeId: "",
    isDirty: false,
    qNodeNum: 0,
    rNodeNum: 0,
    isSidebarOpen: true,
    submitError: {},
    flowImages: [],

    setFlowId: (by: number) => set({ flowId: by }),
    setFlowTitle: (by: string) => set({ flowTitle: by }),
    setFlowUrl: (by: string) => set({ flowUrl: by }),
    setFirstNodeId: (by: string) => set({ firstNodeId: by }),
    setIsDirty: (by: boolean) => set({ isDirty: by }),

    setQnodeNum: (by: number) => set({ qNodeNum: by }),
    addQnodeNum: (by: number) =>
        set((state) => ({ qNodeNum: state.qNodeNum + by })),

    setRnodeNum: (by: number) => set({ rNodeNum: by }),
    addRnodeNum: (by: number) =>
        set((state) => ({ rNodeNum: state.rNodeNum + by })),

    setIsSidebarOpen: (by: boolean) => set({ isSidebarOpen: by }),
    setSubmitError: (by: SubmitError) => set({ submitError: by }),

    addImage: (by: FlowImage) =>
        set((state) => ({ flowImages: [...state.flowImages, by] })),
    delImage: (by: string) =>
        set((state) => ({
            flowImages: state.flowImages.filter((x) => x.id !== by),
        })),
}));
