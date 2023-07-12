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
    const {
        getSpotifyPlaylistTracks,
        currentPlaylistId,
        userProfileSpotify
    } = useContext(Context)
    const {
        library,
        playlistIndex,
        chooseSong,
        setCurrentTracklist
    } = useContext(MusicPlayerStateContext)
    const [songCards, setSongCards] = useState([])

    /**
     * Returns whether or not a playlist object is owned by the user
     * and is therefore editable by the them. Used to check for rendering 
     * logic of songCards.
     * @param {Object[]} playlist An object containing the relevant
     * informatino about a playlist
     * @returns {bool} Whether or not a playlist is editable by a user
     */
    function isOwnedByUser(playlist) {
        // If the playlist is from the user's local files, it is assumed
        // they will always be editable
        if (playlist.source && playlist.source === "local") {
            return true
        }

        // If the playlist is from spotify
        if (playlist.owner) {
            return playlist.owner.uri === userProfileSpotify.uri
        }

        return true
    }

    // Set the songCards based on the source of the playlist
    useEffect(() => {
        currentPlaylistId(playlist.id)

        const isEditable = isOwnedByUser(playlist)

        // If the playlist is from spotify
        if (playlist.tracks && playlist.tracks.href) {
            getSpotifyPlaylistTracks(playlist.tracks.href)
                .then(tracks => {

                    // Only process songs in the playlist if they have valid
                    // track information (i.e. are playable)
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
                                isEditable={isEditable}
                            />
                        )
                    )
                })
        }

        // If the spotify is from local files
        if (playlist.source === 'local') {
            setCurrentTracklist(playlist.tracks)

            setSongCards(playlist.tracks.map(
                (song, index) =>
                    <SongCard
                        key={index}
                        index={index}
                        song={song}
                        cardClickHandler={() => chooseSong(index)}
                        isEditable={isEditable}
                    />))
        }
    }, [library, playlistIndex])

    return <Container
        cards={songCards}
    />
}

export default PlaylistContainer