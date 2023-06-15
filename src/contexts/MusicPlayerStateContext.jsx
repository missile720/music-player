import { useState, createContext } from "react"

const MusicPlayerStateContext = createContext()

function MusicPlayerStateContextProvider({ children }) {
    const [library, setLibrary] = useState([])
    const [playlistIndex, setPlaylistIndex] = useState(0)

    return (
        <MusicPlayerStateContext.Provider
            value={{
                library,
                setLibrary,
                playlistIndex,
                setPlaylistIndex
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