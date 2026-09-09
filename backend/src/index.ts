import express, { Request, Response } from "express";
import { pool } from "./db";
import {filterDateSql, dashBoardData} from './sqlFileImports';
import cors from  'cors';
import dotenv from 'dotenv'; 

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

// Test endpoins
app.get("/api/hello", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});

app.get("/api/dashboard", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(dashBoardData);
    res.json(result.rows);
  } catch (error) {
    console.error("Dashboard query failed:", error);

    res.status(500).json({
      error: "Failed to fetch dashboard data" + error
    });
  }
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});