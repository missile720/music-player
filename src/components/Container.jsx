/**
 * Give props for cards to display, displays the cards in the container.
 * Meant to solely be used as a "parent class" and should not be used
 * generically
 * @param {ReactComponentElement[]} cards An array of Card Components to 
 * Display in the container
 * @returns {ReactComponentElement} Container Component For ither Playlist
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