import { ScriptableContext } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Chart, registerables } from 'chart.js';
import { IAreaChartProps } from '../../core/types/assets';
Chart.register(...registerables);

export const AreaChart = (props: IAreaChartProps) => {
  const { data } = props;

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const values = {
    labels: data.map((el: number[]): string =>
      moment(el[0]).format('DD.MM.YY')
    ),
    datasets: [
      {
        fill: 'start',
        label: 'Price',
        data: data.map((el: number[]): number => {
          return el[1] as number;
        }),
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 180);
          gradient.addColorStop(0, '#C1EF00');
          gradient.addColorStop(1, '#232323');
          return gradient;
        },
      },
    ],
  };
  return <Line data={values} options={options} width={300} height={100} />;
};
