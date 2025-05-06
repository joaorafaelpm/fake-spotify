import styles from './Biblioteca.module.css'
import { useEffect, useRef, useState } from 'react'
import CurrentCard from '../UserDisplay/CurrentCard'

export default function Biblioteca ({userPlaylistsAndArtists}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollableDivRef = useRef();

    const [pressButon , setPressButon] = useState(false) ;
    const [filter , setFilter] = useState("All") ;

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

    const filterSearch = ((e) => {
        if (filter === e.target.id) {
            setFilter("All")
            setPressButon(false)
            return ;
        }
        setPressButon(true)
        setFilter(e.target.id)
    })

    return (
        <div className={styles.container}>
            <div className={`${styles.container_header} ${isScrolled ? styles.scrolled : ""}`} >
                <span> Sua Biblioteca </span>
                <ul>
                    <li className={filter === 'playlist' && pressButon ? styles.list_item_pressed : styles.list_item } id='playlist' onClick={filterSearch}>Playlists</li>
                    <li className={filter === 'artist' && pressButon ? styles.list_item_pressed : styles.list_item} id='artist' onClick={filterSearch}>Artistas</li>
                    <li className={filter === 'album' && pressButon ? styles.list_item_pressed : styles.list_item} id='album' onClick={filterSearch}>Álbuns</li>
                </ul>
            </div>

            <div className={styles.container_current} ref={scrollableDivRef}>
                {filter === "All" ? 
                userPlaylistsAndArtists?.map((current , index)=> 
                    <CurrentCard current={current} key={current.id} id={current.id}/>
                ) : userPlaylistsAndArtists?.map((current)=> current.type === filter && 
                    <CurrentCard current={current} key={current.id} id={current.id}/>
                )}
            </div>
        </div>
    )
}