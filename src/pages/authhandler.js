import { useEffect } from "react";
import { setLocalStorage} from "../../Config/localStorageHandler";
import { NextResponse } from "next/server";


export default function authHandler() {
  let response = NextResponse.next();
  function SpotifyAuthHandler () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    // Pega o código que retorna do login do spotify,e assim que recebe já faz um post para a nossa API
    // A nossa API recebe o código	e troca pelo access token na api do Spotify
    
    if (code) {
      fetch("http://localhost:3000/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (!data.refreshToken || !data.accessToken) {
          console.error("Não foi possível autenticar!");
          return;
        } 

        // Aqui nós geramos o nosso cookie com o refresh token e o access token, para que possamos usar em outras partes do nosso app
        // Não uso os cookies do next pois não funcionam no lado do cliente, então eu uso o document.cookie para criar os cookies, já que o dado não é sensível
        document.cookie = `refreshToken=${data.refreshToken}; path=/ ; Secure ; SameSite=Strict`;
        document.cookie = `accessToken=${data.accessToken}; path=/ ; Secure ; SameSite=Strict`; 
        window.localStorage.setItem("is_logged", true);
        window.localStorage.setItem("refreh_token", data.refreshToken);
        window.localStorage.setItem("accessToken", data.accessToken);
        window.location.href = "http://localhost:3000/";
      })
      .catch((error) => console.error("Erro ao pegar token:", error));
    }
    
  }
  
  useEffect(() => {
    try {
      SpotifyAuthHandler();

    }catch (err) {
      console.error("Erro ao autenticar:", err);
    }
  }, []);

  return  <></>
}
