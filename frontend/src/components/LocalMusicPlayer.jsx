import { useState, useEffect, useContext } from "react"
import ReactPlayer from "react-player"

import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx"
import { SettingsStateContext } from "../contexts/SettingsStateContext.jsx"

import CurrentSong from "./CurrentSong"

const DUMMY_MP3_URL = "https://bvt-music-player.s3.us-west-1.amazonaws.com/v-XUxmg-m0OsdYEFDprh"

const LocalMusicPlayer = () => {
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

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (audioSource && audioSource.hasOwnProperty("crossorigin")) {
            console.log("audio source check")
            console.log(audioSource)
            setTimeout(() => {
                setLoaded(true)
            }, 2000)
        }
    }, [audioSource])

    return (
        <>
            <CurrentSong />
            {
                hasNonEmptyTracklist() &&
                hasValidSongIndex() &&
                <ReactPlayer
                    height="0"
                    ref={getPlayer}
                    url={loaded ? currentTracklist[songIndex].songSource
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