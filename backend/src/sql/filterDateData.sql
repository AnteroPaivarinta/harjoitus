SELECT
    date,
    startTime,
    consumptionAmount,
    productionAmount,
    hourlyPrice
FROM electricitydata
WHERE date = $1
ORDER BY startTime;