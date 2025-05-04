import Image from "next/image";
import styles from "./PlaylistCard.module.css";
import LikedMusic from '../../../images/likedmusic.png'

export default function PlaylistCard({ playlist }) {
    return (
        <>
            {playlist.type === "playlist_curtida" ? (
            <div className={styles.container}>
                <Image 
                    src={LikedMusic}
                    alt="Playlist Image"
                    width={50}
                    height={50}
                    className={styles.container_image_playlist}
                />
                <div className={styles.playlistInfo}>
                    <span className={styles.playlistInfo_name}>{playlist.name}</span>
                    <div> 
                        <span> Playlist </span>
                        <div className={styles.bolinha}/> 
                        <p> {playlist.total}</p>
                    </div>
                </div>
            </div>
                
            ) : (
            <div className={styles.container}>
                <Image 
                    src={playlist.images[0].url}
                    alt="Playlist Image"
                    width={50}
                    height={50}
                    className={styles.container_image_playlist}
                />
                <div className={styles.playlistInfo}>
                    <span className={styles.playlistInfo_name}>{playlist.name}</span>
                    <div> 
                        <span> Playlist </span>
                        <div className={styles.bolinha}/> 
                        <p> {playlist.owner.display_name}</p>
                    </div>
                </div>
            </div>
            )}
            
         </>   
    )
}