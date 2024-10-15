export type FlowCategoryType = 'standard' | 'cityheaven';

export type FlowType = {
  id: number;
  category: FlowCategoryType;
  title: string;
  url: string;
  firstQuestionId: string;
}

export type SalsPointType = {
  label: string;
  no: string;
  value: string;
}

export type ChoiceType = {
  id: string;
  content: string;
  salePoints: SalsPointType[]
}

export type QuestionNodeType = {
  id: string,
  topic: string;
  img?: string;
  choices: ChoiceType[];
}


export type ResultNodeType = {
  id: string;
  result: string;
  message?: string;
  img?: string;
  url?: string;
}

export type RecommendNodeType = {
  id: string;
  message?: string;
}

export type OwnerState = {
  firstNodeId: string,
  flowTitle: string,
  flowUrl: string,

  setFirstNodeId: (by: string) => void,
  setFlowTitle: (by: string) => void,
  setFlowUrl: (by: string) => void,
}






