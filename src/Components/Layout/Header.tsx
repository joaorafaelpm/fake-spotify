import styles from './Header.module.css';
import Image from 'next/image';
import AppIcon from "../../images/sleeptokensvg.svg"

export default function Header () {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li className={styles["list_item header_icon"]}> <Image src={AppIcon} alt={""} width={75} height={75} color={"white"} className={styles.header_icon}/> </li>
                <li className={styles.list_item}> 
                    <ul>
                        <li>Home</li>                    
                        <li>search</li>                    
                        <li>create new playlist</li>                    
                    </ul>
                </li>
                <li className={styles.list_item}>My account</li>                    
            </ul>
        </div>
    )
}