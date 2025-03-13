import { useEffect, useState } from "react";

import Biblioteca from "@/Components/Layout/MusicDisplay/Biblioteca";
import styles from "../app/page.module.css";
import Main from "@/Components/Main";
import Discover from "@/Components/Layout/MusicDisplay/Discover";
import PlayingNow from "@/Components/Layout/MusicDisplay/PlayingNow";

import { getLocalStorage } from "../../Config/localStorageHandler";

// Importando o hook que irá pegar o token do spotify
import  useSpotifyToken  from "../hooks/getSpotifyToken";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(useEffect(() => {
    getLocalStorage('is_logged'), []
  }));
  // Recebendo o nosso token pelo hook
  const [token , setToken] = useState(useSpotifyToken() || null);
  const scope = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

  function loginWithSpotify() {
    // Minhas variáveis globais
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    // Crio uma constante que é a url do spotify para autorizar o usuário somente com id e passo como escopo para receber os dados do usuário
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl; 
    // Redireciona o usuário para o login do Spotify, este login retorna o código de permissão do spotify para pegar o access token!
    // Agora a gente vai até o spotifyAuthHandler para interceptar esse código e envia-lo até a nossa api para pegar o access token!
  }
  
  function fetchSpotifyProfile() {
    const response = fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  }

  useEffect(() => {
    setIsAuthenticated(getLocalStorage('is_logged'));
  }, []);

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
