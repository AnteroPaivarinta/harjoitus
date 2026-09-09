import { useState, useEffect } from 'react';
import type { IElectricityData,  IElectricityTableData, IStateData } from './types/types';
import './App.css';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Columns from './columns/columns';
import { fetchDashboardData } from './functions/fetchTableData';
import longestNegativePriceHours from './functions/longestNegativePriceHours';
import SingleDayLineChart from './components/SingleDayChart/SingleDayChart';
import SingleDayCard from './components/SingleDayCard/SingleDayCard';
import calculateTotalConsumption from './functions/calculateTotalConsumption';
import calculateTotalProduction from './functions/calculateTotalProduction';
import { calculateAveragePricePerDay } from './functions/calculateAveragePricePerDay';


const App = () => {
  // Store both the original electricity data and the calculated 
  // // daily summary data used by the DataGrid.
  const [data, setData] = useState<IStateData>({
    allElectricityData: [], allTableData: []
  });
  // Store the currently selected row from the DataGrid.
  //  // The selected row contains the calculated statistics for one day.
  const [selectedRow, setSelectedRow ] = useState<IElectricityTableData>();

  
  useEffect(() => {

    // Fetch the electricity data and calculate the daily statistics.
    const fetchData = async () => {
      const rowData: IElectricityTableData[] = [];
      try {
        
        // Group the electricity measurements by date. 
        // // Each date gets its own array containing all measurements 
        // // recorded for that day.
        const fetchData: IElectricityData[] = await fetchDashboardData();
        const groupedData: Map<string, IElectricityData[]> = Map.groupBy(fetchData, ({ date }) => date);


        // Process each day's measurements separately.
        for (const [date, rows] of groupedData) {


          // Calculate the total electricity consumption for the day.
          const totalConsumption: number = calculateTotalConsumption(rows);
          // Calculate the total electricity production for the day.
          const totalProduction: number = calculateTotalProduction(rows);
          // Calculate the average electricity price for the day.
          const averagePrice: number = calculateAveragePricePerDay(rows);
          // Find the longest continuous period with a negative 
          // // electricity price during the day.
          const longestNegativeHours: number = longestNegativePriceHours(rows);
          
          // Create one summary row for the DataGrid.
          rowData.push({
            id: date,
            date: date.split("T")[0],
            totalConsumption: totalConsumption,
            totalProduction: totalProduction,
            averagePrice: averagePrice,
            longestNegativePriceHours: longestNegativeHours,
          }) 
        };
        // Store both the original API data and the calculated
        //  // daily summary rows in React state.
        setData({ allElectricityData: fetchData, allTableData: rowData });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [selectedRow], );

  return (
    <Box
      className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%"
        }}  
      >
        <Box 
          sx={{
            flex: 1,
            p: 5
          }}
        >
          <SingleDayLineChart data={
            data.allElectricityData.filter((value) => value.date === selectedRow?.id)
          }/>
        </Box>
        <Box
          sx={{
            p: 5,
            flex: 1
          }}
        >
          <SingleDayCard data = {selectedRow}/>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          p: 5,
          display: "flex"
        }} 
      >
        <DataGrid
          rows={data.allTableData}
          columns={Columns}
          onRowClick={(params) => {
            setSelectedRow(params.row);
          }}
        />
      </Box>
    </Box>
  );
};

export default App;