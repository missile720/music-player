import { useState, useEffect, useContext } from "react"
import ReactPlayer from "react-player"

import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx"
import { SettingsStateContext } from "../contexts/SettingsStateContext.jsx"

import CurrentSong from "./CurrentSong"

// A dummy mp3 to load with the ReactPlayer to tank the CORS denied error
const DUMMY_MP3_URL = "https://bvt-music-player.s3.us-west-1.amazonaws.com/01_Sam_Rudich.mp3"

const LocalMusicPlayer = () => {
    // Context Variables
    const {
        playing,
        localPlayback,
        updateProgress,
        getPlayer,
        currentTracklist,
        songIndex,
        hasNonEmptyTracklist,
        nextTrack,
        getDuration,
        hasValidSongIndex
    } = useContext(MusicPlayerStateContext)
    const {
        volume,
        VOLUME_MAX,
        audioSource
    } = useContext(SettingsStateContext)

    // State Variables
    // Indicates if ReactPlayer internal player is loaded with crossorigin header
    const [loaded, setLoaded] = useState(false)

    /**
     * Use effect to load the proper mp3 files for the player after the CORS issue
     * has been tanked
     */
    useEffect(() => {
        if (audioSource && Object.keys(audioSource).length) {
            setLoaded(true)
        }
    }, [audioSource])

    /**
     * A fix to address the Chrome issue of caching calls, as without this the app
     * would sometimes load the first songs of playlists without the crossorigin 
     * attribute
     * @returns {string} The url of the current song to play on the Amazon backend
     */
    function getCurrentSong() {
        if (songIndex !== 0 && audioSource.getAttribute("crossorigin")) {
            return currentTracklist[songIndex].songSource
        } else {
            return currentTracklist[0].songSource
        }
    }

    return (
        <>
            <CurrentSong />
            {
                hasNonEmptyTracklist() &&
                hasValidSongIndex() &&
                <ReactPlayer
                    height="0"
                    ref={getPlayer}
                    url={loaded ? getCurrentSong()
                        : DUMMY_MP3_URL}
                    playing={playing}
                    played={localPlayback.played}
                    volume={volume / VOLUME_MAX}
                    onProgress={updateProgress}
                    onEnded={nextTrack}
                    onDuration={getDuration}
                />
            }
        </>
    )
}

export default LocalMusicPlayer