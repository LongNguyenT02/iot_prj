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
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
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

  const { currentThermometer, currentHygrometer, currentLux } = useSelector(state => state.device);
  const [data, setData] = useState({
    labels:currentThermometer?.created_at||[],
    datasets: [
      {
        label: 'Thermometer',
        data: currentThermometer?.value || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Hygrometer',
        data: currentHygrometer?.value || [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Lux',
        data: currentLux?.value || [],
        borderColor: 'rgb(41, 80, 102)',
        backgroundColor: 'rgba(41, 80, 102, 0.5)',
      },
    ],
  })

  useEffect(() => {
    setData({
      labels:currentThermometer?.created_at||[],
      datasets: [
        {
          label: 'Thermometer',
          data: currentThermometer?.value || [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Hygrometer',
          data: currentHygrometer?.value || [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Lux',
          data: currentLux?.value || [],
          borderColor: 'rgb(41, 80, 102)',
          backgroundColor: 'rgba(41, 80, 102, 0.5)',
        },
      ],
    })
  }, [currentHygrometer, currentLux, currentThermometer])


  return <Line style={{ width: '70%' }} options={options} data={data} />
}

export default Chart;