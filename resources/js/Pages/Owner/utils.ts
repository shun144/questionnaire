import { QuestionNodeType, ResultNodeType, ChoiceType, } from "./types"
import { Node, Edge } from '@xyflow/react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';


export const commitFlow = async (flowId: string, nodes: Node[], edges: Edge[]) => {

  const questionNodes = nodes.filter(x => x.type === 'questionNode');
  const resultNodes = nodes.filter(x => x.type === 'resultNode');

  try {
    const res = await axios.post('/commit', {
      flow_id: flowId,
      update_questions: JSON.stringify(questionNodes),
      update_results: JSON.stringify(resultNodes),
      update_edges: JSON.stringify(edges),
    });
    // console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

export const getInitialNodes = async (flowId: string) => {
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


export const getInitialEdges = async (flowId: string) => {
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



