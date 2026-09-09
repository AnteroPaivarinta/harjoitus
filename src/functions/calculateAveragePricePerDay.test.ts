import { describe, expect, test } from '@jest/globals';
import { calculateAveragePricePerDay } from './calculateAveragePricePerDay';
import type { IElectricityData } from '../types/types';

describe('calculateAveragePricePerDay', () => {
  test('calculates average price correctly', () => {
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
        consumptionamount: 250,
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

    const result = calculateAveragePricePerDay(data);

    expect(result).toBe(20);
  });

  test('ignores null hourly prices', () => {
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
        consumptionamount: 250,
        hourlyprice: null,
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

    const result = calculateAveragePricePerDay(data);

    expect(result).toBe(20);
  });

  test('returns 0 when data is empty', () => {
    const data: IElectricityData[] = [];

    const result = calculateAveragePricePerDay(data);

    expect(result).toBe(0);
  });
});