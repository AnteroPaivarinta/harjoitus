import type { IElectricityData } from "../types/types";

export const calculateAveragePricePerDay = (data:  IElectricityData[]) => {
  const prices = data
            .map(row => row.hourlyprice)
            .filter((price): price is number => price !== null);
  const averagePrice =
            prices.length > 0
              ? prices.reduce((sum, price) => sum + price, 0) / prices.length
              : 0;
  return averagePrice;
}