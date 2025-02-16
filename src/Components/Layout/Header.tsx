import styles from './Header.module.css';

export default function Header () {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.list_item}>image</li>
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