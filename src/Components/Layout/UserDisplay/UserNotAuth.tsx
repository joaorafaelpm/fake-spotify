import Main from "../../Main";
import styles from "./UserNotAuth.module.css";
import { loginWithSpotify } from "../../../domain/service/user";

export default function UserNotAuth () {
    return(
        <Main> 
            <div className={styles.container}>
                <span>Faça login com seu usuário para usar o spotify de maneira personalizada!</span>
                <button onClick={loginWithSpotify}>Login com Spotify</button>
            </div>
        </Main>
    )
}