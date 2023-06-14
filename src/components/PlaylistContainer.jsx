/* eslint react/prop-types: 0 */
import { useState, useEffect, useContext } from "react"
import { Context } from "../Context"

import Container from "./Container"
import SongCard from "./SongCard"

/**
 * Displays the contents of a playlist by generating
 * SongCard elements for each track in its track list.
 * @param {Object} playlist A playlist object
 * @param {Number} playlistIndex The index of the playlist in the library
 * @returns {Container} A Container that displays SongCard
 * elements for songs in a playlist
 */
function PlaylistContainer({ playlist, playlistIndex }) {
    const { userPlaylistSpotify, getSpotifyPlaylistTracks } = useContext(Context)
    const [songCards, setSongCards] = useState([])

    useEffect(() => {
        // If playlist is from spotify, fetch the tracklist
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
            console.log("fetch")
        }
    }, [userPlaylistSpotify, playlistIndex])

    console.log("render")


    return <Container cards={songCards} />
}

export default PlaylistContainer