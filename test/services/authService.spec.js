import { getAuthToken, isTokenExpired } from '../../src/services/authService';
import { mockAuthResponse } from '../fixtures/mockApiResponses.js'

global.fetch = jest.fn();

describe('getAuthToken function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a valid auth token with expires_at', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockAuthResponse,
        });

        const authToken = await getAuthToken();

        expect(authToken.access_token).toEqual(mockAuthResponse.access_token)
        expect(authToken.token_type).toEqual(mockAuthResponse.token_type)
        expect(authToken.expires_in).toEqual(mockAuthResponse.expires_in)
        expect(authToken).toHaveProperty('expires_at');
        expect(new Date(authToken.expires_at)).toBeInstanceOf(Date);
    });

    it('should throw an error if the API response is not ok', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
        });

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        const authToken = await getAuthToken();

        expect(authToken).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error: ', 'Response status: 401');

        consoleErrorSpy.mockRestore();
    });
});

describe('isTokenExpired function', () => {
    it('should return false for a valid token that is not expired', () => {
        const validToken = {
            expires_at: new Date(Date.now() + 3600 * 1000).toISOString()
        };

        expect(isTokenExpired(validToken)).toEqual(false);
    });

    it('should return true for an expired token', () => {
        const expiredToken = {
            expires_at: new Date(Date.now() - 1000).toISOString(),
        };

        expect(isTokenExpired(expiredToken)).toEqual(true);
    });
});