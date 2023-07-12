import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx";

import rewindImg from "../assets/rewind.svg"
import playImg from "../assets/play.svg"
import fastforwardImg from "../assets/fastforward.svg"
import pauseImg from "../assets/pause.svg"

import "./CurrentSong.css"
import "./CurrentSongOffCanvas.css"


export default function CurrentSongOffCanvas() {
    const { theme, mode } = useContext(ThemeContext)
    const {
        scrubSong,
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
            className="song-pop-up offcanvas offcanvas-bottom"
            id="currentSongOffCanvas"
            tabIndex="-1"
            aria-labelledby="currentSongOffCanvasLabel"
        >
            <div
                className={`offcanvas-header 
                    d-flex secondary-offcanvas-${theme}-${mode}`}
            >
                <button
                    type="button"
                    className="btn-close align-left"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close">
                </button>
            </div>
            <div
                className={`offcanvas-body gap-3 d-flex flex-column align-items-center 
                    justify-content-center secondary-offcanvas-${theme}-${mode}`}
            >
                <img
                    className="offcanvas-art"
                    src={currentSongMetadata.songImage}
                ></img>
                <div className="song-data d-flex flex-column align-items-center">
                    <h2
                        className="offcanvas-song-title mb-1"
                    >
                        {currentSongMetadata.name}
                    </h2>
                    <h3
                        className="offcanvas-song-artist m-0">
                        {currentSongMetadata.artist}
                    </h3>
                </div>
                <div className="song-bar d-flex jutify-content-between">
                    <span className="pe-2">
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
                    <span className="ps-2">
                        {convertToTimestamp(duration)}
                    </span>
                </div>
                <div className="music-buttons w-100 d-flex justify-content-evenly">
                    <img
                        className={`music-button music-button-${theme}-${mode}`}
                        src={rewindImg}
                        onClick={previousTrack}
                    ></img>
                    <img
                        className={`music-button music-button-${theme}-${mode}`}
                        src={playing ? pauseImg : playImg}
                        onClick={togglePlay}
                    ></img>
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