import { useState, createContext } from "react"

const MusicPlayerStateContext = createContext()

function MusicPlayerStateContextProvider({ children }) {
    const [library, setLibrary] = useState([])
    const [playlistIndex, setPlaylistIndex] = useState(0)
    const [songIndex, setSongIndex] = useState(-1)

    function choosePlaylist(index) {
        setPlaylistIndex(index)
        setSongIndex(-1)
        console.log("playlist:", index)
    }

    function chooseSong(index) {
        setSongIndex(index)
        console.log("song:", index)
    }

    return (
        <MusicPlayerStateContext.Provider
            value={{
                library,
                setLibrary,
                playlistIndex,
                choosePlaylist,
                songIndex,
                setSongIndex,
                chooseSong
            }}
        >
            {children}
        </MusicPlayerStateContext.Provider>
    )
}

export {
    MusicPlayerStateContextProvider,
    MusicPlayerStateContext
}