import { useEffect, useState } from 'react';
// import loginWithSpotify from './loginWithSpotify'


// A partir de agora essa é a página da URI do endpoint do spotify!




export default function SpotifyAuthHandler() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        // Pega o código que retorna do login do spotify,e assim que recebe já faz um post para a nossa API
        // A nossa API recebe o código	e troca pelo access token na api do Spotify

        if (code) {
            fetch('/api/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('spotifyAccessToken', data.accessToken);
                localStorage.setItem('spotifyRefreshToken', data.refreshToken);
                setIsAuthenticated(true);
                window.history.replaceState({}, document.title, '/'); 
            })
            .catch(error => console.error('Erro ao pegar token:', error));
        }
    }, []);

    const clientId = process.env.CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI;
    const scope = 'user-read-private user-read-email';

    function loginWithSpotify() {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
        window.location.href = authUrl; 
    // Redireciona o usuário para o login do Spotify, este login retorna o código de permissão do spotify para pegar o access token!
    // Agora a gente vai até o spotifyAuthHandler para interceptar esse código e envia-lo até a nossa api para pegar o access token!
    }

    async function fetchSpotifyProfile() {
        const token = localStorage.getItem('spotifyAccessToken');
    
        if (!token) {
            console.log('Nenhum token disponível');
            return;
        }
    
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    
        const data = await response.json();
        console.log('Perfil do usuário:', data);
    }
    

    return (
        <div>
            {isAuthenticated ? (
            <div> <p>Autenticado com sucesso!</p>
                <button onClick={fetchSpotifyProfile}>Buscar perfil do Spotify</button>
             </div>
             ):( 
             <button onClick={loginWithSpotify}>Login com Spotify</button>
             )}
        </div>
    );
}
