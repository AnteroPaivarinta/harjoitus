import { describe, expect, test } from '@jest/globals';
import calculateTotalConsumption from './calculateTotalConsumption';
import type { IElectricityData } from '../types/types';

describe('calculateTotalConsumption', () => {
  test('calculates total electricity consumption', () => {
    const data: IElectricityData[] = [
      {
        id: 1,
        date: '2023-08-17',
        starttime: '2023-08-17T00:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: 10,
      },
      {
        id: 2,
        date: '2023-08-17',
        starttime: '2023-08-17T01:00:00',
        productionamount: 150,
        consumptionamount: 300,
        hourlyprice: 20,
      },
      {
        id: 3,
        date: '2023-08-17',
        starttime: '2023-08-17T02:00:00',
        productionamount: 200,
        consumptionamount: 500,
        hourlyprice: 30,
      },
    ];

    const result = calculateTotalConsumption(data);

    expect(result).toBe(1000);
  });

  test('treats null consumption as 0', () => {
    const data: IElectricityData[] = [
      {
        id: 1,
        date: '2023-08-17',
        starttime: '2023-08-17T00:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: 10,
      },
      {
        id: 2,
        date: '2023-08-17',
        starttime: '2023-08-17T01:00:00',
        productionamount: 150,
        consumptionamount: null,
        hourlyprice: 20,
      },
      {
        id: 3,
        date: '2023-08-17',
        starttime: '2023-08-17T02:00:00',
        productionamount: 200,
        consumptionamount: 300,
        hourlyprice: 30,
      },
    ];

    const result = calculateTotalConsumption(data);

    expect(result).toBe(500);
  });

  test('returns 0 when data is empty', () => {
    const data: IElectricityData[] = [];

    const result = calculateTotalConsumption(data);

    expect(result).toBe(0);
  });
});