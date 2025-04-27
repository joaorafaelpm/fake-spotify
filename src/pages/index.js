import { useEffect, useState } from "react";

import styles from "../app/page.module.css";
import Biblioteca from "@/Components/Layout/MusicDisplay/Biblioteca";
import Main from "@/Components/Main";
import Discover from "@/Components/Layout/MusicDisplay/Discover";
import PlayingNow from "@/Components/Layout/MusicDisplay/PlayingNow";

import { getLocalStorage, setLocalStorage } from "../../Config/localStorageHandler";


export default function MainPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState();
  let token = null ;
  
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
      token = data.accessToken;
      setLocalStorage('access_token', token);
      setAccessToken(token);
      }   
  }
    
    
  
  return (
    <>
      <Main >
        <ul className={styles.list}>
          <li><Biblioteca></Biblioteca></li>
          <li><Discover></Discover></li>
          <li><PlayingNow></PlayingNow></li>
        </ul>
      </Main>
   </>
  );
}
