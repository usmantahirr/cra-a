import dotenv from 'dotenv';
dotenv.config();
export const dbConfig = {
  connectionString: process.env.CONNECTION_URI,
  database: process.env.DB || '',
  cosmos_endpoint: process.env.COSMOS_ENDPOINT || '',
  cosmos_key: process.env.COSMOS_KEY || '',
};
