import Image from "next/image";
import styles from "./CurrentCard.module.css";
import LikedMusic from '../../../images/likedmusic.png'

export default function CurrentCard({ current }) {
    return (
        <>
            {current.type === "artist" ? (
            <div className={styles.container}>
                <Image 
                    src={current.images[0].url}
                    alt="artist Image"
                    width={50}
                    height={50}
                    className={styles.container_image_artist}
                />
                <div className={styles.current_info}>
                    <span>{current.name}</span>
                    <p>Artista</p>
                </div>
            </div>
            ) : (
            <div className={styles.container}>
                {current.liked_playlist === true ? (
                    <Image 
                        src={LikedMusic}
                        alt="Playlist Image"
                        width={50}
                        height={50}
                        className={styles.container_image_playlist}
                    />
                ) : (
                    <Image 
                        src={current?.images[0].url}
                        alt="Playlist Image"
                        width={50}
                        height={50}
                        className={styles.container_image_playlist}
                    />
                )}
                <div>
                    <span>{current.name}</span>
                    <div> 
                        <p className={styles.playlist}> Playlist </p>
                        <div className={styles.bolinha}/> 
                        {current.liked_playlist === true ? (
                            <p> {current.total} músicas</p>
                        ) : (
                            <p> {current.owner.display_name}</p>
                        )}
                    </div>
                </div>
            </div>
            )}
        </>
    )
}