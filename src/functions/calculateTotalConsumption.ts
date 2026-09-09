import type { IElectricityData } from "../types/types";


export const calculateTotalConsumption = (data: IElectricityData[]) => {

  const totalConsumptionAmount = data.reduce(
    (sum, row) => sum + (row.consumptionamount ?? 0), 0
  );  
  return totalConsumptionAmount;
}


export default calculateTotalConsumption;