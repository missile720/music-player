import { useState, useEffect, useContext } from "react";

import { Context } from "../contexts/Context.jsx"
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx"
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import Nav from "./Navbar";
import LibraryContainer from "./LibraryContainer";
import PlaylistContainer from "./PlaylistContainer";
import SettingsBar from "./SettingsBar";
import CurrentSong from "./CurrentSong";
import LocalLibraryControls from "./LocalLibrary.jsx";
import "./main.css";


function Main() {
  console.log("render")

  const { theme } = useContext(ThemeContext)
  const { userPlaylistSpotify } = useContext(Context)
  const [localPlaylists, setLocalPlaylists] = useState(fetchLocalPlaylists());

  const {
    library,
    setLibrary,
    playlistIndex
  } = useContext(MusicPlayerStateContext)

  // Load the user's playlists from Spotify into the library whenever
  // it's updated
  useEffect(() => {
    if (localPlaylists && userPlaylistSpotify.items) {
      const joinedPlaylists = [...userPlaylistSpotify.items, ...localPlaylists];
      setLibrary(joinedPlaylists)
    } else if (userPlaylistSpotify.items) {
      setLibrary(userPlaylistSpotify.items)
    }
  }, [userPlaylistSpotify, localPlaylists])

  function fetchLocalPlaylists() {
    return JSON.parse(localStorage.getItem("Local Music"));
  }

  return (
    <div className="container-fluid  h-100" id={theme}>
      <LocalLibraryControls />
      <div className="row h-100">
        {/* left column */}
        <div className="col-6">
          {/* Nav/search bar */}
          <div className="col-12 ns-bar text-center">
            <Nav />
          </div>
          <div className="col-12 lib-text playlist-bar">
            <h3>Library</h3>
            <button
              type="button"
              className={`btn button-${theme}`}
              data-bs-toggle="modal"
              data-bs-target="#file-upload"
            >
              Local Playlists
            </button>
          </div>
          {/* Library playlist */}
          <div className="col-12 lib-list">
            {/* Library initialized as an array of the single playlist in the test data */}
            <LibraryContainer library={library} />
          </div>
          <br></br>
          <div className="col-12 settings-bar">
            <SettingsBar />
          </div>
        </div>

        {/* right column */}
        <div className="col-6">
          <div className="col-12 cur-text">
            <h3>{library.length > 0 && library[playlistIndex].name}</h3>
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
