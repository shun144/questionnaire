import { QuizeNodeType, ResultNodeType, ChoiceType } from "./types"
import { Node, Edge } from '@xyflow/react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type QuizeNodeApiType = QuizeNodeType & {
  x: number;
  y: number;
}

const getQuizeNode = (): QuizeNodeType[] => {
  // (async () => {
  //   try {
  //     // const res = await axios.get<QuizeNodeApiType[]>('/quize');

  //     const res = await axios.get('/quize');

  //     const initialQuizeNodes = (res.data["quize"] as QuizeNodeApiType[]).map(nd => {
  //       return {
  //         id: nd.quizeNo,
  //         position: { x: nd.x, y: nd.y },
  //         data: {
  //           topic: nd.topic,
  //           choices: nd.choices
  //         },
  //         type: "quizeNode"
  //       }
  //     });

  //     // console.log(initialQuizeNodes)

  //   } catch (error) {
  //     console.log(error);
  //   }
  // })();



  const nodes = [{
    quizeNo: 'quize-1',
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
    ]
  },
  {
    quizeNo: 'quize-2',
    topic: '好きな季節は？',
    choices: [
      {
        choiceNo: "quize-2-1",
        content: "春"
      },
      {
        choiceNo: "quize-2-2",
        content: "夏"
      },
      {
        choiceNo: "quize-2-3",
        content: "秋"
      },
      {
        choiceNo: "quize-2-4",
        content: "冬"
      },
    ]
  }]
  return nodes;
}

const getResultNode = (): ResultNodeType[] => {
  const nodes = [{
    resultNo: 'result-1',
    message: 'あなたのタイプはAさんです',
  }]
  return nodes;
}

export const getInitialNodes = () => {

  const initialQuizeNodes: Node[] = getQuizeNode().map((nd, index) => {
    return {
      id: nd.quizeNo,
      position: { x: index * 350, y: index * 200 },
      data: nd,
      type: "quizeNode",
      dragHandle: '.custom-drag-handle',
    }
  });

  const initialResultNodes: Node[] = getResultNode().map((nd, index) => {
    return {
      id: nd.resultNo,
      position: { x: (index + 1) * 350, y: 0 },
      data: nd,
      type: "resultNode",
      dragHandle: '.custom-drag-handle',
    }
  })

  return [...initialQuizeNodes, ...initialResultNodes]

}

export const getInitialEdges = (): Edge[] => {
  return [
    {
      id: "edge-1",
      type: "smoothstep",
      source: "quize-1",
      sourceHandle: "quize-1-1",
      target: "result-1",
      targetHandle: "result-1",
    },
    {
      id: "edge-2",
      type: "smoothstep",
      source: "quize-1",
      sourceHandle: "quize-1-2",
      target: "result-1",
      targetHandle: "result-1",
    },
    {
      id: "edge-3",
      type: "smoothstep",
      source: "quize-1",
      sourceHandle: "quize-1-3",
      target: "quize-2",
      targetHandle: "quize-2",
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




