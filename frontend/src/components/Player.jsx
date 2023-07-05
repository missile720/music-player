import { useState, useEffect, useContext } from 'react'
import SpotifyPlayer, { spotifyApi } from "react-spotify-web-playback"

import { Context } from "../contexts/Context"
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext"

const INITIAL_VOLUME = .05;

function Player() {
  const {
    songIndex,
    setSongIndex,
    currentTracklist
  } = useContext(MusicPlayerStateContext)
  const { accessToken, getSongAudioAnalysis } = useContext(Context)

  // Used to track the react spotify player's playback state
  const [playerCallback, setPlayerCallback] = useState("");

  // Updates the songIndex as the user uses the previous and next buttons
  // on the react spotify player, properly updating the songCards in the
  // playlistContainer.
  useEffect(() => {
    getSongAudioAnalysis(playerCallback);

    let currentUri = "";
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
      <SpotifyPlayer
        name='Syntax Samurai Player'
        styles={{
          activeColor: '#fff',
          // bgColor: '#333',
          color: '#333',
          loaderColor: '#fff',
          sliderColor: '#1cb954',
          // trackArtistColor: '#fff',
          // trackNameColor: '#fff',
        }}
        callback={setPlayerCallback}
        token={accessToken}
        layout='responsive'
        initialVolume={INITIAL_VOLUME}
        inlineVolume={true}
        offset={songIndex}
        play={true}
        persistDeviceSelection={false}
        uris={currentTracklist}
      />
    </div>
  )
}


export default Player