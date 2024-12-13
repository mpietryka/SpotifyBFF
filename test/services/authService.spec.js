import { getAuthToken, isTokenExpired } from "../../src/services/authService";

const mockResponse = {
    access_token: 'mock_access_token',
    token_type: 'Bearer',
    expires_in: 3600,
};

global.fetch = jest.fn();

describe('getAuthToken', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a valid auth token with expires_at', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const authToken = await getAuthToken();

        expect(authToken.access_token).toEqual(mockResponse.access_token)
        expect(authToken.token_type).toEqual(mockResponse.token_type)
        expect(authToken.expires_in).toEqual(mockResponse.expires_in)
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

describe('isTokenExpired', () => {
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