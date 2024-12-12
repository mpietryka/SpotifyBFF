import express from 'express';
import bodyParser from 'body-parser';
import { getById, search } from './services/getFromSpotify.js';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.post('/test', (req, res) => {
    console.log('body', req.body);
    const response = `${req.body.greeting}, ${req.body.name}`
    res.send(response);
})

app.get('/search', async (req, res) => {
    try {
        const result = await search(req.body);
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('Issues fetching search results');
    }
})

app.get('/getById', async (req, res) => {
    try {
        const result = await getById(req.body);
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send(`Issues fetching your ${req.body.type}`);
    }
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));