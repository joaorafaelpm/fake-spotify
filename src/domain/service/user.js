//TODO Vale constar que o fato de está ser uma classe que não faz parte de um componente REACT tentar usar os hooks que o react me oferece é inútil, e retornará um erro de que eu estou usando um componente fora de um corpo REACT. 
//* Neste caso, em que a maioria das funções vão precisar do meu accessToken, é mais facil usar o nosso hook dentro da onde aquela função vai ser usada, já que não é possível usar o localStorage fora de um useEffect no Nextjs, o que impossibilita pegar o token que nós já temos!

import { configDotenv } from 'dotenv';

configDotenv();
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


/**
 * Função para fazer login com o spotify - Só redirecionamento, sem retornos!
 */
export const loginWithSpotify = () => {
    // Minhas variáveis globais
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    // Crio uma constante que é a url do spotify para autorizar o usuário somente com id e passo como escopo para receber os dados do usuário
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl; 
    // Redireciona o usuário para o login do Spotify, este login retorna o código de permissão do spotify para pegar o access token!
    // Agora a gente vai até o spotifyAuthHandler para interceptar esse código e envia-lo até a nossa api para pegar o access token!
}

/**
 * Função para pegar as informações do meu usuário já cadastrado
 * @returns {object} retorna o usuário como objeto json
 */
export const fetchSpotifyProfile = (token) => {
    // Função para personalizar o site com informações do usuário!
    const response = fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.json();
  }