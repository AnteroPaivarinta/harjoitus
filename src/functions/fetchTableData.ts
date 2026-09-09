import axios from "axios";
import type { IElectricityData } from "../types/types";
import { API_URL } from "../config";

export const fetchDashboardData = async (): Promise<IElectricityData[]> => {
  
  const apiDashBoardUrl = API_URL;
  console.log("APIURL", API_URL);

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