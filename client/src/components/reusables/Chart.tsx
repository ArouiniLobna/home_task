import { useRef, useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ChartType,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  DoughnutController,
  BarController,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface ChartProps {
  data: ChartData;
  options?: ChartOptions;
  type?: ChartType;
}

const Chart: React.FC<ChartProps> = ({ data, options, type = "doughnut" }) => {
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const memoizedData = useMemo(() => data, [data]);
  const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartCanvasRef.current) {
      chartInstanceRef.current = new ChartJS(chartCanvasRef.current, {
        type,
        data: memoizedData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          ...memoizedOptions,
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [memoizedData, memoizedOptions, type]);

  return <canvas ref={chartCanvasRef} />;
};

export default Chart;
