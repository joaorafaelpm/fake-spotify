import Container from '../Container'
import styles from './Discover.module.css'

export default function Discover () {
    return (
        <Container>
            <div className={styles.container}>
            <div className={styles.container_header}>

                <ul >
                    <li className={styles.list_item}>Tudo</li>
                    <li className={styles.list_item}>Músicas</li>
                    <li className={styles.list_item}>Podcast</li>
                </ul>
            </div>
            </div>

        </Container>
    )
}