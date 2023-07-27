import { useContext } from "react"

import { Context } from "../contexts/Context"
import { ThemeContext } from "../contexts/ThemeContext"

import "./SearchSong.css"

import PropTypes from 'prop-types'

function SearchSong(props) {
    const { addPlaylistTrack, currentPlaylist } = useContext(Context)
    const { theme, mode } = useContext(ThemeContext)
    let songs = [];
    let data = props.data;

    if (Object.prototype.hasOwnProperty.call(data, 'tracks')) {
        songs = props.data.tracks.items.map(track => {
            return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumArt: track.album.images[0].url
            };
        })
    }

    let cards = songs.map((song) => {
        return (
            <div
                key={song.uri}
                onClick={() => addPlaylistTrack(currentPlaylist, song.uri)}
                className={`playlist-card m-2 p-2 
                d-flex align-items-center rounded gap-2 
                songSearch`}
                id={`card-${mode}`}
            >
                <img
                    src={song.albumArt}
                    alt={`${song.title} Cover Art`}
                    className="mp-card--art"
                />
                <div className='d-flex flex-column align-items-start text-start'>
                    <h4>{song.title}</h4>
                    <h5>{song.artist}</h5>
                </div>
            </div>
        )
    })

    return (
        <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
        >
            <div
                className={`offcanvas-header secondary-offcanvas-${theme}-${mode}`}
            >
                <div>
                    <h4
                        className="offcanvas-title text-start"
                        id="offcanvasExampleLabel"
                    >
                        Songs
                    </h4>
                    {
                        songs.length > 0 ?
                            <p>Click song to add to current playlist</p> :
                            <p className='text-danger'>Search field was empty</p>
                    }
                </div>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className={`offcanvas-body secondary-offcanvas-${theme}-${mode}`}>
                {/* Place for song lists */}
                {cards}
            </div>
        </div>
    )
}

SearchSong.propTypes = {
    data: PropTypes.object
};

export default SearchSong