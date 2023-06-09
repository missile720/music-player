/* eslint react/prop-types: 0 */
import "./Card.css"

/**
 * A generic Card class to display playlists in a library or songs
 * in a playlist. Not meant to be used on its own, is instead
 * used as a generic "Parent" class for PlaylistCard and SongCard
 * @param {Object} coverArt An object that contains the url of the image
 * to be displayed with the playlist/song as well as the title 
 * of the image for the alt text
 * @param {ReactComponentElement} metaData The React component displaying
 * the most relevant details of a playlist/song to be displayed
 * @returns {ReactComponentElement} A Card meant to display relevant
 * information of a playlist/song
 */
function Card({ coverArt, metaData }) {
    return (
        <div
            className="playlist-card bg-primary p-2 d-flex 
                align-items-center rounded gap-2 bg-body-tertiary"
        >
            <img
                src={coverArt.url}
                alt={`${coverArt.title} Cover Art`}
                className="mp-card--art"
            />
            {metaData}
        </div>
    )
}

export default Card