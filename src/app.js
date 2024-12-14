import express from 'express';
import bodyParser from 'body-parser';
import { getById, search } from './services/spotifyService.js';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

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