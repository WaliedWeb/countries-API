import express from 'express';
import { getCountryCollection } from '../../src/utils/database';

const router = express.Router();

// Post one country
router.post('/api/countries', async (request, response) => {
  const newCountry = request.body;
  const countryCollection = getCountryCollection();

  if (
    typeof newCountry.name !== 'string' ||
    typeof newCountry.capital !== 'string' ||
    typeof newCountry.population !== 'number'
  ) {
    response.status(400).send('Missing properties');
    return;
  }

  const existingCountry = await countryCollection.findOne({
    name: newCountry.name,
  });

  if (!existingCountry) {
    const countryDocument = await countryCollection.insertOne(newCountry);
    const responseDocument = { ...newCountry, ...countryDocument.insertedId };
    response.status(200).send(responseDocument);
  } else {
    response.status(409).send('Countryname is already taken');
  }
});

// update
router.patch('/api/countries/:name', async (request, response) => {
  const countryCollection = getCountryCollection();
  const countryName = request.params.name;
  const updateItem = request.body;

  // const allCountries = await countryCollection.find().toArray();

  countryCollection.updateOne({ name: `${countryName}` }, { $set: updateItem });
  response.send('Successfully updated!');
});

// Delete one country
router.delete('/api/countries/:name', async (request, response) => {
  const countryCollection = getCountryCollection();
  const allCountries = await countryCollection.find().toArray();

  const countryIndex = allCountries.findIndex(
    (country) => country.name === request.params.name
  );
  console.log(countryIndex);
  if (countryIndex === -1) {
    response.status(404).send("Country doesn't exist. Check another Castle 🏰");
    return;
  } else {
    countryCollection.deleteOne({ name: request.params.name });
    response.send('The country was successfully deleted!');
  }
});

// Get all countries
router.get('/api/countries', async (_request, response) => {
  const countryDocuments = await getCountryCollection().find().toArray();

  if (countryDocuments.length > 0) {
    response.status(200).send(countryDocuments);
  } else {
    response.status(409).send('Countries do not exist.');
  }
});

export default router;
