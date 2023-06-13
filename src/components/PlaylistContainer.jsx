/* eslint react/prop-types: 0 */
import { useState, useContext } from "react"
import { Context } from "../Context"

import Container from "./Container"
import SongCard from "./SongCard"

/**
 * Displays the contents of a playlist by generating
 * SongCard elements for each track in its track list.
 * @param {Object} playlist A playlist object
 * @returns {Container} A Container that displays SongCard
 * elements for songs in a playlist
 */
function PlaylistContainer({ playlist }) {
    const { getSpotifyPlaylistTracks } = useContext(Context)
    const [songCards, setSongCards] = useState([])

    if (playlist.tracks &&
        playlist.tracks.href) {
        getSpotifyPlaylistTracks(playlist.tracks.href)
            .then(tracks => {
                setSongCards(tracks.items.map(
                    (song, index) =>
                        <SongCard
                            key={index}
                            index={index}
                            song={song.track}
                        />
                ))
            })
    }


    return <Container cards={songCards} />
}

export default PlaylistContainer