import { useContext } from "react"
import ReactPlayer from "react-player"

import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx"

import CurrentSong from "./CurrentSong"

import testSongUrl from "../assets/DJ Sona Ethereal (Nosaj Thing x Pretty Lights).mp3"

const LocalMusicPlayer = ({ song }) => {
    const {
        playing
    } = useContext(MusicPlayerStateContext)

    return (
        <>
            <CurrentSong />
            <ReactPlayer
                url={testSongUrl}
                playing={playing}
            />
        </>
    )
}

export default LocalMusicPlayer