import { LineChart } from '@mui/x-charts/LineChart';
import type { IElectricityData, ISingleDayChartProps } from '../../types/types';
import chartSettings from './chartSettings.ts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export const SingleDayLineChart = ( props: ISingleDayChartProps ) => {

  const data: IElectricityData[] = props.data;

  const dataSet = [...data]
    .sort((a, b) => a.starttime.localeCompare(b.starttime))
    .map((d) => ({
      hour: Number(d.starttime.slice(11, 13)),
      price: d.hourlyprice ?? 0,
  }));
  

  return (
    
    <Card sx={{ widht: "100%", height: "100%"}}>
      <LineChart
        dataset={dataSet}
        xAxis={[{ dataKey: 'hour', label: "Hour" }]}
        yAxis={[{ dataKey: 'price', label: " Snt (€)" }]}
        series={[
            {
              dataKey: 'price',
              label: 'Hourly Price',
            },
        ]}
        {...chartSettings}
    />
    </Card>
  );
};

export default SingleDayLineChart;
