/* eslint react/prop-types: 0 */
import { useState, useEffect, useContext } from "react"

import { Context } from "../contexts/Context"
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext"

import Container from "./Container"
import SongCard from "./SongCard"

/**
 * Displays the contents of a playlist by generating
 * SongCard elements for each track in its track list.
 * @param {Object} playlist A playlist object
 * @returns {Container} A Container that displays SongCard
 * elements for songs in a playlist
 */
<<<<<<< HEAD
function PlaylistContainer({ playlist, library, playlistIndex, chooseSong }) {
    const { getSpotifyPlaylistTracks } = useContext(Context)
=======
function PlaylistContainer({ playlist }) {
    const { getSpotifyPlaylistTracks, currentPlaylistId } = useContext(Context)
    const {
        library,
        playlistIndex,
        chooseSong
    } = useContext(MusicPlayerStateContext)
>>>>>>> development
    const [songCards, setSongCards] = useState([])
    // If playlist is from spotify, fetch the tracklist
    useEffect(() => {
        currentPlaylistId(playlist.id)
        if (playlist.tracks && playlist.tracks.href) {
            getSpotifyPlaylistTracks(playlist.tracks.href)
                .then(tracks =>
                    setSongCards(tracks.items
                        // Only make a song card if the song is
                        // playable
                        .filter(song =>
                            song.track
                        )
                        .map((song, index) =>
                            <SongCard
                                key={index}
                                index={index}
                                song={song.track}
<<<<<<< HEAD
                                chooseSong={chooseSong}
                                />
                    )))
=======
                                cardClickHandler={() => chooseSong(index)}
                            />
                        )))
        }
        if (playlist.source === 'local') {
            setSongCards(playlist.tracks.map(
                (song, index) =>
                    <SongCard
                        key={index}
                        index={index}
                        song={song}
                        cardClickHandler={() => chooseSong(index)}
                    />))
>>>>>>> development
        }
    }, [library, playlistIndex])

    return <Container
        cards={songCards}
        containerType=" playlist-container"
    />
}

export default PlaylistContainer