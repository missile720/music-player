import { useState, createContext } from "react"

const MusicPlayerStateContext = createContext()

function MusicPlayerStateContextProvider({ children }) {
    const [library, setLibrary] = useState([])
    const [playlistIndex, setPlaylistIndex] = useState(0)
    const [songIndex, setSongIndex] = useState(-1)
    const [libraryView, setLibraryView] = useState(true)
    const [songProgress, setSongProgress] = useState(10)

    /**
     * Sets the current playlist index of the music player, also
     * reseting the song index
     * @param {Number} index The index of a playlist in the library
     */
    function choosePlaylist(index) {
        setPlaylistIndex(index)
        setSongIndex(-1)
        setLibraryView(false)
    }

    /**
     * Sets the current song index of the music player
     * @param {Number} index The index of a song in a playlist
     */
    function chooseSong(index) {
        setSongIndex(index)
    }

    /**
     * Handles the playback scrubbing of a range input by setting the current
     * songProgress as the scrubbed time
     * @param {Event} event Range input event
     */
    function scrubSong(event) {
        if (event.currentTarget == event.target) {
            setSongProgress(event.target.value)
        }
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
                chooseSong,
                libraryView,
                setLibraryView,
                songProgress,
                scrubSong
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