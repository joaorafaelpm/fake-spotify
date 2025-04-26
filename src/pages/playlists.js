import styles from "../styles/Playlists.module.css";
import Main from "@/Components/Main";

export default function Playlists() {
    return (
        <Main>
            <div className={styles.container}>
                <h1>Playlists</h1>
                <p>Todas as Playlists do usuário aparecerão aqui!</p>
            </div>
            
        </Main>
    );
}