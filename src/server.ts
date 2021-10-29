import express from 'express';

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
  response.send(newCountry);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
