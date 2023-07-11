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
    const [playing, setPlaying] = useState(false)
    const [scrubbing, setScrubbing] = useState(false)
    const [localPlayback, setLocalPlayback] = useState({
        played: 0,
        playedSeconds: 0,
        loaded: 0,
        loadedSeconds: 0
    })
    const [player, setPlayer] = useState(() => { })

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
     * Side effect for updating state variables on the change of songIndex,
     * playlistIndex, or library
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

    /**
     * Has the player seek to the specified playback input
     * @param {Event} event Event object for input range mouse up
     */
    function updateOnScrub(event) {
        setScrubbing(false)
        player.seekTo(parseFloat(event.target.value))
    }

    /**
     * Updates playback state as song plays
     * @param {Object} state Playbackstate
     */
    function handleProgress(state) {
        if (!scrubbing) {
            setLocalPlayback(state)
        }
    }

    /**
     * Sets the player state as the given player
     * @param {Object} player The internal player for the ReactPlayer
     */
    function getPlayer(reactPlayer) {
        setPlayer(reactPlayer)
    }

    /**
     * Module increments the songIndex to have loop behaviour
     */
    function nextTrack() {
        if (currentTracklist && currentTracklist.length > 0) {
            setSongIndex(prev => (prev + 1) % currentTracklist.length)
        }
    }

    /**
     * Modulo decrements the songIndex to have loop behaviour
     */
    function previousTrack() {
        if (currentTracklist && currentTracklist.length > 0) {
            // Tracklist length added to decrement to avoid the modulous of a negative number
            setSongIndex(prev =>
                (prev - 1 + currentTracklist.length) % currentTracklist.length)
        }
    }

    // Helper functions
    /**
     * @returns {bool} Whether or not the current tracklist exists and
     * has at least one track
     */
    function hasNonEmptyTracklist() {
        return currentTracklist && currentTracklist.length > 0
    }

    /**
     * @returns {string} The name of the current playlist in the library
     * if it exists in the library
     */
    function getPlaylistName() {
        return library.length > 0 &&
            library[playlistIndex] &&
            library[playlistIndex].name
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
                localPlayback,
                getPlayer,
                updateOnScrub,
                nextTrack,
                previousTrack,
                getPlaylistName,
                hasNonEmptyTracklist
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