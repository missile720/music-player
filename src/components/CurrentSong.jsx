import { useState, useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext.jsx";

import defaultCardArtImg from "../assets/defaultCardArt.svg"
import rewindImg from "../assets/rewind.svg"
import playImg from "../assets/play.svg"
import fastforwardImg from "../assets/fastforward.svg"

import './CurrentSong.css'

function CurrentSong() {
    const [percentage, setPercentage] = useState(10)
    const { theme } = useContext(ThemeContext)

    function changePercent(event) {
        setPercentage(event.target.value)
    }

    return (
        <div
            className={`current-song-container current-song-container-${theme}`}
            data-bs-toggle="offcanvas"
            data-bs-target="#currentSongOffCanvas"
            aria-controls="currentSongOffCanvas"
        >
            <div className="current-song-left-side col-6">
                <div className="image-container col-4 d-flex justify-content-center">
                    {/* Current Song picture */}
                    <img className="song-art" src={defaultCardArtImg}></img>
                </div>
                <div className="song-title-artist col-8">
                    <ul>
                        <li>Song </li>
                        <li>Title</li>
                        <li>Artist </li>
                    </ul>
                </div>
            </div>

            <div className="current-song-right-side col-6">
                <div className="song-bar">
                    <input
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        value={percentage}
                        onChange={changePercent}
                        id="range"
                        className="custom-range"
                    />
                </div>
                <div className="music-play-buttons">
                    {/* skip backwards */}
                    <img className={`music-button music-button-${theme}`} src={rewindImg}></img>
                    {/* Play */}
                    <img className={`music-button music-button-${theme}`} src={playImg}></img>
                    {/* skip forward  */}
                    <img className={`music-button music-button-${theme}`} src={fastforwardImg}></img>
                </div>
            </div>
        </div>
    )
}

export default CurrentSong