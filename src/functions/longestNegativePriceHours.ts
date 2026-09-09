import type { IElectricityData } from "../types/types";

export const longestNegativePriceHours = (rows: IElectricityData[]) => {
  let currentNegativeHours = 0;
  let longestNegativeHours = 0;

  for (const row of rows) {
    if (row.hourlyprice !== null && row.hourlyprice < 0) {
      currentNegativeHours++;

      if (currentNegativeHours > longestNegativeHours) {
        longestNegativeHours = currentNegativeHours;
      }
    } else {
      currentNegativeHours = 0;
    }
  }
  return longestNegativeHours;
}


export default longestNegativePriceHours;