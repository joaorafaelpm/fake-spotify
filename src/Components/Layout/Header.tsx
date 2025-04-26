import styles from "./Header.module.css";
import Image from "next/image";
import AppIcon from "../../images/sleeptokengraybgpng.png";
import Link from "next/link";
import Input from "./Form/Input";
import { useState } from "react";

export default function Header() {
  const [searchText, setSearchText] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles["list_item header_icon"]}>
          <Image
            src={AppIcon}
            alt={""}
            width={75}
            height={75}
            color={"white"}
            className={styles.header_icon}
          />
        </li>
        <li className={styles.list_item}>
          <ul>
            <li>
              <button>
                <Link href="/">Home </Link>
              </button>
            </li>
            <li>
              <Input
                type="text"
                name="search"
                placeholder="Procurar"
                value={searchText}
                handleOnChange={handleInputChange}
              />
            </li>
            <li>
              <button>
                <Link href="/playlists">create new playlist </Link>{" "}
              </button>
            </li>
          </ul>
        </li>
        <li className={styles.list_item}>
          <Link href="/account/myaccount">
            <Image
              src={""}
              alt={""}
              width={75}
              height={75}
              color={"white"}
              className={styles.header_icon}
            />
          </Link>{" "}
        </li>
      </ul>
    </div>
  );
}
