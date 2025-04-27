import styles from "./Header.module.css";
import Image from "next/image";
import sleepToken from "../../images/sleeptokengraybgpng.png";
import homeImage from "../../images/home.png";
import SearchImage from "../../images/search.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../Config/localStorageHandler";
import { fetchSpotifyProfile } from "@/domain/service/user";

export default function Header() {
  const [searchText, setSearchText] = useState("");
  const [user , setUser] = useState();
  const [userIsAuth, setUserIsAuth] = useState(false);

  let accessToken = null;
  useEffect(() => {
    accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      fetchSpotifyProfile(accessToken).then((res) => {
        setUser(res);
      }).catch((err) => console.log(err));
    }
    if (getLocalStorage("is_logged") === "true") {
      setUserIsAuth(true);
    }
  }, [accessToken]);
  let userImage = user?.images[0].url

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
              <Image src={homeImage} alt={""} width={25} height={25} />
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
          {userIsAuth ? (
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
