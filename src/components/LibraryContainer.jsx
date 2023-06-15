/* eslint react/prop-types: 0 */
import Container from "./Container"
import PlaylistCard from "./PlaylistCard"

/**
 * A container component that displays a library of playlists
 * by converting the playlists into playlist cards
 * @param {Object[]} library An array of playlist objects
 * @param {func} choosePlaylist Event handler for selecting current
 * playlist for music player
 * @returns {Container} A Container that displays PlaylistCard
 * elements
 */
function LibraryContainer({ library, choosePlaylist }) {
    let playlistCards = []

    if (library) {
        playlistCards = library.map((playlist, index) =>
            <PlaylistCard
                key={index}
                playlist={playlist}
                index={index}
                choosePlaylist={choosePlaylist}
            />)
    }

    return <Container cards={playlistCards} />
}

export default LibraryContainer