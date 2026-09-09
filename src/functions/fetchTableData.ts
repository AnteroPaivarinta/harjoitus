import axios from "axios";
import type { IElectricityData } from "../types/types";
import { API_URL, CLOUD_URL } from "../config";

export const fetchDashboardData = async (): Promise<IElectricityData[]> => {
  
  const apiDashBoardUrl = CLOUD_URL;

  try {
    const response = await axios.get<IElectricityData[]>(
      apiDashBoardUrl
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchDashboardData;