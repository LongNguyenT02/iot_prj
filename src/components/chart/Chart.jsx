import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data2 }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  const labels = ['October',"November","December"];
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Thermometer',
        data: [data2.hot,300,200],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Thermometer',
        data: [data2.water,321,515],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Thermometer',
        data: [data2.lux,512,692],
        borderColor: 'rgb(41, 80, 102)',
        backgroundColor: 'rgba(41, 80, 102, 0.5)',
      },
    ],
  })
  

  return <Line style={{ width: '70%' }} options={options} data={data} />
}

export default Chart;