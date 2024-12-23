# What?

This project is an ExpressJS BFF (Backend For Frontend) Service for fetching data from Spotify API. This service is intended to sit between your front-end application and the Spotify API.

# Why?

This app was created mainly as a practice, in order to learn ExpressJS and practice unit testing on server side applications. At work, I rarely have a chance to design and implement an API. This was fun. 

This project being a BFF also allows us to not keep any sensitive keys in our UI application and keep things simple on the client side. 

# How?

Client app makes the request to the BFF, BFF requests the auth token from Spotify API, stores it for future requests, makes the request and forwards the response back to the client.

![Sequence diagram](https://github.com/user-attachments/assets/ced5ed8e-176d-4d3d-a0d2-48ccefdbe6c6)

The token is only valid for an hour, at every request coming from the client, BFF will check whether the token is expired before making a request to Spotify API and if it is, it will request the new one.

# How to run?

1. Clone this repository
2. Follow the getting started guide on Spotify developer portal [https://developer.spotify.com/documentation/web-api/tutorials/getting-started](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)
3. Create a **.env** file in the root folder and add the following 

```shell
SPOTIFY_API_ID=your_spotify_api_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

1. Run
```npm install```
3. Your app is now running on port 3001

Take a look at the contract to see the example requests.
