import type { GridColDef } from "@mui/x-data-grid";
import type { IElectricityTableData } from "../types/types";

export const Columns: GridColDef<IElectricityTableData>[] = [
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    editable: false,
    sortable: false,
  },
  {
    field: 'totalConsumption',
    headerName: 'Total Consumption',
    flex: 1,
    editable: false,
    sortable: false,
  },
  {
    field: 'averagePrice',
    headerName: 'Average Price',
    type: 'number',
    sortable: false,
    flex: 1,
    editable: false,
  },
  {
    field: 'longestNegativePriceHours',
    headerName: 'Longest Negative Price Hours',
    rowHeader: true,
    sortable: false,
    flex: 1,
  }
];

export default Columns; 