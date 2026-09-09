import fs from "fs";
import path from "path";

export const filterDateSql = fs.readFileSync(
  path.join(__dirname, "sql", "filterDateData.sql"),
  "utf-8"
);

export const dashBoardData = fs.readFileSync(
  path.join(__dirname, "sql", "dashBoardData.sql"),
  "utf-8"
);