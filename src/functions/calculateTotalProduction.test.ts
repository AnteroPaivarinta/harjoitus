import { describe, expect, test } from '@jest/globals';
import calculateTotalProduction from './calculateTotalProduction';
import type { IElectricityData } from '../types/types';

describe('calculateTotalProduction', () => {
  test('calculates total electricity production', () => {
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
        productionamount: 300,
        consumptionamount: 250,
        hourlyprice: 20,
      },
      {
        id: 3,
        date: '2023-08-17',
        starttime: '2023-08-17T02:00:00',
        productionamount: 500,
        consumptionamount: 400,
        hourlyprice: 30,
      },
    ];

    const result = calculateTotalProduction(data);

    expect(result).toBe(900);
  });

  test('treats null production as 0', () => {
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
        productionamount: null,
        consumptionamount: 250,
        hourlyprice: 20,
      },
      {
        id: 3,
        date: '2023-08-17',
        starttime: '2023-08-17T02:00:00',
        productionamount: 300,
        consumptionamount: 400,
        hourlyprice: 30,
      },
    ];

    const result = calculateTotalProduction(data);

    expect(result).toBe(400);
  });

  test('returns 0 when data is empty', () => {
    const data: IElectricityData[] = [];

    const result = calculateTotalProduction(data);

    expect(result).toBe(0);
  });
});