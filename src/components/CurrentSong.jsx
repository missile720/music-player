<<<<<<< HEAD
import { useContext, useState } from "react"
=======
import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx";

import defaultCardArtImg from "../assets/defaultCardArt.svg"
import rewindImg from "../assets/rewind.svg"
import playImg from "../assets/play.svg"
import fastforwardImg from "../assets/fastforward.svg"

>>>>>>> development
import './CurrentSong.css'
import { Context } from "../Context"
// import SpotifyPlayer from "react-spotify-web-playback"

function CurrentSong() {
<<<<<<< HEAD
    const {accessToken, getPlaybackState, startResumePlayback, transferPlayback} = useContext(Context)
//  const test1 =  getPlaybackState().then((res)=>{
//         // console.log(res.item.href)
//         return res.item
//     })




   

    const [percentage, setPercentage] = useState(10)
    const [play, setPlay] = useState(false)


    function changePercent(event) {
        setPercentage(event.target.value)
    }
=======
    const { theme } = useContext(ThemeContext)
    const { songProgress, scrubSong, libraryView } = useContext(MusicPlayerStateContext)
>>>>>>> development

    return (
        <div
            className={`current-song-container current-song-container-${theme} px-1 pe-2`}
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

<<<<<<< HEAD
            <div className="current-song-right-side col-4">
                {/* <div className="song-bar">
                    <input type="range" min="1" max="100" step="1" value={percentage} onChange={changePercent} id="range" className="custom-range" />
                </div> */}
                <div className="music-play-buttons">
                    {/* skip backwards */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-skip-backward-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M11.729 5.055a.5.5 0 0 0-.52.038L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.271-.445z" />
                    </svg> */}
                    {/* Play */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                    </svg> */}

                    {/* skip forward  */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-fast-forward-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16Z" />
                        <path d="M4.271 5.055a.5.5 0 0 1 .52.038L8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .271-.445Z" />
                    </svg> */}
            {/* <SpotifyPlayer
                token={accessToken}
                // showSaveIcon
                callback={state =>{
                    if(state.isPlaying){
                        // startResumePlayback()
                    }else{
                        // transferPlayback()
                    }
                // play={play}
                uris={}
                
                }}
                    /> */}
=======
            <div className="current-song-right-side col-6 h-100">
                <div className="song-bar">
                    <input
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        value={songProgress}
                        onChange={scrubSong}
                        data-bs-toggle="offcanvas"
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
>>>>>>> development
                </div>
            </div>
        </div>
    )
}

export default CurrentSong