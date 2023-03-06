import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { get24HrIntensityData } from "./api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    scale: true,
  },
};

function App() {
  const labelsInit: any = [];

  for (let i = 1; i <= 48; i++) {
    labelsInit.push(i);
  }

  const [dataConfig, setDataConfig] = useState<any>({});

  useEffect(() => {
    get24HrIntensityData().then((response) => {
      const apiData = response.map((x) => x.forecast);

      setDataConfig({
        labels: labelsInit,
        datasets: [
          {
            label: "Dataset 1",
            data: apiData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    });
  }, []);

  return !dataConfig.labels ? null : (
    <Line options={options} data={dataConfig} />
  );
}

export default App;
