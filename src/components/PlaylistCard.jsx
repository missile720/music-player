/* eslint react/prop-types: 0 */
import Card from "./Card"
import defaultPlaylistArt from "../assets/defaultCardArt.svg"

/**
 * Generates a card for displaying playlists in a library.
 * @param {Object} playlist A playlist object
 * @returns {Card} A Card that displays PlaylistCard elements
 */
function PlaylistCard({ playlist }) {

    function getPlaylistArt(playlist) {
        if (playlist.images && playlist.images.length > 0) {
            return playlist.images[0].url
        }

        return defaultPlaylistArt
    }

    console.log(playlist)

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