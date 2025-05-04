import styles from "./Header.module.css";
import Image from "next/image";
import sleepToken from "../../images/sleepTokenIcon.png";
import HomeImage from "../../images/home.svg";
import SearchImage from "../../images/search.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../Config/localStorageHandler";

export default function Header({userImage}) {
  const [searchText, setSearchText] = useState("");
  const [userIsAuth, setUserIsAuth] = useState(false);
  
  useEffect(()=> {
    setUserIsAuth(getLocalStorage("is_logged"))
  }, [])
  
  function handleInputChange(e) {
    setSearchText(e.target.value);
  }

  return (
    <div className={styles.container}>
    <ul className={styles.list}>
      <li >
      <Link href="/">
        <Image
          src={sleepToken}
          alt={""}
          width={50}
          height={50}
          color={"white"}
          className={styles.main_icon }
        />
      </Link>
      </li>
      <li className={styles.list_item}>
        <ul>
          <li className={styles.home_icon_item}>
            <Link href="/">
              <HomeImage className={styles.homeImage} />
            </Link>
          </li>
          <li className={styles.list_item}>
            <div className={styles.form_control}>
              <SearchImage
                className={styles.search_icon}
              />
              <input type={"text"} placeholder={"Procure por algum artista, música ou podcast"} name={"filter"} id={"filter"} onChange={handleInputChange} value={searchText}/>
            </div>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/account/myaccount">
          {userIsAuth && userImage ? (
            <Image src={userImage} alt={""} width={50} height={50} color={"white"} className={styles.profile_icon} />
            ) : (
            <></>
          )}
        </Link>
      </li>
    </ul>
    </div>
  );
}
