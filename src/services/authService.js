import dotenv from 'dotenv';
dotenv.config();

const client_id = process.env.SPOTIFY_API_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const baseURL = 'https://accounts.spotify.com/api/token';

const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}

const body = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`

export const getAuthToken = async () => {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: headers,
            body: body
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error: ', error.message)
    }
}

