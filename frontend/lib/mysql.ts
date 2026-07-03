import mysql from "mysql2/promise";

// Cache the connection pool in Next.js Dev/HMR mode
let pool: mysql.Pool | null = null;

export function getMysqlPool(): mysql.Pool {
  if (pool) return pool;

  const host = process.env.MYSQL_HOST || "127.0.0.1";
  const port = parseInt(process.env.MYSQL_PORT || "3306", 10);
  const user = process.env.MYSQL_USER || "nora_admin";
  const password = process.env.MYSQL_PASSWORD || "nora_secure_pass";
  const database = process.env.MYSQL_DATABASE || "nora_db";

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
  });

  console.log(`Created Next.js connection pool for MySQL Database: ${database}`);
  return pool;
}
