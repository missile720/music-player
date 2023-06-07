/* eslint react/prop-types: 0 */
import Card from "./Card"

/**
 * Generates a card for displaying playlists in a library.
 * @param {Object} playlist A playlist object
 * @returns {Card} A Card that displays PlaylistCard elements
 */
function PlaylistCard({ playlist }) {
    /**
     * Chooses a random index of a track from the playlist. Used
     * for determining the art to be rendered for a playlist
     * @param {Object} playlist A playlist object
     * @returns A random index in the range of [0, The length
     * of the playlist's tracks]
     */
    const randomTrackIndex = (playlist) => {
        return Math.floor(Math.random() * playlist.tracks.length)
    }

    const randomTrack = playlist.tracks[randomTrackIndex(playlist)]
    const playlistArtURL = randomTrack.coverArt

    const playlistTitle = <h4>{playlist.name}</h4>

    return (
        <Card
            coverArt={{ url: playlistArtURL, title: randomTrack.album }}
            metaData={playlistTitle}
        />
    )
}

export default PlaylistCard