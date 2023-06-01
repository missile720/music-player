import React from "react"
import './CurrentSong.css'

function CurrentSong(){

    return(
        <div className="current-song-container">
            <div className="current-song-left-side">
                <div className="image-container">
                <img src="src/assets/react.svg" alt="" />
                </div>
                <div className="song-title-artist">
                    <ul>
                        <li>Song </li>
                        <li>Title</li>
                        <li>Artist </li>
                    </ul>
                </div>
            </div>

            <div className="current-song-right-side">
                <div className="song-bar">
                    
                </div>
                <div className="music-play-buttons">
                    <img src="src/assets/react.svg" alt="" />
                    <img src="src/assets/react.svg" alt="" />
                    <img src="src/assets/react.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default CurrentSong