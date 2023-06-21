import { useEffect, useContext } from "react";

import { Context } from "../contexts/Context.jsx"
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx"

import Nav from "./Navbar";
import LibraryContainer from "./LibraryContainer";
import PlaylistContainer from "./PlaylistContainer";
import SettingsBar from "./SettingsBar";
import CurrentSong from "./CurrentSong";
import FileUpload from "./FileUpload";

import returnImg from "../assets/return.svg"
import "./main.css";
import Container from "./Container.jsx";

function Main() {
  const { userPlaylistSpotify } = useContext(Context)
  const {
    library,
    setLibrary,
    playlistIndex,
    libraryView,
    setLibraryView
  } = useContext(MusicPlayerStateContext)

  // Load the user's playlists from Spotify into the library whenever
  // it's updated
  useEffect(() => {
    if (userPlaylistSpotify.items) {
      setLibrary(userPlaylistSpotify.items)
    }
  }, [userPlaylistSpotify])

  return (
    <div className="container-fluid h-100">
      <FileUpload />
      <div className="row h-100">

        {/* left column */}
        <div className= {`col-12 col-md-6 ${libraryView ? "":"d-none d-md-block"}`}>
          {/* Nav/search bar */}
          <div className="col-12 ns-bar text-center">
            <Nav />
          </div>
          <div className="col-12 lib-text playlist-bar">
            <h3>Library</h3>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#file-upload"
            >
              Create Playlist From Local Music
            </button>
          </div>
          {/* Library playlist */}
          <div className="col-12 lib-list">
            {/* Library initialized as an array of the single playlist in the test data */}
            <LibraryContainer library={library} />
          </div>
          <div className="col-12 settings-bar">
            <SettingsBar />
          </div>
        </div>

        {/* right column */}
        <div className={`col-12 col-md-6 ${!libraryView ? "":"d-none d-md-block"}`}>
          <div className="col-12 d-flex">
            <button className="col-3 d-md-none" onClick={()=>setLibraryView(true)}>
              <img src={returnImg} alt = "Return arrow"></img>
            </button>
            <div className="col-9 col-md-12 cur-text">
              <h3>{library.length > 0 && library[playlistIndex].name}</h3>
            </div>
          </div>
          {/* Current playlist */}
          <div className="col-12 cur-list">
            {/* Uses the single playlist in the test data to demo the playlist container */}
            <PlaylistContainer
              playlist={library.length > 0 ? library[playlistIndex] : []}
            />
          </div>
          {/* Current song bar */}
          <div className="col-12 cur-song-bar ">
            <CurrentSong />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Main;
