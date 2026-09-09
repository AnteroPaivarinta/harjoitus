import { describe, expect, test } from '@jest/globals';
import longestNegativePriceHours from './longestNegativePriceHours';
import type { IElectricityData } from '../types/types';

describe('longestNegativePriceHours', () => {
  test('returns the longest consecutive period of negative prices', () => {
    const data: IElectricityData[] = [
      {
        id: 1,
        date: '2023-08-17',
        starttime: '2023-08-17T00:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: -10,
      },
      {
        id: 2,
        date: '2023-08-17',
        starttime: '2023-08-17T01:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: -20,
      },
      {
        id: 3,
        date: '2023-08-17',
        starttime: '2023-08-17T02:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: 10,
      },
      {
        id: 4,
        date: '2023-08-17',
        starttime: '2023-08-17T03:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: -5,
      },
      {
        id: 5,
        date: '2023-08-17',
        starttime: '2023-08-17T04:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: -15,
      },
      {
        id: 6,
        date: '2023-08-17',
        starttime: '2023-08-17T05:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: -25,
      },
    ];

    const result = longestNegativePriceHours(data);

    expect(result).toBe(3);
  });

  test('null price breaks the negative price sequence', () => {
    const data: IElectricityData[] = [
      {
        id: 1,
        date: '2023-08-17',
        starttime: '2023-08-17T00:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: -10,
      },
      {
        id: 2,
        date: '2023-08-17',
        starttime: '2023-08-17T01:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: null,
      },
      {
        id: 3,
        date: '2023-08-17',
        starttime: '2023-08-17T02:00:00',
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: -20,
      },
    ];

    const result = longestNegativePriceHours(data);

    expect(result).toBe(1);
  });

  test('returns 0 when there are no negative prices', () => {
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
        productionamount: 100,
        consumptionamount: 200,
        hourlyprice: 20,
      },
    ];

    const result = longestNegativePriceHours(data);

    expect(result).toBe(0);
  });

  test('returns 0 when data is empty', () => {
    const data: IElectricityData[] = [];

    const result = longestNegativePriceHours(data);

    expect(result).toBe(0);
  });
});