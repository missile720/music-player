/* eslint react/prop-types: 0 */
import Card from "./Card"
import defaultPlaylistArt from "../assets/defaultCardArt.svg"

/**
 * Generates a card for displaying playlists in a library.
 * @param {Object} playlist A playlist object
 * @returns {Card} A Card that displays PlaylistCard elements
 */
function PlaylistCard({ playlist }) {
    /**
     * Gets playlist's art
     * @param {*} playlist Playlist object
     * @returns {String} url for playlist cover art
     */
    function getPlaylistArt(playlist) {
        if (playlist.images && playlist.images.length > 0) {
            return playlist.images[0].url
        }

        return defaultPlaylistArt
    }

    const playlistArtURL = getPlaylistArt(playlist);

    const playlistTitle = <h4>{playlist.name}</h4>

    return (
        <Card
            coverArt={{ url: playlistArtURL, title: playlist.name }}
            metaData={playlistTitle}
        />
    )
}

export default PlaylistCard