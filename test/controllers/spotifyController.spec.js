import { searchHandler, getByIdHandler } from '../../src/controllers/spotifyController.js';
import * as spotifyService from '../../src/services/spotifyService.js';
import { mockGetByIdResponse, mockSearchResponse } from '../fixtures/mockApiResponses.js';

jest.mock('../../src/services/spotifyService.js');
const mockError = new Error();

describe('spotifyController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };

        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('searchHandler', () => {
        it('should call search and send the result', async () => {
            spotifyService.search.mockResolvedValue(mockSearchResponse);

            req.body = { name: 'Nas', type: 'artist' };
            await searchHandler(req, res);

            expect(spotifyService.search).toHaveBeenCalledWith(req.body);
            expect(res.send).toHaveBeenCalledWith(mockSearchResponse);
        });

        it('should handle errors and send a 500 status', async () => {
            spotifyService.search.mockRejectedValue(mockError);

            await searchHandler(req, res);

            expect(spotifyService.search).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Issues fetching search results');
        });
    });

    describe('getByIdHandler', () => {
        it('should call getById and send the result', async () => {
            spotifyService.getById.mockResolvedValue(mockGetByIdResponse);

            req.body = { id: '123', type: 'track' };

            await getByIdHandler(req, res);

            expect(spotifyService.getById).toHaveBeenCalledWith(req.body);
            expect(res.send).toHaveBeenCalledWith(mockGetByIdResponse);
        });

        it('should handle errors and send a 500 status', async () => {
            spotifyService.getById.mockRejectedValue(mockError);

            await getByIdHandler(req, res);

            expect(spotifyService.getById).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Issues fetching your undefined');
        });
    });
});