const SpotifyWebApi = require("spotify-web-api-node");
const WebSocket = require("ws");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:3000/api/callback",
});

let access_token = "";
let refresh_token = "";
let expires_in = "";
let code = "";

let model = {};

export default async function CallbackSpotify(req, res) {
  const error = req.query.error;
  const state = req.query.state;
  code = req.query.code;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  if (!code) {
    console.log("Authorization code is missing!");
    res.send("Authorization code is missing!");
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      access_token = data.body["access_token"];
      refresh_token = data.body["refresh_token"];
      expires_in = data.body["expires_in"];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const new_access_token = data.body["access_token"];

        const newModel = {
          "id" : "",
          "access_token": new_access_token,
          "refresh_token": refresh_token,
          "expires_in": expires_in,
          "auth_code": code
        };

        fetch(`http://localhost:5000/user_info`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newModel),
        })
          .then((resp) => resp.json())
          .catch((err) => console.log(err));

        console.log("The access token has been refreshed!");
        console.log("access_token:", access_token);
        spotifyApi.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);

      res.json({
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in: expires_in,
        auth_code: code,
      });

      model = {
        id: "",
        access_token: access_token,
        refresh_token: refresh_token,
        expires_in: expires_in,
        auth_code: code,
      };
    })
    .then(() => {
      fetch(`http://localhost:5000/user_info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      })
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
}
