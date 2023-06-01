import "./Container.css"

/**
 * Give props for cards to display, displays the cards in the container
 * @param {ReactComponentElement[]} An array of Card Components to Display
 * in the container
 * @returns {ReactComponentElement} Container Component For Either Playlist
 * or Library
 */
function Container({ cards }) {
    return (
        <section
            className="mp-container container-fluid 
            bg-secondary-subtle h-100 p-3"
        >
            {cards}
        </section>
    )
}

export default Container