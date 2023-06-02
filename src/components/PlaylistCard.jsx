import Card from "./Card"

/**
 * Generates a card for displaying playlists in a library.
 * @param {Object} playlist A playlist object
 * @returns {ReactComponentElement} A Card component displaying the
 * relevant data of a playlist
 */
function PlaylistCard({ playlist }) {
    const randomTrackIndex = (playlist) => {
        return Math.floor(Math.random() * playlist.tracks.length)
    }

    const randomTrack = playlist.tracks[randomTrackIndex(playlist)]
    const playlistArtURL = randomTrack.coverArt

    const playlistTitle = <h4>{playlist.name}</h4>

    return (
        <Card
            coverArt={{ url: playlistArtURL, title: playlist.name }}
            metaData={playlistTitle}
        />
    )
}

export default PlaylistCard