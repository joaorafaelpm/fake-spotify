import styles from './Footer.module.css'
import MusicDisplay from './MusicDisplay/Tracks/MusicDisplay'
import TrackControll from './MusicDisplay/Tracks/TrackControll'
import PlayingConfig from './MusicDisplay/Tracks/PlayingConfig'
export default function Footer ({music , devices}) {

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
            <li>
                <MusicDisplay music={music}/>
            </li>
            <li>
                <TrackControll />
            </li>
            <li>
                <PlayingConfig />
            </li>
            </ul>
            {devices?.map((device) => device.is_active ? (<div className={styles.container_footer} key={device.id}> <span>Tocando em {device.name}</span></div> ) : <div key={null}> </div> )}
        </div>
    )
}