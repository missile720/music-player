import { useState } from "react"

/**
 * Hook for music player state
 * @returns {Object} Object full of varying state variables and
 * setters including:
 * -library {[Object]} An array of playlists
 * -setLibrary {func} The library's setter
 * -playlistIndex {Number} The index of the currently selected playlist
 * in the library
 * -choosePlaylist {func} An event handler for PlaylistCards to select them
 */
function useMusicPlayerState() {
    const [library, setLibrary] = useState([])
    const [playlistIndex, setPlaylistIndex] = useState(0)

    /**
     * Sets the current playlistIndex to the given index
     * @param {Number} index The index of a playlist in the library
     */
    function choosePlaylist(index) {
        setPlaylistIndex(index)
    }

    return {
        library,
        setLibrary,
        playlistIndex,
        choosePlaylist
    }
}


export default useMusicPlayerState

