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
import { API_URL } from './config';


const App = () => {

  const [data, setData] = useState<IStateData>({
    allElectricityData: [], allTableData: []
  });
  const [selectedRow, setSelectedRow ] = useState<IElectricityTableData>();

  
  useEffect(() => {
    const fetchData = async () => {
      const rowData: IElectricityTableData[] = [];
      try {
        const fetchData: IElectricityData[] = await fetchDashboardData();
        const groupedData: Map<string, IElectricityData[]> = Map.groupBy(fetchData, ({ date }) => date);

        for (const [date, rows] of groupedData) {

          const totalConsumption: number = calculateTotalConsumption(rows);
          const totalProduction: number = calculateTotalProduction(rows);
          const averagePrice: number = calculateAveragePricePerDay(rows);
          const longestNegativeHours: number = longestNegativePriceHours(rows);
          
          rowData.push({
            id: date,
            date: date.split("T")[0],
            totalConsumption: totalConsumption,
            totalProduction: totalProduction,
            averagePrice: averagePrice,
            longestNegativePriceHours: longestNegativeHours,
          }) 
        };
        setData({ allElectricityData: fetchData, allTableData: rowData });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log("SELECTEDROW", data.allTableData);
  }, [selectedRow], );

  

  return (
    <Box
      className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900"
      sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
      }}
    >
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}  
      >
        <Box 
          sx={{
            flex: 1,
            margin: 5
          }}
        >
          <SingleDayLineChart data={
            data.allElectricityData.filter((value) => value.date === selectedRow?.id)
          }/>
        </Box>
        <Box
          sx={{
            margin: 5,
            flex: 1
          }}
        >
          <SingleDayCard data = {selectedRow}/>
        </Box>
      </Box>
      <Box
        sx={{
          flex: "1",
          width: "100%",
          margin: 5
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