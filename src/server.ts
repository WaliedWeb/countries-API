import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDatabase, getCountryCollection } from './utils/database';

// Check whether the MONGODB_COUNTRY_URL is a valid string for further processing
if (!process.env.MONGODB_COUNTRY_URL) {
  throw new Error('No MONGODB Country URL in dotenv available');
}

const app = express();
const port = 3000;

app.use(express.json());

/* const country = {
  name: 'Germany',
  capital: 'Berlin',
  population: '83129285'
} */

app.post('/api/countries', (request, response) => {
  const newCountry = request.body;
  const countryCollection = getCountryCollection();
  countryCollection.insertOne(newCountry);
  response.send(newCountry);
});

// Start connection with database and start server
connectDatabase(process.env.MONGODB_COUNTRY_URL).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
