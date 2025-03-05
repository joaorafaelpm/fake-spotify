import Biblioteca from "@/Components/Layout/MusicDisplay/Biblioteca";
import styles from "../app/page.module.css";
import Main from "@/Components/Main";
import Discover from "@/Components/Layout/MusicDisplay/Discover";
import PlayingNow from "@/Components/Layout/MusicDisplay/PlayingNow";

export default function Home() {
  return (
    <Main>
      <ul className={styles.list}>
        <li><Biblioteca></Biblioteca></li>
        <li><Discover></Discover></li>
        <li><PlayingNow></PlayingNow></li>
      </ul>
    </Main>
  );
}
