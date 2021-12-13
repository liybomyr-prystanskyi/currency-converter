import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ComparisonGraph(props) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Currancy change for ${props.currency}`,
      },
    },
  };

  const labels = Object.keys(props.rates);
  const data = {
    labels,
    datasets: [
      {
        label: props.currency,
        data: Object.values(props.rates).map(rate=>rate[props.currency]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  
  return (
    <div className="graph">
      <Line 
      // @ts-ignore
      options={options} data={data} />
    </div>
  );
}

export default ComparisonGraph;