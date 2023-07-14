import { useContext } from "react"

import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx";

import rewindImg from "../assets/rewind.svg"
import playImg from "../assets/play.svg"
import fastforwardImg from "../assets/fastforward.svg"
import pauseImg from "../assets/pause.svg"

import "./CurrentSong.css"

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
        previousTrack,
        playing,
        duration,
        convertToTimestamp,
        getCurrentSongMetadata
    } = useContext(MusicPlayerStateContext)

    const currentSongMetadata = getCurrentSongMetadata()

    return (
        <div
            className={`current-song-container 
                ${theme}-${mode}-current-song-container 
                px-1 pe-2 rounded`}
            data-bs-toggle="offcanvas"
            data-bs-target="#currentSongOffCanvas"
            aria-controls="currentSongOffCanvas"
            disabled={libraryView}
        >
            <div className="current-song-left-side col-8 col-md-6">
                <div className="image-container col-4 d-flex justify-content-center">
                    {/* Current Song picture */}
                    <img
                        className="song-art"
                        src={currentSongMetadata.songImage}
                    ></img>
                </div>
                <div className="song-title-artist col-8">
                    <ul className="song-meta-data">
                        <li
                            className="song-title"
                        >
                            {currentSongMetadata.name}
                        </li>
                        <li>{currentSongMetadata.artist}</li>
                    </ul>
                </div>
            </div>

            <div className="current-song-right-side col-4 col-md-6 h-100">
                <div className="song-bar justify-content-between d-none d-md-flex mb-2 align-items-center">
                    <span className="pe-2 fs-6">
                        {convertToTimestamp(localPlayback.playedSeconds)}
                    </span>
                    <input
                        type="range"
                        min="0"
                        max="0.99999999"
                        step="any"
                        value={localPlayback.played}
                        onMouseDown={() => setScrubbing(true)}
                        onMouseUp={updateOnScrub}
                        onChange={scrubSong}
                        id="range"
                        className="custom-range"
                    />
                    <span className="ps-2 fs-6">
                        {convertToTimestamp(duration)}
                    </span>
                </div>
                <div className="music-play-buttons">
                    {/* skip backwards */}
                    <img
                        className={`music-button music-button-${theme}-${mode}`}
                        src={rewindImg}
                        onClick={previousTrack}
                        tabIndex="999"
                        data-bs-toggle="offcanvas"
                    ></img>
                    {/* Play */}
                    <img
                        className={`music-button music-button-${theme}-${mode}`}
                        src={playing ? pauseImg : playImg}
                        onClick={togglePlay}
                        tabIndex="1000"
                        data-bs-toggle="offcanvas"
                    ></img>
                    {/* skip forward  */}
                    <img
                        className={`music-button music-button-${theme}-${mode}`}
                        src={fastforwardImg}
                        onClick={nextTrack}
                        tabIndex="1001"
                        data-bs-toggle="offcanvas"
                    ></img>
                </div>
            </div>
        </div>
    )
}

export default CurrentSong