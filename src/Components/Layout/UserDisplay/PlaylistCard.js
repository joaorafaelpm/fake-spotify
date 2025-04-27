import Image from "next/image";
import styles from "./PlaylistCard.module.css";

export default function PlaylistCard({ playlist }) {
    


    return (
        
        <div className={styles.container}>
            <Image 
                src={playlist.images[0].url}
                alt="Playlist Image"
                width={50}
                height={50}
                className={styles.container_image_playlist}
            />
            <div className={styles.playlistInfo}>

                <span>{playlist.name}</span>
                <p>Playlist {playlist.owner.display_name}</p>
            </div>
        </div>
    )
}