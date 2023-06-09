import Nav from './Navbar'
import LibraryContainer from "./LibraryContainer"
import PlaylistContainer from "./PlaylistContainer"
import testData from "../data/test-playlist-data.js"
import SettingsBar from './SettingsBar'
import CurrentSong from './CurrentSong'
import './main.css'


function Main() {
  // Test data is temporary, used for demoing Library and Playlist Containers
  const { playlist } = testData
  console.log(playlist)
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
            {/* Library initialized as an array of the single playlist in the test data */}
            <LibraryContainer library={playlist} />
          </div>
          <div className='col-12 settings-bar'>
            <SettingsBar />
          </div>
        </div>

        {/* right column */}
        <div className='col-6'>
          <div className='col-12 cur-text'>
            <h3>Current Playlist Name</h3>
          </div>
          {/* Current playlist */}
          <div className='col-12 cur-list'>
            {/* Uses the single playlist in the test data to demo the playlist container */}
            <PlaylistContainer playlist={playlist[0]} />
            
          </div>
          {/* Current song bar */}
          <div className='col-12 cur-song-bar '>
            < CurrentSong />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;
