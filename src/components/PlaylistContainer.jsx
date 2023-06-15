/* eslint react/prop-types: 0 */
import { useState, useEffect, useContext } from "react"
import { Context } from "../contexts/Context"

import Container from "./Container"
import SongCard from "./SongCard"

/**
 * Displays the contents of a playlist by generating
 * SongCard elements for each track in its track list.
 * @param {Object} playlist A playlist object
 * @param {Object[]} library An array of playlist objects
 * @param {Number} playlistIndex The index of the playlist in the library
 * @returns {Container} A Container that displays SongCard
 * elements for songs in a playlist
 */
function PlaylistContainer({ playlist, library, playlistIndex }) {
    const { getSpotifyPlaylistTracks } = useContext(Context)
    const [songCards, setSongCards] = useState([])

    // If playlist is from spotify, fetch the tracklist
    useEffect(() => {
        if (playlist.tracks && playlist.tracks.href) {
            getSpotifyPlaylistTracks(playlist.tracks.href)
                .then(tracks =>
                    setSongCards(tracks.items.map(
                        (song, index) =>
                            <SongCard
                                key={index}
                                index={index}
                                song={song.track}
                            />
                    )))
        }
    }, [library, playlistIndex])

    return <Container cards={songCards} />
}

export default PlaylistContainer