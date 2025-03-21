import { useEffect } from "react";
import Authhandler from "../domain/service/authhandler";

export default function SpotifyAuthHandler() {
  useEffect(() => {
    Authhandler()
  }, []);

  return <></>
}
