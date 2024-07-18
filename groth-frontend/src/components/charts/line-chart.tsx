import { Line } from 'react-chartjs-2';
import { ILineChartProps } from '../../core/types/assets';
import moment from 'moment';

export const LineChart: React.FC<ILineChartProps> = (
  props: ILineChartProps
) => {
  const { data } = props;

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const values = {
    labels: data[0].price_chart_data.map((el: any) =>
      moment(el[0]).format('DD.MM.YY')
    ),
    datasets: [
      {
        label: data[0].name.charAt(0).toUpperCase() + data[0].name.slice(1),
        data: data[0].price_chart_data.map((el: any) => {
          return el[1];
        }),
        backgroundColor: 'rgba(255,99,132,0.5)',
        borderColor: 'rgb(255,99,132)',
      },
    ],
  };

  return <Line data={values} options={options} width={'100%'} height={'20%'} />;
};
