var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

export default async function GetSpotifyAuth({ req , res }) {
    const data = await fetch('localhost:3000/api/current_user' , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.json())
    .catch(err => console.log(err))

    const token = data.access_token;

    spotifyApi.setAccessToken(token);
    const dataPlaylists = spotifyApi.getUserPlaylists(process.env.USERNAME);

    let playlists = []
    let response = [{
        "music_name" : "",
        "data" : ""
    }]
    for (let playlist of dataPlaylists.body.items) {
        console.log(playlist.name + " " + playlist.id)
        
        let tracks = await getPlaylistTracks(playlist.id, playlist.name);

        const tracksJSON = { tracks }
        let data = JSON.stringify(tracksJSON);
        
        response.push({
            "music_name" : playlist.name,
            "data" : data
        })
    }

    res.json({
        "response" : response
    })    
}