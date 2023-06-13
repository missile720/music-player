/* eslint react/prop-types: 0 */
import Card from "./Card"
import defaultSongArt from "../assets/defaultCardArt.svg"

/**
 * Component for displaying songs in a playlist
 * @param {Object} song A song object
 * @returns A Card component displaying the details of a
 * given song
 */
function SongCard({ index, song }) {
    function getSongArt(song) {
        if (song.album &&
            song.album.images &&
            song.album.images.length > 0) {
            return song.album.images[0].url
        }

        return defaultSongArt
    }

    const songData = <span
        className="d-flex flex-column"
    >
        <h4>{song.title}</h4>
        <h5>{song.artist}</h5>
    </span>

    console.log(index, song)

    return <Card
        coverArt={{ url: getSongArt(song), title: song.album }}
        metaData={songData}
    />
}

export default SongCard