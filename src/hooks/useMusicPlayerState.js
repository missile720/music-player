import { useState } from "react"

function useMusicPlayerState() {
    const [library, setLibrary] = useState([])
    const [playlistIndex, setPlaylistIndex] = useState(0)

    return {
        library,
        setLibrary,
        playlistIndex
    }
}


export default useMusicPlayerState

