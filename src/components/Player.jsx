import React, { useEffect } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

import { useContext, useState } from "react"

import { Context } from "../Context"

function Player({playlist}) {
    const {accessToken, getSpotifyPlaylistTracks} = useContext(Context)
    const [volume, setVolume] = useState(.3)
    
  // console.log(getSpotifyPlaylistTracks(playlist))

// console.log(playlist)

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
/>
    </div>
  )
}


export default Player