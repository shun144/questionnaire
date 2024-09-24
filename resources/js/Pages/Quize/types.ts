export type ChoiceType = {
  choiceNo: string;
  content: string;
  nextNodeId?: string;
}

export type QuizeNodeType = {
  quizeNo: string,
  x: number,
  y: number,
  topic: string;
  choices: ChoiceType[];
}


// export type QuizeNodeType = {
//   quizeNo: string,
//   x: number,
//   y: number,
//   topic: string;
//   choices: {
//     choiceNo: string;
//     content: string;
//     nextNodeId?: string;
//   }[];
// }

export type ResultNodeType = {
  resultNo: string;
  x: number,
  y: number,
  message: string;
  img?: string;
  url?: string;
}

