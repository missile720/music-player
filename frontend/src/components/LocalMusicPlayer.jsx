import { useContext } from "react"
import ReactPlayer from "react-player"

import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx"
import { SettingsStateContext } from "../contexts/SettingsStateContext.jsx"

import CurrentSong from "./CurrentSong"

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
        getDuration
    } = useContext(MusicPlayerStateContext)
    const {
        volume,
        VOLUME_MAX
    } = useContext(SettingsStateContext)

    return (
        <>
            <CurrentSong />
            <ReactPlayer
                height="0"
                ref={getPlayer}
                url={hasNonEmptyTracklist() &&
                    currentTracklist[songIndex].url}
                playing={playing}
                played={localPlayback.played}
                volume={volume / VOLUME_MAX}
                onProgress={updateProgress}
                onEnded={nextTrack}
                onDuration={getDuration}
            />
        </>
    )
}

export default LocalMusicPlayer