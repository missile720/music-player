/* eslint react/prop-types: 0 */
import { useContext } from "react"
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext"
import { ThemeContext } from "../contexts/ThemeContext"

import Card from "./Card"
import defaultPlaylistArt from "../assets/defaultCardArt.svg"

/**
 * Generates a card for displaying playlists in a library.
 * @param {Object} playlist A playlist object
 * @param {Number} index The index of the playlist in the library
 * @returns {Card} A Card that displays PlaylistCard elements
 */
function PlaylistCard({ playlist, index }) {
    const { theme, mode } = useContext(ThemeContext)
    const {
        choosePlaylist,
        playlistIndex
    } = useContext(MusicPlayerStateContext)

    /**
     * @param {*} playlist Playlist object
     * @returns {String} url for playlist cover art
     */
    function getPlaylistArt(playlist) {
        if (playlist.images && playlist.images.length > 0) {
            return playlist.images[0].url
        }

        return defaultPlaylistArt
    }

    /**
     * @param {Number} playlistIndex 
     * @returns {string} The card's type. To be appended
     * to the card as a classname.
     */
    function getCardType(playlistIndex) {
        let baseCardType = " playlist-card "

        if (playlistIndex === index) {
            baseCardType +=  `${theme}-${mode}-selected-card`
        }

        return baseCardType
    }

    const playlistArtURL = getPlaylistArt(playlist);

    const playlistMetaData = <div>
        <h4>{playlist.name}</h4>
        <h5 className="fs-6 fst-italic fw-light">
            {playlist.source ? "Local" : "Spotify"}
        </h5>
    </div>

    return (
        <Card
            coverArt={{ url: playlistArtURL, title: playlist.name }}
            metaData={playlistMetaData}
            cardClickHandler={() => choosePlaylist(index)}
            cardType={getCardType(playlistIndex)}
        />
    )
}

export default PlaylistCard