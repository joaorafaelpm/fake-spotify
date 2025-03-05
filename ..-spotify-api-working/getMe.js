const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDIejONV16YS4aoVLP7jE4X9-RXRpN4_SLQNFuaPKzfHqhrgSJB3f9P1_ilL3E0Y205saiuHDVM0eANkL6ShzsREluf6A7lnrEaZlfPr4Hbm6C6NTO1F6Mz2UjfwHrzJeNgaDa6vuLl68rCkNv3bVRAtjn7WN2262gNtFktnrb1j3iN8ikt9iQRSHpgCz6HJdKC6prN2oHeLcAqLjHjJs9EwS8aqL7SXn-1RKpyrzNSjX8_hf-vF-1CBMtMTtsCEC7Hnvg2xLm3txTNERcQONZE6tFHbOx-QamiPK0nxMMNb2o5418fH4u3v5G9Zs8Kp4axNN0fhOD4p9tGhPpDUN29z89_7Of2qo8mKnHia7BCIx49wVYJxtYu";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

// getMyData();

getUserPlaylists("31cvnuyg2sl5j3wyhecidg2tq7bq");