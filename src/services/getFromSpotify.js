import { getAuthToken } from './authService.js';

const authToken = await getAuthToken()
const baseURL = 'https://api.spotify.com/v1'
const headers = {
    "Authorization": `Bearer ${authToken.access_token}`,
    "Content-Type": "application/json"
};

export const search = async (body) => {
    const queryString = `q=${encodeURIComponent(body.name)}&type=${body.type}&limit=${body.limit}`

    try {
        const response = await fetch(`${baseURL}/search?${queryString}`, {
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
    try {
        const response = await fetch(`${baseURL}/${body.type}/${body.id}`, {
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