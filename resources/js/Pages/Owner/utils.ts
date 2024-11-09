// import { Node, Edge } from '@xyflow/react';
import axios from 'axios';
import { Graph } from './types';
// import { v4 as uuidv4 } from 'uuid';
// import { FlowCategoryType } from './types';



export const fetchGraphResource = async (id: number): Promise<Graph> => {
  try {
    const res = await axios.get(`totalling/${id}`);
    return res.data
  } catch (error) {
    return { labels: [], datas: [] };
  }
};


export const deleteFlow = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`/flow/${id}`);
    return true; // 削除成功
  } catch (error) {
    return false; // 削除失敗または対象が存在しない
  }
};

// export const deleteFlow = async (id: number): Promise<boolean> => {

//   const res = await axios.delete(`/flow/${id}`)
//     .then(() => {
//       return true;
//     })
//     .catch((error) => {
//       return false;
//     });

//   return res;
// }

// export const deleteFlow = async (id: number): Promise<boolean> => {

//   try {
//     const res = await axios.delete<boolean>(`/flow/${id}`);
//     // await axios.delete('/flow', {
//     //   params: { flowId }
//     // });

//     // axios.delete(`/flow/${flowId}`)
//     //   .then(() => {
//     //     toast.success(`${title}を削除しました`);
//     //     setFlows(prev => prev.filter(x => x.id !== flowId))
//     //   })
//     //   .catch((error) => {
//     //     toast.error(error);
//     //   });

//     return true;
//   } catch (error) {
//     return false;
//   }
// }


// export const getFlowTitleAndUrl = async (flowId: number): Promise<{ title: string, url: string }> => {

//   try {
//     const res = await axios.get('/flow-info', {
//       params: {
//         flow_id: flowId,
//       }
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return {
//       title: "",
//       url: ""
//     };
//   }
// }









// export const getFirstQuestionId = async (flowId: number) => {
//   const res = await axios.get<string>('/firstQuestionId', {
//     params: {
//       flow_id: flowId
//     }
//   });
//   return res.data;
// }


// export const getInitialNodes = async (flowId: number) => {
//   const axiosGetQuestionNode = axios.get<string>('/question-nodes', {
//     params: {
//       flow_id: flowId
//     }
//   });
//   const axiosGetResultNode = axios.get<string>('/result-nodes', {
//     params: {
//       flow_id: flowId
//     }
//   });
//   const [questionNodes, resultNodes] = await Promise.all([axiosGetQuestionNode, axiosGetResultNode]);

//   const initialQuestionNodes: Node[] = questionNodes.data.length ? JSON.parse(questionNodes.data) : [];
//   const initialResultNodes: Node[] = resultNodes.data.length ? JSON.parse(resultNodes.data) : [];

//   return [...initialQuestionNodes, ...initialResultNodes];
// }


// export const getInitialEdges = async (flowId: number) => {
//   const edges = await axios.get<string>('/edges', {
//     params: {
//       flow_id: flowId
//     }
//   });

//   const initialEdges: Edge[] = edges.data.length ? JSON.parse(edges.data) : [];

//   return initialEdges;
// }

// export const getUniqueId = () => {
//   const uniqueId = uuidv4();
//   return uniqueId;
// }

// export const getNewId = () => String(new Date().getTime());
export const getNewId = () => Math.random().toString(32).substring(2);



