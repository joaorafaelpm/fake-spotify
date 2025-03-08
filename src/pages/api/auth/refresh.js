import axios from 'axios';

let accessToken = null; 
let refreshToken = null; 

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

export default async function handler(req, res) {
    if (req.method === 'GET') {
        if (!refreshToken) {
            return res.status(400).json({ error: "No refresh token available." });
        }

        try {
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

            res.status(200).json({ accessToken });
        } catch (error) {
            res.status(500).json({ error: error.response ? error.response.data : error.message });
        }
    }
}
