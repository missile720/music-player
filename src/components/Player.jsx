import React, { useEffect } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

import { useContext, useState } from "react"

import { Context } from "../Context"

export default function Player() {
    const {accessToken, transferPlayback, getDevices, userPlayListSpotify} = useContext(Context)
    const [volume, setVolume] = useState(.3)
    const [deviceId, setDeviceId] = useState('');
    
    setTimeout(()=>{ // grabs device id from active devices
      getDevices().then((data)=>{
      if (data.devices.length > 0) {
        setDeviceId(data.devices[0].id);
        transferPlayback(deviceId)
      }})
    }, 1000)
    
    // console.log(userPlayListSpotify)
    // console.log(userPlayListSpotify.items)

  return (
    <div>
      <SpotifyPlayer
        name='Syntax Samurai Player'
        styles={{}}
        token={accessToken}
        initialVolume={volume}
        play={true}
        uris={"spotify:track:7k97NZTpES8UV88YahNgEB"}
/>
    </div>
  )
}
