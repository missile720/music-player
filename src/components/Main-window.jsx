import { useState, useEffect, useContext } from "react"

import { Context } from "../contexts/Context.jsx";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx";
import { ThemeContext } from "../contexts/ThemeContext.jsx";

import Nav from "./Navbar";
import LibraryContainer from "./LibraryContainer";
import PlaylistContainer from "./PlaylistContainer";
import SettingsBar from "./SettingsBar";
// import CurrentSong from "./CurrentSong";
import Player from "./Player.jsx";
import PlaylistControls from "./PlaylistControls.jsx";

import returnImg from "../assets/return.svg";
import "./main.css";

function Main() {
  const { theme, mode } = useContext(ThemeContext);
  const { userPlaylistSpotify ,accessToken, getSpotifyPlaylistTracks} = useContext(Context);
  const [localPlaylistsState, setLocalPlaylistsState] = useState(() => fetchLocalPlaylists());

  const { library, setLibrary, playlistIndex, libraryView, setLibraryView, currentSongIndex } =
    useContext(MusicPlayerStateContext);

  // Load the user's playlists from Spotify and local storage into the
  // library whenever it's updated
  useEffect(() => {
    if (localPlaylistsState && userPlaylistSpotify.items) {
      const joinedPlaylists = [...userPlaylistSpotify.items, ...localPlaylistsState];
      setLibrary(joinedPlaylists);
    } else if (userPlaylistSpotify.items) {
      setLibrary(userPlaylistSpotify.items);
    }
  }, [userPlaylistSpotify, localPlaylistsState]);

  function fetchLocalPlaylists() {
    return JSON.parse(localStorage.getItem("Local Music"));
  }

  return (
    <div className="container-fluid  h-100" id={`primary-${theme}-${mode}`}>
      <PlaylistControls setLocalPlaylistsState={setLocalPlaylistsState} fetchLocalPlaylists={fetchLocalPlaylists} />
      <div className="row h-100">
        {/* left column */}
        <div className={`col-12 col-md-6 h-100 ${libraryView ? "" : "d-none d-md-block"}`}>
          {/* Nav/search bar */}
          <div className="col-12 ns-bar text-center">
            <Nav />
          </div>
          <div className="col-12 lib-text playlist-bar">
            <h3>Library</h3>
            <button
              type="button"
              className={`btn element-${theme}-${mode}`}
              data-bs-toggle="modal"
              data-bs-target="#file-upload"
            >
              Playlist Controls
            </button>
          </div>
          {/* Library playlist */}
          <div className="col-12 lib-list">
            <LibraryContainer library={library} />
          </div>
          <br></br>
          <div className="col-12 settings-bar">
            <SettingsBar />
          </div>
        </div>

        {/* right column */}
        <div className={`col-12 col-md-6 h-100 ${!libraryView ? "" : "d-none d-md-block"}`}>
          <div className="col-12 d-flex cur-text align-items-center">
            <button className={`col-2 d-md-none button-${mode}`} onClick={() => setLibraryView(true)}>
              <img src={returnImg} alt="Return arrow"></img>
            </button>
            <div className="col-10 col-md-12 px-2">
              <h3>
                {library.length > 0 &&
                  library[playlistIndex] &&
                  library[playlistIndex].name}
              </h3>
            </div>
          </div>
          {/* Current playlist */}
          <div className="col-12 cur-list">
            <PlaylistContainer
              playlist={library.length > 0 ? library[playlistIndex] : []}
            />
          </div>
          {/* Current song bar */}
          <div className='col-12 cur-song-bar '>
            {/* < CurrentSong /> */}
            <Player
            playlist={library.length > 0 ? library[playlistIndex] : []}
            currentSongIndex={currentSongIndex}
            accessToken = {accessToken}
            getSpotifyPlaylistTracks = {getSpotifyPlaylistTracks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
