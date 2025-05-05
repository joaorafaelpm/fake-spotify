import styles from './PlayingNow.module.css'

export default function PlayingNow () {
    return (
        <div className={styles.container}>
                <span className={styles.strong_name}> Nome da playlist </span>

                <span >Imagem da música</span>
                <span className={styles.strong_name}>Nome da música</span>
                <span>Nome da banda</span>

                <span>Coisas sobre a banda</span>
        </div>
    )
}