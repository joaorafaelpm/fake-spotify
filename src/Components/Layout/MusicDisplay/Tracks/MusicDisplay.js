import Image from "next/image"
import styles from "./MusicDisplay.module.css"
import { useEffect, useRef, useState } from "react";

export default function MusicDisplay ({music}) {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const scroll = scrollRef.current;

        if (container && scroll) {
            setShouldScroll(scroll.scrollWidth > container.clientWidth);
        }
  }, []);

    let artistas = music?.artists
    let nomeArtistas = []
    artistas?.map((artista) => {
        nomeArtistas.push(artista.name)
    })
    return (
        <div className={styles.container}>
            {music?.album?.images[0]?.url !== undefined ? <Image src={music?.album?.images[0].url} width={60} height={60} alt="music icon" className={styles.musicImage}/> : <div></div>}
            <div className={styles.musicInfo} ref={containerRef}>
                <span>{music?.name}</span>
                {artistas && (
                    <div className={`${styles.container_artist_name} ${shouldScroll ? styles.scrolling : ''} `} ref={scrollRef}>
                        {nomeArtistas.map((nome , index) => (
                            <p key={index}> {nome}{index < nomeArtistas.length - 1 ? ", " : ""} </p>
                        ))} 
                    </div>
                )
                }
            </div>
        </div>
    )
}