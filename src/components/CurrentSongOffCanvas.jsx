import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx";

import defaultCardArtImg from "../assets/defaultCardArt.svg"
import rewindImg from "../assets/rewind.svg"
import playImg from "../assets/play.svg"
import fastforwardImg from "../assets/fastforward.svg"

import "./CurrentSongOffCanvas.css"


export default function CurrentSongOffCanvas() {
    const { theme } = useContext(ThemeContext)
    const { songProgress, scrubSong } = useContext(MusicPlayerStateContext)

    return (
        <div
            className="song-pop-up offcanvas offcanvas-bottom"
            id="currentSongOffCanvas"
            tabIndex="-1"
            aria-labelledby="currentSongOffCanvasLabel"
        >
            <div className={`offcanvas-header d-flex offcanvas-header-${theme}`}>
                <button type="button" className="btn-close align-left" data-bs-dismiss="offcanvas" aria-label="Close">
                </button>
            </div>
            <div className={`offcanvas-body gap-2 d-flex flex-column align-items-center justify-content-center offcanvas-body-${theme}`}>
                <img className="offcanvas-art" src={defaultCardArtImg}></img>
                <div className="song-data d-flex flex-column align-items-center">
                    <h2 className="m-0">Song Title</h2>
                    <h3 className="m-0">Artist</h3>
                </div>
                <div className="song-bar">
                    <input
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        value={songProgress}
                        onChange={scrubSong}
                        id="range"
                        className="custom-range"
                    />
                </div>
                <div className="music-buttons w-100 d-flex justify-content-evenly">
                    <img className={`music-button music-button-${theme}`} src={rewindImg}></img>
                    <img className={`music-button music-button-${theme}`} src={playImg}></img>
                    <img className={`music-button music-button-${theme}`} src={fastforwardImg}></img>
                </div>
            </div>

        </div>
    )
}