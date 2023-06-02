import Container from "./Container"
import SongCard from "./SongCard"

/**
 * Displays the contents of a playlist by generating
 * SongCard elements for each track in its tracklist.
 * @param {Object} playlist A playlist object
 * @returns {Container} A Container that displays SongCard
 * elements for songs in a playlist
 */
function PlaylistContainer({ playlist }) {
    const songCards = playlist.tracks.map((song, index) =>
        <SongCard key={index} song={song} />)

    return <Container cards={songCards} />
}

export default PlaylistContainer