import { useState } from "react"
import './CurrentSong.css'

function CurrentSong() {
    const [percentage, setPercentage] = useState(10)
    
    function changePercent(event) {
        setPercentage(event.target.value)
    }

    return (
        <div className="current-song-container">
            <div className="current-song-left-side col-6">
                <div className="image-container">
                    {/* Current Song picture */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-file-earmark-music" viewBox="0 0 16 16">
                        <path d="M11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.572 2.572 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377.5 0 .974-.134 1.338-.377.36-.24.662-.628.662-1.123V8.89l2-.5V6.64z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                    </svg>                </div>
                <div className="song-title-artist">
                    <ul>
                        <li>Song </li>
                        <li>Title</li>
                        <li>Artist </li>
                    </ul>
                </div>
            </div>

            <div className="current-song-right-side col-5">
                <div className="song-bar">
                    <input type="range" min="1" max="100" step="1" value={percentage} onChange={changePercent} />
                </div>
                <div className="music-play-buttons">
                    {/* skip backwards */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-skip-backward-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M11.729 5.055a.5.5 0 0 0-.52.038L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.271-.445z" />
                    </svg>
                    {/* Play */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                    </svg>
                    {/* skip forward  */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-fast-forward-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16Z" />
                        <path d="M4.271 5.055a.5.5 0 0 1 .52.038L8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .271-.445Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default CurrentSong