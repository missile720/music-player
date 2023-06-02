import Container from "./Container"
import PlaylistCard from "./PlaylistCard"

/**
 * A container component that displays a library of playlists
 * @param {Object[]} library An array of playlist objects
 * @returns A container component displaying cards for each playlist
 * in the library
 */
function LibraryContainer({ library }) {
    const playlistCards = library.map(playlist =>
        <PlaylistCard playlist={playlist} />)

    return <Container cards={playlistCards} />
}

export default LibraryContainer