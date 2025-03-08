import axios from 'axios';

let accessToken = null;
let refreshToken = null;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI; 

export default async function handler(req, res) {
    // Passamos uma requisição nestá URL na função spotifyAuthHandler, que passa um código como conteúdo no body usando o método POST
    // Ou seja, caso seja POST, a gente pega o código (code = req.body) e a gente faz um POST na api do spotify pegando o nosso access token 
    if (req.method === 'POST') {
        const { code } = req.body;

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                params: {
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                    client_id: clientId,
                    client_secret: clientSecret
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            accessToken = response.data.access_token;
            refreshToken = response.data.refresh_token;

            res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            res.status(500).json({ error: error.response ? error.response.data : error.message });
        }
    }
}
