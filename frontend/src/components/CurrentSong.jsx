import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx";

import defaultCardArtImg from "../assets/defaultCardArt.svg"
import rewindImg from "../assets/rewind.svg"
import playImg from "../assets/play.svg"
import fastforwardImg from "../assets/fastforward.svg"

import './CurrentSong.css'

function CurrentSong() {
    const { theme, mode } = useContext(ThemeContext)
    const {
        scrubSong,
        libraryView,
        togglePlay,
        setScrubbing,
        localPlayback,
        updateOnScrub,
        nextTrack,
        previousTrack
    } = useContext(MusicPlayerStateContext)

    return (
        <div
            className={`current-song-container current-song-container-${mode} px-1 pe-2`}
            data-bs-toggle="offcanvas"
            data-bs-target="#currentSongOffCanvas"
            aria-controls="currentSongOffCanvas"
            disabled={libraryView}
        >
            <div className="current-song-left-side col-6">
                <div className="image-container col-4 d-flex justify-content-center">
                    {/* Current Song picture */}
                    <img className="song-art" src={defaultCardArtImg}></img>
                </div>
                <div className="song-title-artist col-8">
                    <ul>
                        <li>Song Title</li>
                        <li>Artist </li>
                    </ul>
                </div>
            </div>

            <div className="current-song-right-side col-6 h-100">
                <div className="song-bar">
                    <input
                        type="range"
                        min="0"
                        max="0.99999999"
                        step="any"
                        value={localPlayback.played}
                        onMouseDown={() => setScrubbing(true)}
                        onMouseUp={updateOnScrub}
                        onChange={scrubSong}
                        data-bs-toggle="offcanvas"
                        id="range"
                        className="custom-range"
                    />
                </div>
                <div className="music-play-buttons">
                    {/* skip backwards */}
                    <img
                        className={`music-button music-button-${theme}-${mode}`}
                        src={rewindImg}
                        onClick={previousTrack}
                    ></img>
                    {/* Play */}
                    <img
                        className={`music-button music-button-${theme}-${mode}`}
                        src={playImg}
                        onClick={togglePlay}
                    ></img>
                    {/* skip forward  */}
                    <img
                        className={`music-button music-button-${theme}-${mode}`}
                        src={fastforwardImg}
                        onClick={nextTrack}
                    ></img>
                </div>
            </div>
        </div>
    )
}

export default CurrentSong