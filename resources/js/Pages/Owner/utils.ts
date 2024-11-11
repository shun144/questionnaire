import axios from 'axios';
import { Graph } from './types';


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


export const getNewId = () => Math.random().toString(32).substring(2);



