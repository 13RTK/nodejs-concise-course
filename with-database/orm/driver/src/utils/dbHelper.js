import { Client } from 'pg';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
};
console.log(config);

const client = new Client(config);

await client.connect();

export default client;
