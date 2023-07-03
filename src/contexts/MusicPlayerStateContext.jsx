import { useState, useEffect, createContext } from "react"

const MusicPlayerStateContext = createContext()

function MusicPlayerStateContextProvider({ children }) {
    const [library, setLibrary] = useState([])
    const [playlistIndex, setPlaylistIndex] = useState(0)
    const [songIndex, setSongIndex] = useState(0)
    const [libraryView, setLibraryView] = useState(true)
    const [songProgress, setSongProgress] = useState(10)
    const [currentTracklist, setCurrentTracklist] = useState([])
    const [currentSongSource, setCurrentSongSource] = useState('')

    // Effects
    /**
     * Side effect for handling desktop view window resizing
     */
    useEffect(() => {
        if (typeof window === "undefined") {
            return
        }

        window.addEventListener("resize", setAsLibraryView)

        return () => window.removeEventListener("resize", setAsLibraryView)
    }, [])

    /**
     * Side effect for setting the source of the currently selected song
     */
    useEffect(() => {
        if (library[playlistIndex]) {
            setCurrentSongSource(library[playlistIndex].source ? 'local' : 'spotify')
        }
    }, [songIndex, playlistIndex, library])

    // Functions
    /**
     * Sets the current playlist index of the music player, also
     * reseting the song index
     * @param {Number} index The index of a playlist in the library
     */
    function choosePlaylist(index) {
        setPlaylistIndex(index)
        setSongIndex(0)

        // Only allow user to go to playlist view on mobile
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            setLibraryView(false)
        }
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
        setSongProgress(event.target.value)
        event.stopPropagation()
    }

    /**
     * Sets the library view as true. Meant to be used as event listener
     * for window size, such that if a user resizes their window to be
     * desktop view on mobile, library view is guaranteed to be true
     */
    function setAsLibraryView() {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            setLibraryView(true)
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
                scrubSong,
                currentTracklist,
                setCurrentTracklist,
                currentSongSource
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