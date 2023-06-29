import { useEffect, useContext } from "react"

import { Context } from "../Context.jsx"
import useMusicPlayerState from "../hooks/useMusicPlayerState.js"

import Nav from './Navbar'
import LibraryContainer from "./LibraryContainer"
import PlaylistContainer from "./PlaylistContainer"
import SettingsBar from './SettingsBar'
// import CurrentSong from './CurrentSong'
import Player from "./Player"
import './main.css'


function Main() {
  // Test data is temporary, used for demoing Library and Playlist Containers
  const { userPlaylistSpotify } = useContext(Context)
  const {
    library,
    setLibrary,
    playlistIndex,
    choosePlaylist,
    chooseSong,
    currentSongIndex
  } = useMusicPlayerState()

  useEffect(() => {
    if (userPlaylistSpotify.items &&
      userPlaylistSpotify.items.length !== library.length) {
      setLibrary(userPlaylistSpotify.items)
    }
  }, [userPlaylistSpotify])

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
            <LibraryContainer
              library={library}
              choosePlaylist={choosePlaylist}
            />
          </div>
          <div className='col-12 settings-bar'>
            <SettingsBar />
          </div>
        </div>

        {/* right column */}
        <div className='col-6'>
          <div className='col-12 cur-text'>
            <h3>{library.length > 0 && library[playlistIndex].name}</h3>
          </div>
          {/* Current playlist */}
          <div className='col-12 cur-list'>
            {/* Uses the single playlist in the test data to demo the playlist container */}
            <PlaylistContainer
              playlist={library.length > 0 ? library[playlistIndex] : []}
              library={library}
              playlistIndex={playlistIndex}
              chooseSong={chooseSong}
            currentSongIndex={currentSongIndex}
            />

          </div>
          {/* Current song bar */}
          <div className='col-12 cur-song-bar '>
            {/* < CurrentSong /> */}
            <Player
            playlist={library.length > 0 ? library[playlistIndex] : []}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;
