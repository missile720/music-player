/* eslint react/prop-types: 0 */
import { useContext } from 'react';
import { Context } from "../Context"
import Container from "./Container"
import PlaylistCard from "./PlaylistCard"

/**
 * A container component that displays a library of playlists
 * by converting the playlists into playlist cards
 * @param {Object[]} library An array of playlist objects
 * @returns {Container} A Container that displays PlaylistCard
 * elements
 */
function LibraryContainer() {
    const { userPlaylistSpotify } = useContext(Context);

    if (userPlaylistSpotify.items) {
        const playlistCards = userPlaylistSpotify.items.map((playlist, index) =>
            <PlaylistCard key={index} playlist={playlist} />)

        return <Container cards={playlistCards} />
    }

}

export default LibraryContainer