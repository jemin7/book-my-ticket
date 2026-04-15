import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const ENV_Checker = (value, fallback = undefined) => {
  if (value === undefined || value === null) {
    return fallback;
  }

  const value1 = String(value).trim();
  return value1.length > 0 ? value1 : fallback;
};

const dbConfig = {
  connectionString: ENV_Checker(process.env.DATABASE_URL),
  host: ENV_Checker(process.env.DB_HOST, "localhost"),
  port: Number(ENV_Checker(process.env.DB_PORT, 5433)),
  user: ENV_Checker(process.env.DB_USER, "postgres"),
  password: ENV_Checker(process.env.DB_PASSWORD, "postgres"),
  database: ENV_Checker(process.env.DB_NAME, "sql_class_2_db"),
  max: Number(ENV_Checker(process.env.DB_POOL_MAX, 10)),
  idleTimeoutMillis: Number(
    ENV_Checker(process.env.DB_IDLE_TIMEOUT_MS, 10000),
  ),
  connectionTimeoutMillis: Number(
    ENV_Checker(process.env.DB_CONNECTION_TIMEOUT_MS, 5000),
  ),
};

if (dbConfig.connectionString) {
  delete dbConfig.host;
  delete dbConfig.port;
  delete dbConfig.user;
  delete dbConfig.password;
  delete dbConfig.database;
}

const pool = new Pool(dbConfig);

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

const query = (text, params = []) => pool.query(text, params);

const getClient = () => pool.connect();

const withTransaction = async (callback) => {
  const client = await getClient();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const connectDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected successfully at:", res.rows[0].now);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

const closeDatabaseConnection = async () => {
  await pool.end();
};

export {
  pool,
  query,
  getClient,
  withTransaction,
  connectDB,
  closeDatabaseConnection,
};

export default pool;
