import styles from './Biblioteca.module.css'
import { fetchUserPlaylist } from '@/domain/service/user'
import { useEffect, useRef, useState } from 'react'
import PlaylistCard from '../UserDisplay/PlaylistCard'

export default function Biblioteca () {
    const [userPlaylists, setUserPlaylists] = useState([])
    useEffect(() => {
        fetchUserPlaylist().then((res) => {
            setUserPlaylists(res.items); 
        })} , [])
    console.log(userPlaylists)

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
                        <li className={styles.list_item}>Artistas</li>
                        <li className={styles.list_item}>Álbuns</li>
                        <li className={styles.list_item}>Playlists</li>
                    </ul>
                </div>

                <div className={styles.container_playlists} ref={scrollableDivRef}>
                    {userPlaylists.map((playlist) => (
                        <PlaylistCard playlist={playlist}/>
                    ))}
                </div>
                

            </div>
    )
}