import styles from './Biblioteca.module.css'
import { useEffect, useRef, useState } from 'react'
import PlaylistCard from '../UserDisplay/PlaylistCard'
import ArtistCard from '../UserDisplay/ArtistCard'

export default function Biblioteca ({userPlaylistsAndArtists}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollableDivRef = useRef();

    useEffect(() => {
        const div = scrollableDivRef.current;
        if (!div) return;

        function handleScroll() {
        if (div.scrollTop > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        }
        div.addEventListener('scroll', handleScroll);
        return () => {
        div.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return (
        <div className={styles.container}>
            <div className={`${styles.container_header} ${isScrolled ? styles.scrolled : ""}`} >
                <span> Sua Biblioteca </span>
                <ul >
                    <li className={styles.list_item}>Playlists</li>
                    <li className={styles.list_item}>Artistas</li>
                    <li className={styles.list_item}>Álbuns</li>
                </ul>
            </div>

            <div className={styles.container_playlists} ref={scrollableDivRef}>
                {userPlaylistsAndArtists?.map((current)=> current.type === "artist" ? 
                (<ArtistCard artist={current} key={current.id} />)
                    : 
                (<PlaylistCard playlist={current} key={current.id} />)
                )}
            </div>
        </div>
    )
}