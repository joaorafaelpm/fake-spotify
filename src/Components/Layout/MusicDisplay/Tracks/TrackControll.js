import styles from "./TrackControll.module.css";
import Back_btn from "../../../../images/TrackController/back_btn.svg";
import Next_btn from "../../../../images/TrackController/next_btn.svg";
import Pause_btn from "../../../../images/TrackController/pause_btn.svg";
import Play_btn from "../../../../images/TrackController/play_btn.svg";
import Repeat_btn from "../../../../images/TrackController/repeat_btn.svg";
import Shuffle_btn from "../../../../images/TrackController/shuffle_btn.svg";

import { useEffect, useState } from "react";
export default function TrackControll({ music }) {
  const [play , setPlay] = useState(true)
  const [shufleActive , changeShuffleActive] = useState(true)
  let token = null;
  token = document.cookie.split("; ").find((cookie) => cookie.startsWith("accessToken=")).split("=")[1];
  
  fetch(`https://api.spotify.com/v1/me/player` , {
    method:"GET",
    headers : {
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((resp) => resp.json())
  .then((resp) => {setPlay(resp.is_playing)})
  .catch((err) => console.log(err))

  const changePlayback = async () => {
    if (play === true) {
      fetch(`https://api.spotify.com/v1/me/player/pause` , {
        method: "PUT",
        headers : {
          "Authorization": `Bearer ${token}`
        }
      })
      setPlay(!play)
    }
    else {
      fetch(`https://api.spotify.com/v1/me/player/play` , {
        method: "PUT",
        headers : {
          "Authorization": `Bearer ${token}`
        }
      })
      setPlay(!play)
    }
  }
  
  const backPlayback = () => {
    fetch(`https://api.spotify.com/v1/me/player/previous` , {
      method: "POST",
      headers : {
        "Authorization": `Bearer ${token}`
      }
    })
  }
  const nextPlayback = () => {
    fetch(`https://api.spotify.com/v1/me/player/next` , {
      method: "POST",
      headers : {
        "Authorization": `Bearer ${token}`
      }
    })
  }
  
  let currentState =  0
  const changeRepeatMode = () => {
    const state= ["track" , "off" , "context"]
    currentState+=1
    if (currentState > 2) {
      currentState = 0
    }
    fetch(`https://api.spotify.com/v1/me/player/repeat?state=${state[currentState]}` , {
      method: "PUT",
      headers : {
        "Authorization": `Bearer ${token}`
      }
    })
  }
  const changeShuffleMode = () => {
    fetch(`https://api.spotify.com/v1/me/player/shuffle?state=true` , {
      method: "PUT",
      headers : {
        "Authorization": `Bearer ${token}`
      }
    })
    changeShuffleActive(!shufleActive)
  }

  return (
    <div className={styles.container}>
      <button className={styles.container_btn} onClick={changeShuffleMode}>
        <Shuffle_btn className={shufleActive ? styles.shuffle_btn_activated : styles.shuffle_btn} />
      </button>
      <button className={styles.container_btn} onClick={backPlayback}>
        <Back_btn className={styles.back_btn} />
      </button>
    
      <button className={styles.container_btn} onClick={changePlayback}>
      {play ? (
        <Pause_btn className={styles.play_btn} />
      ) : (
        <Play_btn className={styles.play_btn} />
      )}
      </button>

      <button className={styles.container_btn} onClick={nextPlayback}>
        <Next_btn className={styles.next_btn} />
      </button>
      <button className={styles.container_btn} onClick={changeRepeatMode}>
        <Repeat_btn className={styles.repeat_btn} />
      </button>
    </div>
  );
}
