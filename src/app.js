import express from 'express';
import bodyParser from 'body-parser';
import { searchHandler, getByIdHandler } from './controllers/spotifyController.js';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.get('/search', searchHandler);
app.get('/getById', getByIdHandler);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));