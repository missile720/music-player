import "./Container.css"

/**
 * Give props for cards to display, displays the cards in the container
 * @returns {ReactComponentElement} Container Component For Either Playlist
 * or Library
 */
function Container({ cards }) {
    return (
        <section
            className="container d-flex bg-secondary-subtle w-100"
        >
            This is a Container
        </section>
    )
}

export default Container