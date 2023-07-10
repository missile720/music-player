import { useState, useEffect, createContext } from "react"

const MusicPlayerStateContext = createContext()

const MEDIUM_SCREEN_BREAKPOINT = 768

function MusicPlayerStateContextProvider({ children }) {
    const [library, setLibrary] = useState([])
    const [playlistIndex, setPlaylistIndex] = useState(0)
    const [songIndex, setSongIndex] = useState(0)
    const [libraryView, setLibraryView] = useState(true)
    const [currentTracklist, setCurrentTracklist] = useState([])
    const [currentSongSource, setCurrentSongSource] = useState('')
    const [playing, setPlaying] = useState(true)
    const [scrubbing, setScrubbing] = useState(false)
    const [localPlayback, setLocalPlayback] = useState({
        played: 0,
        playedSeconds: 0,
        loaded: 0,
        loadedSeconds: 0
    })

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
     * reseting the song index. Also toggles the player to playlist
     * view on mobile.
     * @param {Number} index The index of a playlist in the library
     */
    function choosePlaylist(index) {
        // Only change playlist index and reset song index when given
        // a new songIndex
        if (index !== playlistIndex) {
            setSongIndex(0)
            setPlaylistIndex(index)
        }

        // Only allow user to go to playlist view on mobile
        if (typeof window !== "undefined" &&
            window.innerWidth < MEDIUM_SCREEN_BREAKPOINT) {
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
     * Sets the library view as true. Meant to be used as event listener
     * for window size, such that if a user resizes their window to be
     * desktop view on mobile, library view is guaranteed to be true
    */
    function setAsLibraryView() {
        if (typeof window !== "undefined" &&
            window.innerWidth >= MEDIUM_SCREEN_BREAKPOINT) {
            setLibraryView(true)
        }
    }

    // PLAYER CONTROL FUNCTIONS

    /**
     * Toggles currentSong playback on/off
     */
    function togglePlay() {
        setPlaying(prevPlay => !prevPlay)
    }

    /**
     * Handles the playback scrubbing of a range input by setting the current
     * songProgress as the scrubbed time
     * @param {Event} event Range input event
     */
    function scrubSong(event) {
        setLocalPlayback(prevPlayback => ({
            ...prevPlayback,
            played: parseFloat(event.target.value)
        }))
    }

    function handleProgress(state) {
        if (!scrubbing) {
            setLocalPlayback(state)
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
                scrubSong,
                currentTracklist,
                setCurrentTracklist,
                currentSongSource,
                playing,
                togglePlay,
                scrubbing,
                setScrubbing,
                handleProgress,
                localPlayback
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