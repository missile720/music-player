import Container from "./Container"
import SongCard from "./SongCard"

function PlaylistContainer({ playlist }) {
    const songCards = playlist.tracks.map(song =>
        <SongCard song={song} />)

    return <Container cards={songCards} />
}

export default PlaylistContainer