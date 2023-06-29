/* eslint react/prop-types: 0 */
import Card from "./Card"
import defaultPlaylistArt from "../assets/defaultCardArt.svg"

/**
 * Generates a card for displaying playlists in a library.
 * @param {Object} playlist A playlist object
 * @param {Number} index The index of the playlist in the library
 * @param {func} choosePlaylist The setter for the current index of
 * the selected playlist in the library
 * @returns {Card} A Card that displays PlaylistCard elements
 */
function PlaylistCard({ playlist, index, choosePlaylist }) {
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
            cardClickHandler={() => choosePlaylist(index)}
        />
    )
}

export default PlaylistCard