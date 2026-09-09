import pg from "pg";
import dotenv from 'dotenv'; 
dotenv.config();

const { Pool } = pg;
const host = process.env.HOST;


export const pool = new Pool({
  host: host,
  port: 5432,
  database: "electricity",
  user: "academy",
  password: "academy",
});


export default pool;