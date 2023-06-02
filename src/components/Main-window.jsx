import Nav from './Navbar'
import LibraryContainer from "./LibraryContainer"
import PlaylistContainer from "./PlaylistContainer"
import testData from "../data/test-playlist-data.js"
import './main.css'


function Main() {
    const { playlist } = testData

    return (
        <div className='container-fluid h-100'>
            <div className='row h-100'>
                {/* left column */}
                <div className='col-6'>
                    {/* Nav/search bar */}
                    <div className='col-12 ns-bar text-center'>
                        <Nav />
                    </div>
                    <div className='col-12 lib-text'>
                        <h3>Library</h3>
                    </div>
                    {/* Library playlist */}
                    <div className='col-12 lib-list'>
                        <LibraryContainer library={[playlist]} />
                    </div>
                    <div className='col-12 settings-bar'>
                        Settings Bar COMPONENT goes here
                    </div>
                </div>

                {/* right column */}
                <div className='col-6'>
                    <div className='col-12 cur-text'>
                        <h3>Current Playlist Name</h3>
                    </div>
                    {/* Current playlist */}
                    <div className='col-12 cur-list'>
                        <PlaylistContainer playlist={playlist} />
                    </div>
                    {/* Current song bar */}
                    <div className='col-12 cur-song-bar'>
                        Current song playing COMPONENT goes here
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main