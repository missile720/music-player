import { useContext } from "react"
import ReactPlayer from "react-player"

import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx"

import CurrentSong from "./CurrentSong"

const LocalMusicPlayer = () => {
    const {
        playing,
        localPlayback,
        handleProgress,
        getPlayer,
        currentTracklist,
        songIndex,
        hasNonEmptyTracklist
    } = useContext(MusicPlayerStateContext)

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
                onProgress={handleProgress}
            />
        </>
    )
}

export default LocalMusicPlayer