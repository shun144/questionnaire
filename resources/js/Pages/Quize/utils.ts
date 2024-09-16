import { NodeType, NodeCategory } from "./types"

export const getQuizeNode = (): NodeType[] => {
  const nodes = [{
    category: NodeCategory.QUIZE,
    // isQuize: true,
    title: '好きな動物は？',
    choices: [
      {
        id: "1",
        content: "犬"
      },
      {
        id: "2",
        content: "猫"
      },
      {
        id: "3",
        content: "うさぎ"
      },
      {
        id: "4",
        content: "馬"
      },
    ]
  }]

  return nodes;
}