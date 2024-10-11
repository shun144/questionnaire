// import { EdgeTypes } from '@xyflow/react';

export type StatusType = 'add' | 'update' | 'delete' | 'offset' | 'upsert';


export type QuestionNodeType = {
  id: string,
  topic: string;
  choices: ChoiceType[];
}

export type ChoiceType = {
  id: string;
  content: string;
}

export type ResultNodeType = {
  id: string;
  result: string;
  message?: string;
  img?: string;
  url?: string;
}

export type GirlType = {
  id: string;
  name: string;
  catchphrase: string;
  diary_flg: boolean;
  review_flg: boolean;
  picture_url: string;
  mypage_url: string;
  yoyaku_url: string;
  today_work_flg: boolean;
  w_shukkin: string[];
  salespoint_ids: string[];
  earn_point: number;
}
