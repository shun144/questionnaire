export type ChoiceType = {
  choiceNo: string;
  content: string;
  nextNodeId?: string;
}

export type QuizeNodeType = {
  quizeNo: string,
  topic: string;
  choices: ChoiceType[];
}

export type ResultNodeType = {
  resultNo: string;
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
