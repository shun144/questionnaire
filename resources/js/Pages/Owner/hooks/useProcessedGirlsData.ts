import { useRespondentStore } from '@/Pages/Respondent/store';
import { AnswerHistoryType, GirlType } from '@/Pages/Respondent/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

interface Props {
  answerHistories: AnswerHistoryType[];
}

interface GirlsResponse {
  girlsData: GirlType[];
}

interface ErrorResponse {
  message: string;
}

// カスタムフックの実装
const useProcessedGirlsData = ({ answerHistories }: Props) => {
  const { url } = usePage();
  const { id } = useRespondentStore((state) => state.currentQuestionnarie);


  const fetchGirlsData = async (): Promise<GirlType[]> => {
    const baseUrl = window.location.origin;
    const res: AxiosResponse<GirlsResponse> = await axios.get(`${baseUrl}${url}/cityheaven`);
    return res.data.girlsData;
  };

  // データ加工関数
  const processGirlsData = (girlsData: GirlType[]): GirlType[] => {

    const score: { [key: string]: number } = {};

    answerHistories.forEach(({ salesPointNos }) => {
      salesPointNos.forEach((item) => {
        score[item] = (score[item] || 0) + 1;
      });
    });

    // 2. girlsDataにスコアを付与
    const girlsDataWithPoint = girlsData.map((girl) => {
      const earn_point = girl.salespoint_ids.reduce((point, id) => {
        return point + (score[id] || 0);
      }, 0);
      return { ...girl, earn_point };
    });

    // 3. ソート処理を最適化
    girlsDataWithPoint.sort((a, b) => {
      if (b.today_work_flg !== a.today_work_flg) {
        return b.today_work_flg ? 1 : -1;
      }
      if (b.earn_point !== a.earn_point) {
        return b.earn_point - a.earn_point;
      }
      if (b.diary_flg !== a.diary_flg) {
        return b.diary_flg ? 1 : -1;
      }
      if (b.review_flg !== a.review_flg) {
        return b.review_flg ? 1 : -1;
      }
      return b.w_shukkin.filter(Boolean).length - a.w_shukkin.filter(Boolean).length;
    });

    return girlsDataWithPoint;

  };

  // TanStack Queryでデータを取得し、キャッシュ
  const { data: cachedGirlsData, isFetching, error }: UseQueryResult<GirlType[], AxiosError<ErrorResponse>> = useQuery({
    queryKey: [`RespondentGirlsData${id}`],
    queryFn: fetchGirlsData,
    staleTime: 1000 * 60 * 5, // キャッシュ時間を5分に設定
    retry: false,
  });

  // エラーメッセージの取得
  const errorMessage = error?.response?.data?.message;


  // キャッシュデータが存在する場合は加工したデータを返す
  const processedGirlsData = useMemo(() => {
    return cachedGirlsData ? processGirlsData(cachedGirlsData) : [];
  }, [cachedGirlsData, answerHistories]);

  return { processedGirlsData, isFetching, errorMessage };
};

export default useProcessedGirlsData;
