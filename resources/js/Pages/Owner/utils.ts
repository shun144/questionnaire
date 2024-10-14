import { QuestionNodeType, ResultNodeType, ChoiceType, } from "./types"
import { Node, Edge } from '@xyflow/react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FlowType, FlowCategoryType } from './types';


export const addFlow = async (category: FlowCategoryType): Promise<number> => {
  try {
    const res = await axios.post('/flow', {
      category
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return -999;
  }
}

export const getFlows = async (): Promise<FlowType[]> => {
  try {
    const res = await axios.get('/flows');
    console.log(res.data)
    return res.data as FlowType[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const commitCustomFlow = async (flowId: number, nodes: Node[], edges: Edge[]) => {

  const questionNodes = nodes.filter(x => x.type === 'questionNode');
  const resultNodes = nodes.filter(x => x.type === 'resultNode');

  try {
    const res = await axios.post('/commit', {
      flow_id: flowId,
      update_questions: JSON.stringify(questionNodes),
      update_results: JSON.stringify(resultNodes),
      update_edges: JSON.stringify(edges),
    });
  } catch (error) {
    console.log(error);
  }
}

export const commitCheckFlow = async (flowId: number, nodes: Node[], edges: Edge[], firstQuestionId: string) => {


  const questionCheckNode = nodes.filter(x => x.type === 'questionCheckNode');
  const resultNodes = nodes.filter(x => x.type === 'recommendNode');
  try {
    const res = await axios.post('/commit', {
      flow_id: flowId,
      update_questions: JSON.stringify(questionCheckNode),
      update_results: JSON.stringify(resultNodes),
      update_edges: JSON.stringify(edges),
      first_question_id: firstQuestionId,
    });

  } catch (error) {
    console.log(error);
  }
}



// export const commitFlow = async (flowId: number, nodes: Node[], edges: Edge[]) => {

//   const questionNodes = nodes.filter(x => x.type === 'questionNode');
//   const resultNodes = nodes.filter(x => x.type === 'resultNode');

//   try {
//     const res = await axios.post('/commit', {
//       flow_id: flowId,
//       update_questions: JSON.stringify(questionNodes),
//       update_results: JSON.stringify(resultNodes),
//       update_edges: JSON.stringify(edges),
//     });
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// }

export const getFirstQuestionId = async (flowId: number) => {
  const res = await axios.get<string>('/firstQuestionId', {
    params: {
      flow_id: flowId
    }
  });
  return res.data;
}


export const getInitialNodes = async (flowId: number) => {
  const axiosGetQuestionNode = axios.get<string>('/question-nodes', {
    params: {
      flow_id: flowId
    }
  });

  const axiosGetResultNode = axios.get<string>('/result-nodes', {
    params: {
      flow_id: flowId
    }
  });
  const [questionNodes, resultNodes] = await Promise.all([axiosGetQuestionNode, axiosGetResultNode]);

  const initialQuestionNodes: Node[] = questionNodes.data.length ? JSON.parse(questionNodes.data) : [];

  const initialResultNodes: Node[] = resultNodes.data.length ? JSON.parse(resultNodes.data) : [];


  return [...initialQuestionNodes, ...initialResultNodes];
}


export const getInitialEdges = async (flowId: number) => {
  const edges = await axios.get<string>('/edges', {
    params: {
      flow_id: flowId
    }
  });

  const initialEdges: Edge[] = edges.data.length ? JSON.parse(edges.data) : [];

  return initialEdges;
}



export const getUniqueId = () => {
  const uniqueId = uuidv4();
  return uniqueId;
}



