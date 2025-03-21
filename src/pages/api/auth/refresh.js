import axios from 'axios';
import { getLocalStorage, setLocalStorage } from '../../../../Config/localStorageHandler';
import { configDotenv } from 'dotenv';

configDotenv();
let accessToken = getLocalStorage('accessToken'); 
let refreshToken = getLocalStorage('refreshToken'); 

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

export default async function refreshTokenHandler(req, res) {
    // Eu programo para toda vez que eu receber uma requisição do tipo get nesse endereço, eu volto na API do spotify e faço mais um post e renovo o meu token!

    // Caso o método seja get:
    if (req.method === 'GET') {
        // Valido se existe um token para eu trocar pelo meu token de acesso
        if (!refreshToken) {
            return res.status(400).json({ error: "No refresh token available." });
        }

        try {
            // Faço um post para a API do spotify e passo como parâmetro o tipo de refresh; o meu refresh token; e as crendenciais de cliente!
            // A API do spotify me retorna um novo token de acesso e eu já capturo no body e mudo lá no localstorage
            const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                params: {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: clientId,
                    client_secret: clientSecret
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            accessToken = response.data.access_token;
            setLocalStorage("accessToken", accessToken);
            res.status(200).json({ accessToken });
        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }
}
