import { LineChart } from '@mui/x-charts/LineChart';
import type { IElectricityData, ISingleDayChartProps } from '../../types/types';
import chartSettings from './chartSettings.ts';
import Card from '@mui/material/Card';

export const SingleDayLineChart = ( props: ISingleDayChartProps ) => {


  // Prepare the data for the MUI LineChart.
  //
  // The data is first sorted by start time to make sure that
  // the points appear in chronological order on the chart.
  //
  // The hour is extracted from the timestamp and converted to a number.
  // The hourly electricity price is used as the value for the line.
  // If the price is null, 0 is used instead.


  // The electricity data for the selected day is received through props.
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
