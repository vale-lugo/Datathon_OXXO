import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

export default function VentaChart({ data }) {
  const chartData = {
    labels: data.map(d => d.mes),
    datasets: [
      {
        data: data.map(d => d.venta),
        fill: true,
        borderColor: '#fa1530',
        backgroundColor: 'rgba(250, 21, 48, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        title: { display: true, text: 'Mes' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Venta total' },
      },
    },
    plugins: {
      legend: { display: false },
      zoom: {
        pan: { enabled: true, mode: 'xy' },
        zoom: {
          pinch: { enabled: true },
          wheel: { enabled: true },
          mode: 'xy',
        },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
