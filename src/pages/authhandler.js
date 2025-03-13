import { useEffect, useState } from "react";
import {setLocalStorage} from "../../Config/localStorageHandler";

export default function SpotifyAuthHandler() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    // Pega o código que retorna do login do spotify,e assim que recebe já faz um post para a nossa API
    // A nossa API recebe o código	e troca pelo access token na api do Spotify

    if (code) {
      fetch("http://localhost:3000/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.refreshToken || !data.accessToken) {
            console.error("Não foi possível autenticar!");
            return;
          } else {
            setLocalStorage("refreshToken", data.refreshToken);
            setLocalStorage("accessToken", data.accessToken);
            setLocalStorage("is_logged", true);

          }
          console.log(data);
          console.log(data.accessToken);
          window.location.href = "http://localhost:3000/";
        })
        .catch((error) => console.error("Erro ao pegar token:", error));
    }
  }, []);

  return <></>
}
