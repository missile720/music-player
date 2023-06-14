import './SearchSong.css'

function SearchSong(props) {
    let songs = [];

    if(props.data.hasOwnProperty('tracks')){
        songs = props.data.tracks.items.map(track => {
            return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumArt: track.album.images[0]
            };
        })
    }

    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Songs</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {/* Place for song lists */}
                <div>
                    Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                </div>
            </div>
        </div>
    )
}

export default SearchSong