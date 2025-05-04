import styles from "./PlayingConfig.module.css"
import Change_device from "../../../../images/PlayingConfig/change_device.svg";
import Queue from "../../../../images/PlayingConfig/queue.svg";
import Screen_playing_now from "../../../../images/PlayingConfig/screen_playing_now.svg";
import Fullscreen from "../../../../images/PlayingConfig/fullscreen.svg";

export default function PlayingConfig () {
    let token = null;
    token = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken=")).split("=")[1];
    return (
        <div className={styles.container}>
            <button className={styles.container_btn}>
                <Screen_playing_now className={styles.screen_playing_now}/>
            </button>
            <button className={styles.container_btn}>
                <Queue className={styles.queue}/>
            </button>
            <button className={styles.container_btn}>
                <Change_device className={styles.change_device}/>
            </button>
            <input type="range"/>
            <button className={styles.container_btn}>
                <Fullscreen className={styles.fullscreen}/>
            </button>
        </div>
    )
}