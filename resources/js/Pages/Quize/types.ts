export type NodeType = {
  category: NodeCategory;
  // isQuize: boolean;
  title: string;
  choices?: {
    id: string;
    content: string;
    prev?: string;
    next?: string;
  }[];
  answer?: string;
  img?: string;
  url?: string;
}

export enum NodeCategory {
  QUIZE,
  ANSWER
}

// export type AnswerNodeType = {
//   name: string;
//   message?: string;
//   img?: string;
//   url?: string;
// }