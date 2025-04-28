"use client"
import { useEffect, useState } from "react";


import styles from "./page.module.css";
import Biblioteca from "../Components/Layout/MusicDisplay/Biblioteca";
import Main from "@/Components/Main";
import Discover from "@/Components/Layout/MusicDisplay/Discover";
import PlayingNow from "@/Components/Layout/MusicDisplay/PlayingNow";

import { getLocalStorage, setLocalStorage } from "../../Config/localStorageHandler";
import { fetchSpotifyProfile, fetchUserPlaylist } from "@/domain/service/user";


export default function MainPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPlaylists , setUserPlaylists] = useState([]);
  const [user , setUser] = useState({});
  const [userImage , setUserImage] = useState("");
  let token = null ;  
  token = document.cookie.split("; ").find(cookie => cookie.startsWith("accessToken=")).split("=")[1];
  
  

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
    }
  }
  async function fetchAllUserInfos () {
    try {
        
        await fetchToken();

        fetchUserPlaylist(token).then((data) => {
          setUserPlaylists(data.items);
        });
    
        fetchSpotifyProfile(token).then((data) => {
          setUser(data)
          setUserImage(data.images[0]?.url);
        });
      
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllUserInfos();
  } , [])

  return (
    <>
      <Main userImage={userImage}>
        <ul className={styles.list}>
          <li><Biblioteca userPlaylists={userPlaylists}></Biblioteca></li>
          <li><Discover></Discover></li>
          <li><PlayingNow></PlayingNow></li>
        </ul>
      </Main>
   </>
  );
}
