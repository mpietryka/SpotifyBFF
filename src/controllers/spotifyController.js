import { getById, search } from '../services/spotifyService.js';

export const searchHandler = async (req, res) => {
    try {
        const result = await search(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Issues fetching search results');
    }
};

export const getByIdHandler = async (req, res) => {
    try {
        const result = await getById(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Issues fetching your ${req.body.type}`);
    }
};