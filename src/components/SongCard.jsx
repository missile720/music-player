/* eslint react/prop-types: 0 */
import Card from "./Card"

/**
 * Component for displaying songs in a playlist
 * @param {Object} song A song object
 * @returns A Card component displaying the details of a
 * given song
 */
function SongCard({ song }) {
    const songData = <span
        className="d-flex flex-column"
    >
        <h4>{song.title}</h4>
        <h5>{song.artist}</h5>
    </span>

    return <Card
        coverArt={{ url: song.coverArt, title: song.album }}
        metaData={songData}
    />
}

export default SongCard