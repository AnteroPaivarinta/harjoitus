export interface IElectricityData {
  id: number;
  date: string;
  starttime: string;
  productionamount: number | null;
  consumptionamount: number | null;
  hourlyprice: number | null;
}

export interface IElectricityTableData {
  id: string;
  date: string;
  totalConsumption: number;
  totalProduction: number;
  averagePrice: number;
  longestNegativePriceHours: number;
}


export interface ISingleDayChartProps {
  data: IElectricityData[]
};

export interface ISingleDayCardCataProps {
  data: IElectricityTableData | undefined;
}

export interface IStateData {
  allElectricityData: IElectricityData[],
  allTableData: IElectricityTableData[],
}