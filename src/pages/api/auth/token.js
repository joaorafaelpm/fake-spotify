import axios from 'axios';

let accessToken = null;
let refreshToken = null;
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI; 

export default async function handler(req, res) {
    // Passamos uma requisição nestá URL na função authhandler, que passa um código como conteúdo no body usando o método POST
    // Ou seja, caso seja POST, a gente pega o código (code = req.body) e a gente faz um POST na api do spotify pegando o nosso access token 
    if (req.method === 'POST') {
        const { code } = req.body;

        try {
            // Uso o axios, por que o tipo de post da api do spotify é diferente, e pede pelo tipo de conteúdo de x-www-form-urlencoded, neste caso o axios facilita a minha vida e funciona da mesma maneira que o fetch
            // Passo os parâmetros que a api do spotify pede, e passo o código que a gente recebeu do login do spotify
            const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                params: {
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                    client_id: clientId,
                    client_secret: clientSecret
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            accessToken = response.data.access_token;
            refreshToken =  response.data.refresh_token;
            res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            res.status(500).json({ error: error.response ? error.response.data : error.message });
        }
    }
    // Neste caso, por enquanto eu estou deixando possível de verificar o nosso token pela própria url, mas depois eu vou tirar isso. Vou manter por enquanto por que facilita para o desenvolvimento, neste caso, eu saber se ainda estou com o access token ou não!
    else {
        res.status(405).json({ 
            accessToken,
            refreshToken
        });
    }
}
