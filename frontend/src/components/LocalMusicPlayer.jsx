import { useContext } from "react"
import ReactPlayer from "react-player"

import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx"

import CurrentSong from "./CurrentSong"

import testSongUrl from "../assets/DJ Sona Ethereal (Nosaj Thing x Pretty Lights).mp3"

const LocalMusicPlayer = ({ song }) => {
    const {
        playing,
        localPlayback,
        handleProgress,
        getPlayer
    } = useContext(MusicPlayerStateContext)

    return (
        <>
            <CurrentSong />
            <ReactPlayer
                height="0"
                ref={getPlayer}
                url={testSongUrl}
                playing={playing}
                played={localPlayback.played}
                onProgress={handleProgress}
            // onSeek={ }
            />
        </>
    )
}

export default LocalMusicPlayer