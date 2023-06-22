import React from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

import { useContext, useState } from "react"

import { Context } from "../Context"

export default function Player() {
    const {accessToken, getPlaybackState, startResumePlayback, transferPlayback} = useContext(Context)
    const [volume, setVolume] = useState(.5)
    const [play, setPlay] = useState(false)

    function changeVolume(event) {
        setVolume(event.target.value)
        console.log(volume)
    }

    
    // window.onSpotifyWebPlaybackSDKReady = () => {
    //     console.log("The Web Playback SDK is ready. We have access to Spotify.Player");
    //     // console.log(window.Spotify.Player);
    //     const token = accessToken;
    //     const player = new Spotify.Player({
    //         name: "React-Spotify-test",
    //         getOAuthToken: cb => {cb(token)},
    //         // volume: 0.5
    //     })
    //     // Ready
    //     player.addListener('ready', ({ device_id }) => {
    //         console.log('Ready with Device ID', device_id);
    //     });
        
    //     // Not Ready
    //     player.addListener('not_ready', ({ device_id }) => {
    //         console.log('Device ID has gone offline', device_id);
    //     });
        // player.connect().then(success => {
        //   if (success) {
        //     console.log('The Web Playback SDK successfully connected to Spotify!');
        //   }
        // })}

      
      
  return (
    <div>
      <SpotifyPlayer
        styles={{}}
        token={accessToken}
        initialVolume={volume}
        callback={state => {
            if (!state.isPlaying) setPlay(false)
          }}
        // uris={}
/>
    </div>
  )
}
