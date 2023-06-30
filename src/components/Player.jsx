import React, { useContext, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

import { Context } from "../contexts/Context"
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext"

import { useState } from "react"


function Player({ playlist }) {
  const { songIndex } = useContext(MusicPlayerStateContext)
  const { accessToken, getSpotifyPlaylistTracks } = useContext(Context)

  const [volume, setVolume] = useState(.05)
  const [currentSong, setCurrentSong] = useState('')

  useEffect(() => {
    if (playlist.tracks && playlist.tracks.href) {
      getSpotifyPlaylistTracks(playlist.tracks.href)
        .then(tracks =>
          setCurrentSong(tracks.items[songIndex].track.uri)
        )
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
        play={true}
        persistDeviceSelection={false}
        uris={songIndex == 0 ? playlist.uri : currentSong}
      />
    </div>
  )
}


export default Player