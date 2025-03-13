import { useState, useEffect } from 'react';

export default function useSpotifyToken() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function fetchToken() {
            // Faz um fetch na nossa página que muda o token
            const response = await fetch('http://localhost:3000/api/auth/refresh');
            const data = await response.json();
            if (data.accessToken) {
                // Defini um novo valor de token quando faz esse fetch, caso tenha recebido um token
                setToken(data.accessToken);
            }
            
        }

        fetchToken();

        // Definimos também um intervalo para chamar essa função, um intervalo de 55 minutos (um tempo menor que o de expirar o token)
        const tempoAutentificacao = setInterval(fetchToken, 55 * 60 * 1000);

        return () => clearInterval(tempoAutentificacao);
    }, []);

    return token;
}
