"use client"
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import Biblioteca from "../Components/Layout/MusicDisplay/Biblioteca";
import Main from "@/Components/Main";
import Discover from "@/Components/Layout/MusicDisplay/Discover";
import PlayingNow from "@/Components/Layout/MusicDisplay/PlayingNow";

import { getLocalStorage, setLocalStorage } from "../../Config/localStorageHandler";
import { fetchAvailableDevices, fetchPlayingTrack, fetchSpotifyProfile, fetchUserFavoriteMusics, fetchUserPlaylist, fetchUserSavedAlbums, fetchUserFollowingArtist} from "@/domain/service/user";



export default function MainPage() {
  const [user , setUser]  = useState({});
  const [userImage , setUserImage] = useState("");
  const [currentlyTrack , setCurrentlyTrack] = useState([])
  const [availableDevices , setAvailableDevices] = useState([])

  const [userLikeMusics , setUserLikeMusics] = useState([])
  const [userArtists , setUserArtists] = useState([])
  const [userPlaylists , setUserPlaylists] = useState([])
  const [userAlbums , setUserAlbums] = useState([])
  let token = null ; 
  let playlistEMusicas = [] ; 

  useEffect(()=> {
    if (getLocalStorage("is_logged") === true) {
      token = document.cookie.split("; ").find(cookie => cookie.startsWith("accessToken=")).split("=")[1];
    }
  })

  async function fetchToken() {
    const response = await fetch('http://localhost:3000/api/refresh' , {
      method: "POST",
      headers: {
      "Content-Type" : "aplication/json"
      },
      body : JSON.stringify({
        refreshToken : document.cookie.split(';').find(cookie => cookie.startsWith('refreshToken=')).split('=')[1]
      })
    });
    const data = await response.json();
    if (data.accessToken) {
      setLocalStorage('access_token', data.accessToken);
      token = data.accessToken;
      document.cookie = `accessToken=${data.accessToken}; path=/ ; Secure ; SameSite=Strict`;
    }
  }

  async function fetchAllUserInfos () {
    try {
      await fetchToken()
      fetchSpotifyProfile(token).then((data) => {
        setUser(data)
        setUserImage(data?.images[0]?.url);
      });
      fetchPlayingTrack(token).then((data) => {
        setCurrentlyTrack(data?.item)
      })
      fetchAvailableDevices(token).then((data) => {
        setAvailableDevices(data.devices);
      })

      fetchUserFavoriteMusics(token).then((data) => {
      const playlist = [{
        "id": "1",
        "name": "Músicas Curtidas",
        "owner": {
          "external_urls": {
            "spotify": "https://open.spotify.com/user/31cvnuyg2sl5j3wyhecidg2tq7bq"
          },
          "href": "https://api.spotify.com/v1/users/31cvnuyg2sl5j3wyhecidg2tq7bq",
          "id": "31cvnuyg2sl5j3wyhecidg2tq7bq",
          "type": "user",
          "uri": "spotify:user:31cvnuyg2sl5j3wyhecidg2tq7bq",
          "display_name": "João Rafael"
        },
        "type" : "playlist",
        "liked_playlist" : true,
        "total" : data.total,
        "fixo" : true ,
        "items" : [
          data.items
        ]
      }]
        setUserLikeMusics(playlist);
      })
      fetchUserPlaylist(token).then((data) => {
        setUserPlaylists(data?.items);
      })
      fetchUserFollowingArtist(token).then((data) => {
        setUserArtists(data?.items);
      })
      fetchUserSavedAlbums(token).then((data) => {
        setUserAlbums(data?.items);
      })

    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchAllUserInfos();
  } , [])

  console.log(userArtists) 

  playlistEMusicas = userLikeMusics.concat(userPlaylists , userArtists , userAlbums);
  const response = playlistEMusicas?.map((obj) => {
    if (obj === "undefined") {
      playlistEMusicas.pop()
    }
    return {...obj , "fixo" : false }
  })
  return (
    <>
      <Main userImage={userImage} music={currentlyTrack} devices={availableDevices}>
        <ul className={styles.list}>
          <li><Biblioteca userPlaylistsAndArtists={response}/></li>
          <li><Discover user={user}></Discover></li>
          <li><PlayingNow></PlayingNow></li>
        </ul>
      </Main >
   </>
  );
}
