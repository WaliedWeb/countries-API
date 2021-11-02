import dotenv from 'dotenv';
dotenv.config();
import router from '../src/countries/router';

import express from 'express';
import { connectDatabase } from './utils/database';

// Check whether the MONGODB_COUNTRY_URL is a valid string for further processing
if (!process.env.MONGODB_COUNTRY_URL) {
  throw new Error('No MONGODB Country URL in dotenv available');
}

const app = express();
const port = 3000;

app.use(express.json());

app.use(router);

// Start connection with database and start server
connectDatabase(process.env.MONGODB_COUNTRY_URL).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
