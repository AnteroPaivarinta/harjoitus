import axios from "axios";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { fetchDashboardData } from "./fetchTableData";
import type { IElectricityData } from "../types/types";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchDashboardData", () => {
  const URL = "http://localhost:3000/api/dashboard";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns dashboard data when API request succeeds", async () => {
    const mockData: IElectricityData[] = [
      {
        id: 1,
        date: "2023-09-04",
        starttime: "00:00",
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: 5,
      },
      {
        id: 2,
        date: "2023-09-04",
        starttime: "01:00",
        productionamount: 120,
        consumptionamount: 180,
        hourlyprice: -2,
      },
    ];

    mockedAxios.get.mockResolvedValue({
      data: mockData,
    });

    const result = await fetchDashboardData();

    expect(result).toEqual(mockData);
  });

  it("calls the correct API endpoint", async () => {
    const mockData: IElectricityData[] = [];

    mockedAxios.get.mockResolvedValue({
      data: mockData,
    });

    await fetchDashboardData();

    expect(mockedAxios.get).toHaveBeenCalledWith(URL);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it("throws an error when API request fails", async () => {
    const error = new Error("API request failed");

    mockedAxios.get.mockRejectedValue(error);

    await expect(fetchDashboardData()).rejects.toThrow(
      "API request failed"
    );
  });
});
