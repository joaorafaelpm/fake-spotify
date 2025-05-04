import Image from "next/image";
import styles from "./ArtistCard.module.css";

export default function ArtistCard({ artist }) {
    return (
        <div className={styles.container}>
            <Image 
                src={artist.images[0].url}
                alt="artist Image"
                width={50}
                height={50}
                className={styles.container_image_artist}
            />
            <div className={styles.artistInfo}>
                <span>{artist.name}</span>
                <p>Autista</p>
            </div>
        </div>
    )
}