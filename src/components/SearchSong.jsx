import './SearchSong.css'
import PropTypes from 'prop-types'

function SearchSong(props) {
    let songs = [];

    if(props.data.hasOwnProperty('tracks')){
        songs = props.data.tracks.items.map(track => {
            return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumArt: track.album.images[0].url
            };
        })
    }
    console.log(props.data)

    let cards = songs.map((song) => {
        return (<div key = {song.uri} className="playlist-card bg-primary m-2 p-2 d-flex align-items-center rounded gap-2 bg-body-tertiary">
                    <img
                        src={song.albumArt}
                        alt={`${song.title} Cover Art`}
                        className="mp-card--art"
                    />
                    <div className='d-flex flex-column align-items-start'>
                        <h4>{song.title}</h4>
                        <h5>{song.artist}</h5>
                    </div>
                </div>)
    })

    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Songs</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {/* Place for song lists */}
                <div>
                    {cards}
                </div>
            </div>
        </div>
    )
}

SearchSong.propTypes = {
    data: PropTypes.object
};

export default SearchSong