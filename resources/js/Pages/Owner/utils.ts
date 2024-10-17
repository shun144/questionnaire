import { QuestionNodeType, ResultNodeType, ChoiceType, } from "./types"
import { Node, Edge } from '@xyflow/react';
import axios from 'axios';
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

export const deleteFlow = async (flowId: number): Promise<boolean> => {

  try {
    const res = await axios.delete('/flow', {
      params: {
        flowId
      }
    });
    return true;
  } catch (error) {
    return false;
  }
}


export const getFlowTitleAndUrl = async (flowId: number): Promise<{ title: string, url: string }> => {

  try {
    const res = await axios.get('/flow-info', {
      params: {
        flow_id: flowId,
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      title: "",
      url: ""
    };
  }
}

export const getFlows = async (): Promise<FlowType[]> => {
  try {
    const res = await axios.get('/flows');
    return res.data as FlowType[];
  } catch (error) {
    console.log(error);
    return [];
  }
}



const commitFlow = async (
  flowId: number, nodes: Node[], edges: Edge[],
  firstNodeId: string, questionNodeTypeName: string, resultNodeTypeName: string,
  title: string, url: string
) => {


  const questionNodes = nodes.filter(x => x.type === questionNodeTypeName);
  const resultNodes = nodes.filter(x => x.type === resultNodeTypeName);

  console.log(questionNodes)


  try {
    const res = await axios.post('/flows', {
      flow_id: flowId,
      update_questions: JSON.stringify(questionNodes),
      update_results: JSON.stringify(resultNodes),
      update_edges: JSON.stringify(edges),
      first_question_id: firstNodeId,
      title,
      url,
    });
    console.log(res.data)

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const commitStandardFlow = async (
  flowId: number, nodes: Node[], edges: Edge[], firstNodeId: string,
  title: string, url: string
) => {
  const res = commitFlow(flowId, nodes, edges, firstNodeId, 'questionNode', 'resultNode', title, url);
  return res;
}



export const commitCityHeavenFlow = async (
  flowId: number, nodes: Node[], edges: Edge[], firstNodeId: string,
  title: string, url: string
) => {
  const res = commitFlow(flowId, nodes, edges, firstNodeId, 'cityHeavenQuestionNode', 'cityHeavenResultNode', title, url);
  return res;
}







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



