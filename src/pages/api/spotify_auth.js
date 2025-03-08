var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

export default async function GetSpotifyAuth({ req , res }) {
    let token = '';
    let data = {};
    await fetch('http://localhost:5000/user_info' , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.json())
    .then(resp => {
        token = resp[0].access_token;
        data = resp[0];
        console.log("---------------------------------------------------------------")
        console.log(`token : ${token}`)
        console.log("---------------------------------------------------------------")
    })
    .catch(err =>{console.log(err)}) 

    const conteudoDoFetchFudido = await fetch(`https://api.spotify.com/v1/users/${process.env.CLIENT_ID}/playlists`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp)
    })
    .catch(err => {
        console.log(err)
    })

    spotifyApi.setAccessToken(token);
    // const dataPlaylists = spotifyApi.getUserPlaylists(process.env.USERNAME);

    console.log("---------------------------------------------------------------")
    console.log(`response : ${conteudoDoFetchFudido}`)
    console.log("---------------------------------------------------------------")
    let playlists = []
    let model = [{
        "music_name" : String,
        "data" : String
    }]
    for (let playlist of conteudoDoFetchFudido.items) {
        console.log(playlist.name + " " + playlist.id)
        
        let tracks = await getPlaylistTracks(playlist.id, playlist.name);

        const tracksJSON = { tracks }
        let data = JSON.stringify(tracksJSON);
        
        model.push({
            "music_name" : playlist.name,
            "data" : data
        })
    }

    res.json({
        "response" : model
    })    
}