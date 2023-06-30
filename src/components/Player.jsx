import { useState, useEffect, useContext } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

import { Context } from "../contexts/Context"
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext"


function Player({ playlist }) {
  const { songIndex, currentTracklist } = useContext(MusicPlayerStateContext)
  const { accessToken, getSpotifyPlaylistTracks } = useContext(Context)

  const [volume, setVolume] = useState(.05)
  const { currentPlaylistSource } = useContext(MusicPlayerStateContext);

  useEffect(() => {
    if (playlist.tracks && playlist.tracks.href) {
      getSpotifyPlaylistTracks(playlist.tracks.href)
    }
  }, [playlist, songIndex])

  return (
    <div>
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
        token={accessToken}
        layout='responsive'
        initialVolume={volume}
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