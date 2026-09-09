SELECT
    id,
    date,
    starttime,
    productionamount::float8 AS productionamount,
    consumptionamount::float8 AS consumptionamount,
    hourlyprice::float8 AS hourlyprice
FROM electricitydata
ORDER BY date, startTime;