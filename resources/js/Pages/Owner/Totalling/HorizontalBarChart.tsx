import { memo, useEffect, useRef, useState, useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem, TooltipModel } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useQuery } from '@tanstack/react-query'
import { fetchGraphResource } from "@/Pages/Owner/utils";
import { colorList } from "./colorList";

export type BarChartProps = {
  flowId: number;
}

// Chart.jsのモジュールを登録
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const regex = new RegExp('.{1,25}', 'g');

const HorizontalBarChart = ({ flowId }: BarChartProps) => {
  const chartRef = useRef<ChartJS<'bar'> | null>(null);

  const { isPending, error, data, isFetching, dataUpdatedAt } = useQuery({
    queryKey: [`barChart${String(flowId)}`],
    queryFn: () => fetchGraphResource(flowId).then((res) => ({
      labels: res.labels,
      datasets: [
        {
          data: res.datas,
          backgroundColor: res.datas.map((_, idx) => `rgba(${colorList[idx % colorList.length]},0.4)`),
          borderColor: res.datas.map((_, idx) => `rgba(${colorList[idx % colorList.length]},1)`),
          borderWidth: 1,
          barThickness: 20, // 固定幅
          maxBarThickness: 20, // 最大幅
        }
      ]
    })),
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (chartRef.current && data) {
      const chartCanvas = chartRef.current.canvas;
      const newHeight = 100 + data.labels.length * 100;
      chartCanvas.style.height = `${newHeight}px`; // CSSでの高さ設定
      chartCanvas.height = newHeight; // Canvasの高さも設定
      chartRef.current.update(); // チャートを更新
    }
  }, [data]);

  const options = useMemo(() => (
    {
      indexAxis: "y" as const, // 横棒グラフにするための設定
      responsive: true,
      maintainAspectRatio: false, // 高さの自動調整を無効化
      layout: {
        padding: { top: 40, bottom: 40, left: 10, right: 20, },
      },
      plugins: {
        legend: { display: false, },
        title: { display: false, text: "title", },

        tooltip: {
          callbacks: {
            label: ({ label, raw }: TooltipItem<'bar'>) => (
              [...(label.match(regex) || [label]), `【${Number(raw).toLocaleString()}回】`]
            ),
            title: () => '',
          },
          bodySpacing: 10,
          padding: 15,
        }
      },
      scales: {
        x: {
          ticks: {
            callback: function (value: string | number) {
              return Number.isInteger(value) ? value.toLocaleString() : '';
            },
            font: { size: 14 },
          },
        },
        y: {
          stacked: false, // スタッキングを無効にする
          beginAtZero: true,
          ticks: {
            callback: function (_: string | number, idx: number) {
              const label = data!.labels[idx];
              const raw = data!.datasets[0].data[idx];
              return [...(label.match(regex) || [label]), `【${Number(raw).toLocaleString()}回】`]
            },
            font: { size: 12 },
            color: '#475569',
          }
        }
      },
    }
  ), [data])

  if (isPending) { return <SkeltonMsg message="Loading..." /> }

  if (error) { return <SkeltonMsg message="グラフデータの取得に失敗しました。" /> }


  return (
    <div className="w-full flex justify-center items-center px-2 pt-2 pb-6 ">
      <div className="w-full bg-gray-50 border-2 border-gray-300">
        <Bar data={data!} options={options} ref={chartRef} />
      </div>
    </div>
  );
}

function SkeltonMsg({ message }: { message: string }) {
  return (
    <div className="w-full flex justify-center items-center py-6">{message}</div>
  )
}

export default memo(HorizontalBarChart);