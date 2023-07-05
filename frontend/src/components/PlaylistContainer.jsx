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
function PlaylistContainer({ playlist }) {
    const { getSpotifyPlaylistTracks, currentPlaylistId } = useContext(Context)
    const {
        library,
        playlistIndex,
        chooseSong,
        setCurrentTracklist
    } = useContext(MusicPlayerStateContext)
    const [songCards, setSongCards] = useState([])

    // If playlist is from spotify, fetch the tracklist
    useEffect(() => {
        currentPlaylistId(playlist.id)

        if (playlist.tracks && playlist.tracks.href) {
            getSpotifyPlaylistTracks(playlist.tracks.href)
                .then(tracks => {
                    const validTracks = tracks.items.filter(song => song.track)

                    setCurrentTracklist(
                        validTracks
                            .map(song => song.track.uri)
                    )

                    setSongCards(validTracks
                        .map((song, index) =>
                            <SongCard
                                key={index}
                                index={index}
                                song={song.track}
                                cardClickHandler={() => chooseSong(index)}
                            />
                        )
                    )
                })
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
        }
    }, [library, playlistIndex])

    return <Container
        cards={songCards}
    />
}

export default PlaylistContainer