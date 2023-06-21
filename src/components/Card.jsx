/* eslint react/prop-types: 0 */
import "./Card.css"
import { ThemeContext } from "../contexts/ThemeContext"
import { useContext } from "react"
/**
 * A generic Card class to display playlists in a library or songs
 * in a playlist. Not meant to be used on its own, is instead
 * used as a generic "Parent" class for PlaylistCard and SongCard
 * @param {Object} coverArt An object that contains the url of the image
 * to be displayed with the playlist/song as well as the title 
 * of the image for the alt text
 * @param {ReactComponentElement} metaData The React component displaying
 * the most relevant details of a playlist/song to be displayed
 * @param {func} cardClickHandler The event handler to be used as the
 * onClick handler for the Card
 * @param {string} cardType The type of card. To be appended as a class
 * name to the component.
 * @returns {ReactComponentElement} A Card meant to display relevant
 * information of a playlist/song
 */
function Card({ coverArt, metaData, cardClickHandler, cardType }) {

    /**
     * 
     * @param {string} cardType The type of card. To be appended as
     * a class to the end of the card's classname
     */
    function getCardClassName(cardType) {
        let className = `container-card bg-primary p-2 d-flex 
            align-items-center rounded gap-2 bg-body-tertiary`

        if (cardType) {
            className += cardType
        }

        return className
    }

    return (
        <div
            onClick={cardClickHandler}
            className={getCardClassName(cardType)}
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