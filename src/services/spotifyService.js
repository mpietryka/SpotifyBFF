import { BASE_URL } from '../constants.js';
import { getAuthToken, isTokenExpired } from './authService.js';

let authToken = null
const headers = {
    "Authorization": '',
    "Content-Type": "application/json"
};

const setHeaders = () => {
    headers.Authorization = `Bearer ${authToken.access_token}`;
};

// example body 
// name is the name of the artist, song or album, type is either 'album', 'artist' or 'track'
// {
//     "name": "name"
//     "type": "tracks",
//     "limit": 10
// }
export const search = async (body) => {
    if (!authToken || isTokenExpired(authToken)) {
        authToken = await getAuthToken();
        setHeaders()
    }

    const queryString = `q=${encodeURIComponent(body.name)}&type=${body.type}&limit=${body.limit}`

    try {
        const response = await fetch(`${BASE_URL}/search?${queryString}`, {
            method: 'GET',
            headers: headers
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error.message)
    }
}

// example body 
// type is either 'albums', 'artists' or 'tracks', id is a Spotify Unique id
// {
//     "type": "tracks",
//     "id": "11dFghVXANMlKmJXsNCbNl"
// }
export const getById = async (body) => {
    if (!authToken || isTokenExpired(authToken)) {
        authToken = await getAuthToken();
        setHeaders()
    }

    try {
        const response = await fetch(`${BASE_URL}/${body.type}/${body.id}`, {
            method: 'GET',
            headers: headers
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error.message)
    }
}