export default function getSpotifyToken() {
    let token = null;
    try {
        async function fetchToken() {
        // Faz um fetch na nossa página que muda o token
        const response = await fetch('http://localhost:3000/api/refresh' , {
            method: "GET",
            headers: {
            "Content-Type" : "aplication/json"
            },
        });
        const data = await response.json();
        console.log(data)
        if (data.accessToken) {
            // Defini um novo valor de token quando faz esse fetch, caso tenha recebido um token
            token = data.accessToken;
            }
            
        }
        fetchToken();
    
        // Definimos também um intervalo para chamar essa função, um intervalo de 55 minutos (um tempo menor que o de expirar o token)
        setInterval(fetchToken, 55 * 60 * 1000);
    }
    catch (err) {
        console.log("Erro no fetch do token (getSpotifyToken)")
        console.log(err)
    }
    return token;
}
