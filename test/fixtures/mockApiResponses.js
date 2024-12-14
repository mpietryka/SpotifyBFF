export const mockAuthResponse = {
    access_token: 'mock_access_token',
    token_type: 'Bearer',
    expires_in: 3600,
};

export const mockSearchResponse = {
    "artists": {
        "href": "https://api.spotify.com/v1/search?offset=0&limit=1&query=Nas&type=artist&locale=*",
        "limit": 1,
        "next": "https://api.spotify.com/v1/search?offset=1&limit=1&query=Nas&type=artist&locale=*",
        "offset": 0,
        "previous": null,
        "total": 100,
        "items": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/20qISvAhX20dpIbOOzGK3q"
                },
                "followers": {
                    "href": null,
                    "total": 3993183
                },
                "genres": [
                    "conscious hip hop",
                    "east coast hip hop",
                    "gangster rap",
                    "hardcore hip hop",
                    "hip hop",
                    "queens hip hop",
                    "rap"
                ],
                "href": "https://api.spotify.com/v1/artists/20qISvAhX20dpIbOOzGK3q",
                "id": "20qISvAhX20dpIbOOzGK3q",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb153198caeef9e3bda92f9285",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174153198caeef9e3bda92f9285",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178153198caeef9e3bda92f9285",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Nas",
                "popularity": 74,
                "type": "artist",
                "uri": "spotify:artist:20qISvAhX20dpIbOOzGK3q"
            }
        ]
    }
};

export const mockGetByIdResponse = {
    "external_urls": {
        "spotify": "https://open.spotify.com/artist/20qISvAhX20dpIbOOzGK3q"
    },
    "followers": {
        "href": null,
        "total": 3993183
    },
    "genres": [
        "conscious hip hop",
        "east coast hip hop",
        "gangster rap",
        "hardcore hip hop",
        "hip hop",
        "queens hip hop",
        "rap"
    ],
    "href": "https://api.spotify.com/v1/artists/20qISvAhX20dpIbOOzGK3q?locale=*",
    "id": "20qISvAhX20dpIbOOzGK3q",
    "images": [
        {
            "url": "https://i.scdn.co/image/ab6761610000e5eb153198caeef9e3bda92f9285",
            "height": 640,
            "width": 640
        },
        {
            "url": "https://i.scdn.co/image/ab67616100005174153198caeef9e3bda92f9285",
            "height": 320,
            "width": 320
        },
        {
            "url": "https://i.scdn.co/image/ab6761610000f178153198caeef9e3bda92f9285",
            "height": 160,
            "width": 160
        }
    ],
    "name": "Nas",
    "popularity": 74,
    "type": "artist",
    "uri": "spotify:artist:20qISvAhX20dpIbOOzGK3q"
};