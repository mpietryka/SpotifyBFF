import { search, getById } from '../../src/services/spotifyService';
import { getAuthToken, isTokenExpired } from '../../src/services/authService';
import { BASE_URL } from '../../src/constants';
import { mockSearchResponse, mockGetByIdResponse } from '../fixtures/mockApiResponses.js'
mockSearchResponse

jest.mock('../../src/services/authService');
global.fetch = jest.fn();

describe('Given Spotify Service', () => {
    const mockAuthToken = { access_token: 'mock_access_token', expires_at: new Date(Date.now() + 3600 * 1000).toISOString() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('search function', () => {
        it('should fetch data from Spotify API with the correct query', async () => {
            isTokenExpired.mockReturnValueOnce(true);

            getAuthToken.mockResolvedValueOnce(mockAuthToken);
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockSearchResponse,
            });

            const body = { name: 'Nas', type: 'artist', limit: 1 };
            const result = await search(body);
            const queryString = `q=${encodeURIComponent(body.name)}&type=${body.type}&limit=${body.limit}`
            expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/search?${queryString}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${mockAuthToken.access_token}`,
                    'Content-Type': 'application/json',
                },
            });
            expect(result).toEqual(mockSearchResponse);
        });

        it('should refresh the token if expired and retry', async () => {
            const refreshed_token = { access_token: 'refreshed_token', expires_at: new Date(Date.now() + 3600 * 1000).toISOString() };

            isTokenExpired.mockReturnValueOnce(true);
            getAuthToken.mockResolvedValueOnce(refreshed_token);
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockSearchResponse,
            });

            const body = { name: 'Nas', type: 'artist', limit: 1 };
            const result = await search(body);
            const queryString = `q=${encodeURIComponent(body.name)}&type=${body.type}&limit=${body.limit}`
            expect(getAuthToken).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/search?${queryString}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${refreshed_token.access_token}`,
                    'Content-Type': 'application/json',
                },
            });
            expect(result).toEqual(mockSearchResponse);
        });

        it('should handle API errors', async () => {
            isTokenExpired.mockReturnValueOnce(false);
            getAuthToken.mockResolvedValueOnce(mockAuthToken);
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: 'Bad Request',
            });

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const body = { name: 'invalid song', type: 'track', limit: 10 };
            const result = await search(body);

            expect(result).toBeUndefined();
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error: ', 'Response status: [object Object]');

            consoleErrorSpy.mockRestore();
        });
    });

    describe('getById function', () => {
        const mockAuthToken = { access_token: 'mock_access_token', expires_at: new Date(Date.now() + 3600 * 1000).toISOString() };

        it('should fetch data by ID from Spotify API', async () => {
            isTokenExpired.mockReturnValueOnce(false);
            getAuthToken.mockResolvedValueOnce(mockAuthToken);
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockGetByIdResponse,
            });

            const body = { 'type': 'artists', 'id': '20qISvAhX20dpIbOOzGK3q' };
            const result = await getById(body);

            expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/artists/20qISvAhX20dpIbOOzGK3q`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${mockAuthToken.access_token}`,
                    'Content-Type': 'application/json',
                },
            });
            expect(result).toEqual(mockGetByIdResponse);
        });

        it('should refresh the token if expired and retry', async () => {
            const refreshed_token = { access_token: 'refreshed_token', expires_at: new Date(Date.now() + 3600 * 1000).toISOString() };

            isTokenExpired.mockReturnValueOnce(true);
            getAuthToken.mockResolvedValueOnce(refreshed_token);
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockGetByIdResponse,
            });

            const body = { 'type': 'artists', 'id': '20qISvAhX20dpIbOOzGK3q' };
            const result = await getById(body);

            expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/artists/20qISvAhX20dpIbOOzGK3q`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${mockAuthToken.access_token}`,
                    'Content-Type': 'application/json',
                },
            });
            expect(result).toEqual(mockGetByIdResponse);
        });

        it('should handle API errors', async () => {
            getAuthToken.mockResolvedValueOnce(mockAuthToken);
            isTokenExpired.mockReturnValueOnce(false);
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found',
            });

            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const body = { type: 'tracks', id: 'invalid_id' };
            const result = await getById(body);

            expect(result).toBeUndefined();
            expect(consoleErrorSpy).toHaveBeenCalledTimes(1)

            consoleErrorSpy.mockRestore();
        });
    });
});