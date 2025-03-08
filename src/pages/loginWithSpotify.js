const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;
const scope = 'user-read-private user-read-email';

export default function loginWithSpotify() {
    console.log(process.env.REDIRECT_URI)
    console.log(redirectUri)
    
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl; 
    // Redireciona o usuário para o login do Spotify, este login retorna o código de permissão do spotify para pegar o access token!
    // Agora a gente vai até o spotifyAuthHandler para interceptar esse código e envia-lo até a nossa api para pegar o access token!
}
