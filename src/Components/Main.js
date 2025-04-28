import { useEffect, useState } from "react";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import { getLocalStorage } from "../../Config/localStorageHandler";
import { loginWithSpotify } from "../domain/service/user";
import styles from "./Main.module.css";

export default function Main ({ children , userImage}) {
    const [userIsAuth , setUserIsAuth] = useState(false);
    useEffect(() => {
        if (getLocalStorage("is_logged") === "true") {
            setUserIsAuth(true);
        };
    })
    return (
        <>
            <Header userImage={userImage}/>
            {userIsAuth ? ( 
                children
             ): ( 
                <div className={styles.container}>
                    <span>Faça login com seu usuário para usar o spotify de maneira personalizada!</span>
                    <button onClick={loginWithSpotify}>Login com Spotify</button>
                </div>
            )}
            <Footer/>
        </>
    );
}
