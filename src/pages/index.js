import { useEffect, useState } from "react";

import styles from "../app/page.module.css";
import Biblioteca from "@/Components/Layout/MusicDisplay/Biblioteca";
import Main from "@/Components/Main";
import Discover from "@/Components/Layout/MusicDisplay/Discover";
import PlayingNow from "@/Components/Layout/MusicDisplay/PlayingNow";

import { getLocalStorage } from "../../Config/localStorageHandler";
import { loginWithSpotify } from "../domain/service/user";
import useSpotifyToken from "@/domain/hooks/getSpotifyToken";


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(useEffect(() => {
    getLocalStorage('is_logged'), []
  }));
  
  useEffect(() => {
    setIsAuthenticated(getLocalStorage('is_logged'));
  }, []);

  const token = useSpotifyToken()


  return (
    <>
      {isAuthenticated ? (
        <Main>
          <ul className={styles.list}>
            <li><Biblioteca></Biblioteca></li>
            <li><Discover></Discover></li>
            <li><PlayingNow></PlayingNow></li>
          </ul>
        </Main>
      ):( 
        <Main>
          <p>Se cadastre para poder usar o spotify de forma personalizada!</p>
          <button onClick={loginWithSpotify}>Login com Spotify</button>
        </Main>

      )}
   </>
  );
}
