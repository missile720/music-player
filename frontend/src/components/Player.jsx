import { useState, useEffect, useContext } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

import { Context } from "../contexts/Context"
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext"
import { SettingsStateContext } from "../contexts/SettingsStateContext"

const PLAYER_NAME = "Music Player"

function Player() {
  // Context Variables
  const {
    songIndex,
    setSongIndex,
    currentTracklist,
    hasNonEmptyTracklist,
    hasValidSongIndex
  } = useContext(MusicPlayerStateContext);
  const { accessToken, getSongAudioAnalysis } = useContext(Context);
  const { volume, VOLUME_MAX } = useContext(SettingsStateContext);
  const { theme, mode } = useContext(ThemeContext);

  // States
  const [reactPlayerStyle, setReactPlayerStyle] = useState({
    activeColor: "",
    bgColor: "",
    color: "",
    loaderColor: '#fff',
    sliderColor: "",
    trackArtistColor: "",
    trackNameColor: ""
  })
  // Used to track the react spotify player's playback state
  const [playerCallback, setPlayerCallback] = useState("");

  // Constants
  const playerVolume = volume / VOLUME_MAX;

  /**
   * Use effect to update reactPlayerStyle on theme/mode change.
   * Done in order to address bug when changing theme and mode 
   * when the player is paused, but to no success.
   */
  useEffect(() => {
    if (theme === 'royal' && mode === 'light') {
      setReactPlayerStyle(prevStyle => ({
        ...prevStyle,
        bgColor: '#5CADF8',
        activeColor: "#000",
        color: "#000",
        trackArtistColor: "#000",
        trackNameColor: "#000",
        sliderColor: '#fafafa',
      }))
    } else if (theme === 'royal' && mode === 'dark') {
      setReactPlayerStyle(prevStyle => ({
        ...prevStyle,
        bgColor: '#181964',
        activeColor: "#fff",
        color: "#fff",
        trackArtistColor: "#fff",
        trackNameColor: "#fff",
        sliderColor: '#0E0F3B',
      }))
    } else if (theme === 'bvt' && mode === 'light') {
      setReactPlayerStyle(prevStyle => ({
        ...prevStyle,
        bgColor: '#FF5531',
        activeColor: "#fff",
        color: "#fff",
        trackArtistColor: "#fff",
        trackNameColor: "#fff",
        sliderColor: '#FD2C00',
      }))
    } else {
      setReactPlayerStyle(prevStyle => ({
        ...prevStyle,
        bgColor: '#8D918D',
        activeColor: "#fff",
        color: "#fff",
        trackArtistColor: "#fff",
        trackNameColor: "#fff",
        sliderColor: '#737873',
      }))
    }
  }, [theme, mode])

  // Updates the songIndex as the user uses the previous and next buttons
  // on the react spotify player, properly updating the songCards in the
  // playlistContainer. Also grabs audio analaysis from the playback
  // information for the Waveform Visualizer
  useEffect(() => {
    // Logic for Waveform Visualizer
    // Only get song audio analysis if track data exists
    if (playerCallback) {
      getSongAudioAnalysis(playerCallback);
    }

    // Logic for songIndex updating
    let currentUri = ""
    if (playerCallback && playerCallback.track.uri) {
      currentUri = playerCallback.track.uri
    } else {
      return
    }
    const lastUri = currentTracklist[songIndex]

    if (currentUri !== lastUri) {
      const previousTracks = playerCallback
        .previousTracks.map(track => track.uri)
      const nextTracks = playerCallback.nextTracks.map(track => track.uri)

      if (previousTracks && previousTracks.includes(lastUri)) {
        // If the nextIndex is out of range, the playback loops
        setSongIndex(prevIndex => {
          const nextIndex = prevIndex + 1
          return nextIndex < currentTracklist.length ? nextIndex : 0
        })
      } else if (previousTracks.length <= 0) {
        // The specific case for if the user preses next on the last
        // song on a playlist
        setSongIndex(0)
      } else if (nextTracks && nextTracks.includes(lastUri)) {
        setSongIndex(prevIndex => prevIndex - 1)
      }
    }
  }, [playerCallback])

  return (
    <div className="d-flex justify-content-center flex-column align-items-center h-100">
      {
        hasNonEmptyTracklist() &&
        hasValidSongIndex() &&
        typeof currentTracklist[0] === "string" &&
        <SpotifyPlayer
          name={PLAYER_NAME}
          styles={reactPlayerStyle}
          callback={setPlayerCallback}
          token={accessToken}
          layout='responsive'
          initialVolume={playerVolume}
          inlineVolume={true}
          offset={songIndex}
          play={true}
          persistDeviceSelection={false}
          uris={currentTracklist}
        />
      }
    </div>
  )
}


export default Player