export type FlowType = {
    id: number;
    title: string;
    url: string;
    firstQuestionId: string;
};

export type ChoiceType = {
    id: string;
    content: string;
};

export type QuestionNodeType = {
    id: string;
    topic: string;
    img?: string;
    choices: ChoiceType[];
};

export type ResultNodeType = {
    id: string;
    result: string;
    message?: string;
    img?: string;
    url?: string;
};

export type RecommendNodeType = {
    id: string;
    message?: string;
};

export interface SubmitError {
    title?: string;
    url?: string;
}

export interface FlowImage {
    nodeId: string;
    file: File;
}

export type OwnerState = {
    flowId?: number;
    flowTitle: string;
    flowUrl: string;
    firstNodeId: string;
    isDirty: boolean;

    qNodeNum: number;
    rNodeNum: number;

    isSidebarOpen: boolean;

    submitError: SubmitError;

    flowImages: FlowImage[];

    setFlowId: (by: number) => void;
    setFlowTitle: (by: string) => void;
    setFlowUrl: (by: string) => void;
    setFirstNodeId: (by: string) => void;
    setIsDirty: (by: boolean) => void;

    setQnodeNum: (by: number) => void;
    addQnodeNum: (by: number) => void;

    setRnodeNum: (by: number) => void;
    addRnodeNum: (by: number) => void;
    setIsSidebarOpen: (by: boolean) => void;

    setSubmitError: (by: SubmitError) => void;
    addImage: (by: FlowImage) => void;
    delImage: (by: string) => void;
};

export type Graph = {
    labels: string[];
    datas: number[];
};

// export type FlowType = {
//     id: number;
//     title: string;
//     url: string;
//     firstQuestionId: string;
// };

// export type SalsPointType = {
//     label: string;
//     no: string;
//     value: string;
// };

// export type ChoiceType = {
//     id: string;
//     content: string;
//     salePoints: SalsPointType[];
// };

// export type QuestionNodeType = {
//     id: string;
//     topic: string;
//     img?: string;
//     choices: ChoiceType[];
// };

// export type ResultNodeType = {
//     id: string;
//     result: string;
//     message?: string;
//     img?: string;
//     url?: string;
// };

// export type RecommendNodeType = {
//     id: string;
//     message?: string;
// };

// export interface SubmitError {
//     title?: string;
//     url?: string;
// }

// export interface FlowImage {
//     nodeId: string;
//     file: File;
// }

// export type OwnerState = {
//     flowId?: number;
//     flowTitle: string;
//     flowUrl: string;
//     firstNodeId: string;
//     isDirty: boolean;

//     qNodeNum: number;
//     rNodeNum: number;

//     isSidebarOpen: boolean;

//     submitError: SubmitError;

//     flowImages: FlowImage[];

//     setFlowId: (by: number) => void;
//     setFlowTitle: (by: string) => void;
//     setFlowUrl: (by: string) => void;
//     setFirstNodeId: (by: string) => void;
//     setIsDirty: (by: boolean) => void;

//     setQnodeNum: (by: number) => void;
//     addQnodeNum: (by: number) => void;

//     setRnodeNum: (by: number) => void;
//     addRnodeNum: (by: number) => void;
//     setIsSidebarOpen: (by: boolean) => void;

//     setSubmitError: (by: SubmitError) => void;
//     addImage: (by: FlowImage) => void;
//     delImage: (by: string) => void;
// };

// export type Graph = {
//     labels: string[];
//     datas: number[];
// };
