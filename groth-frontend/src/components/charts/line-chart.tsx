import { Line } from 'react-chartjs-2';
import { ILineChartProps } from '../../core/types/assets';
import moment from 'moment';

export const LineChart = (props: ILineChartProps) => {
  const { data } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const values = {
    labels: data[0].price_chart_data.map((el: any) =>
      moment(el[0]).format('DD.MM.YY')
    ),
    datasets: [
      {
        label: 'Price',
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
