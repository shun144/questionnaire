import { QuizeNodeType, ResultNodeType, ChoiceType } from "./types"
import { Node, Edge } from '@xyflow/react';


const getQuizeNode = (): QuizeNodeType[] => {
  const nodes = [{
    quizeNo: 'quize-1',
    x: 0,
    y: 0,
    topic: '好きな動物は？',
    choices: [
      {
        choiceNo: "quize-1-1",
        content: "犬"
      },
      {
        choiceNo: "quize-1-2",
        content: "猫"
      },
      {
        choiceNo: "quize-1-3",
        content: "うさぎ"
      },
      {
        choiceNo: "quize-1-4",
        content: "馬"
      },
    ]
  }]

  return nodes;
}

const getResultNode = (): ResultNodeType[] => {
  const nodes = [{
    resultNo: 'result-1',
    x: 300,
    y: 100,
    message: 'あなたは良い人です',
  }]
  return nodes;
}

export const getInitialNodes = () => {

  const initialQuizeNodes: Node[] = getQuizeNode().map(nd => {
    return {
      id: nd.quizeNo,
      position: { x: nd.x, y: nd.y },
      data: nd,
      type: "quizeNode"
    }
  });

  const initialResultNodes: Node[] = getResultNode().map(nd => {
    return {
      id: nd.resultNo,
      position: { x: nd.x, y: nd.y },
      data: nd,
      type: "resultNode"
    }
  })

  return [...initialQuizeNodes, ...initialResultNodes]

}

export const getInitialEdges = (): Edge[] => {
  return [
    {
      id: "1",
      type: "smoothstep",
      source: "quize-1",
      sourceHandle: "quize-1-1",
      target: "result-1",
      targetHandle: "result-1",
    }
  ]
}

/**
 * idから識別文字列を除外した配列を取得\
 * この時別の識別文字列のidにreplaceをするとNaNになるので、その時は-99を返す
 * -99という数字に意味はなく、ただMath.maxで取得されない数字とした
 * @param arr 
 * @param idenStr 識別文字列（例：quize-1→"quize-"）
 * @returns 
 */
export const getNewId = (arr: Node[], idenStr: string) => {
  const maxId = Math.max(...arr.map(x => parseInt(x.id.replace(idenStr, '')) || -99))
  return `${idenStr}${maxId + 1}`;
}


export const getNewChoiceNo = (arr: ChoiceType[], idenStr: string) => {
  const maxNo = Math.max(...arr.map(x => parseInt(x.choiceNo.replace(idenStr, '')) || -99))
  return `${idenStr}${maxNo + 1}`;
}




