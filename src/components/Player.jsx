import React, { useEffect } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

import { useContext, useState } from "react"

import { Context } from "../Context"

export default function Player() {
    const {accessToken, transferPlayback, getDevices} = useContext(Context)
    const [volume, setVolume] = useState(.3)
    const [play, setPlay] = useState(false)
    const [deviceId, setDeviceId] = useState('');
    
    setTimeout(()=>{ // grabs device id from active devices
      getDevices().then((data)=>{
      if (data.devices.length > 0) {
        setDeviceId(data.devices[0].id);
        transferPlayback(deviceId)
      }})
    }, 2000)
    
    // console.log(deviceId)      
  return (
    <div>
      <SpotifyPlayer
        name='Syntax Samurai Player'
        styles={{}}
        token={accessToken}
        initialVolume={volume}
        callback={state => {
            if (!state.isPlaying) setPlay((prev)=>{!prev})
          }}
        play={true}
        // uris={}
/>
    </div>
  )
}
