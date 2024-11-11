// src/components/SpendingChart.tsx
import React from "react";
import Chart from "../../reusables/Chart";

interface SpendingChartProps {
  data: {
    name: string;
    spent: number;
    limit: number;
    percentage: number;
  }[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  // Prepare the chart data

  const chartData = {
    labels: data.map((category) => category.name), // category names
    datasets: [
      {
        label: "Spent",
        data: data.map((category) => category.spent), // spending data
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
      {
        label: "Budget Limit",
        data: data.map((category) => category.limit), // budget limits
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow resizing freely

    plugins: {
      title: {
        display: true,
        text: "Spending vs Budget",
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Chart data={chartData} options={options} type="bar" />
    </div>
  );
};
