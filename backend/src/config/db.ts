import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

let db;

if (process.env.MYSQL_URL) {
  // Railway / production
  db = mysql.createConnection(process.env.MYSQL_URL);
} else {
  // Local VS Code
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
  });
}

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ MySQL connected successfully");
});

export default db;
