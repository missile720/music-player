import React, { useEffect } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

import { useContext, useState } from "react"

import { Context } from "../Context"

function Player({playlist}) {
    const {accessToken, getSpotifyPlaylistTracks} = useContext(Context)
    const [volume, setVolume] = useState(.05)
    const [currentSong, setCurrentSong] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    
    useEffect(() => {
      if (playlist.tracks && playlist.tracks.href) {
        getSpotifyPlaylistTracks(playlist.tracks.href)
        .then(tracks =>
          setCurrentSong(tracks.items[currentIndex].track.uri)
          )}
}, [playlist])

// const handleItemClick = (index) => {
//   setCurrentSong(playlist.tracks.items[index].track.uri);
// };   

  return (
    <div>
      <SpotifyPlayer
        name='Syntax Samurai Player'
        styles={{}}
        token={accessToken}
        layout='responsive'
        initialVolume={volume}
        inlineVolume={true}
        play={true}
        uris={playlist.uri}
        // uris={currentSong}
/>
    </div>
  )
}


export default Player