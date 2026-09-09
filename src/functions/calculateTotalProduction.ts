import type { IElectricityData } from "../types/types";


export const calculateTotalProduction = (data: IElectricityData[]) => {

  const totalConsumptionAmount = data.reduce(
    (sum, row) => sum + (row.productionamount ?? 0), 0
  );  
  return totalConsumptionAmount;
}


export default calculateTotalProduction;