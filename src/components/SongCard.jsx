/* eslint react/prop-types: 0 */
import {useState, useContext} from 'react'
import { Context } from "../Context.jsx"
import Card from "./Card"
import defaultSongArt from "../assets/defaultCardArt.svg"
import trash from '../assets/trash.svg'
import trashHover from '../assets/trashSelected.svg'

/**
 * Component for displaying songs in a playlist
 * @param {Object} song A song object
 * @returns A Card component displaying the details of a
 * given song
 */
function SongCard({ song }) {
    /**
     * Get the art for a song
     * @param {Object} song Track object from Spotify API
     * @returns {string} The url for a song's album art
     */

    const [hover,setHover] = useState(false);
    const { deletePlaylistTrack, currentPlaylist } = useContext(Context)

    function handleMouseEnter(){
        setHover(true);
    }

    function handleMouseLeave(){
        setHover(false);
    }

    function getSongArt(song) {
        if (song.album &&
            song.album.images &&
            song.album.images.length > 0) {
            return song.album.images[0].url
        }

        return defaultSongArt
    }

    /**
     * Returns a string of artists for the song
     * @param {Object} song Track object from Spotify API
     * @returns {string} A string of the artists for a track
     */
    function getArtists(song) {
        if (song.artists &&
            song.artists.length > 0) {
            return song.artists.map(artist => artist.name)
                .join(", ")
        }

        return "Unknown Artist"
    }

    /**
     * Gets a song's album
     * @param {Object} song Track object from Spotify API
     * @returns {string} The album a song is from
     */
    function getAlbum(song) {
        if (song.album) {
            return song.album.name
        }

        return "Unknown Album"
    }

    const songData = <>
                        <span className="d-flex flex-column">
                            <h4>{song.name}</h4>
                            <h5>{getArtists(song)}</h5>
                        </span>
                        <img src={ hover ? trashHover : trash} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => deletePlaylistTrack(currentPlaylist,song.uri)}  alt="trash icon" className="trashIcon"/>
                    </>

    return <Card
        coverArt={{ url: getSongArt(song), title: getAlbum(song) }}
        metaData={songData}
    />
}

export default SongCard