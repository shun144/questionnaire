export type ChoiceType = {
  choiceNo: string;
  content: string;
  nextNodeId?: string;
}

export type QuizeNodeType = {
  quizeNo: string,
  topic: string;
  choices: ChoiceType[];
}

export type ResultNodeType = {
  resultNo: string;
  message: string;
  img?: string;
  url?: string;
}

