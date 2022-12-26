import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();
console.log("ENV is:", process.env.ENV);

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME_TEST,
  ENV
} = process.env;

let client: Pool;

if (ENV === "DEV") {
  client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string)
  });
} else if (ENV === "TEST") {
  client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_NAME_TEST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string)
  });
} else {
  client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string)
  });
}

export default client;
