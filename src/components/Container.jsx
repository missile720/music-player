/* eslint react/prop-types: 0 */
/**
 * Give props for cards to display, displays the cards in the container.
 * Meant to solely be used as a "Parent" class and should not be used
 * on its own
 * @param {ReactComponentElement[]} cards An array of Card components to 
 * display in the container
 * @returns {ReactComponentElement} Container component displaying either
 * the songs of a playlist or the playlists in a library
 */
function Container({ cards }) {
    return (
        <section
            className="mp-container container
            bg-secondary-subtle h-100 w-100 p-3
            d-flex flex-column gap-1"
        >
            {cards}
        </section>
    )
}

export default Container