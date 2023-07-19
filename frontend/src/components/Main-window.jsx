import { useState, useEffect, useContext } from "react";

import { Context } from "../contexts/Context.jsx";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext.jsx";
import { ThemeContext } from "../contexts/ThemeContext.jsx";

import Nav from "./Navbar";
import LibraryContainer from "./LibraryContainer";
import PlaylistContainer from "./PlaylistContainer";
import SettingsBar from "./SettingsBar";
import Player from "./Player.jsx";
import PlaylistControls from "./PlaylistControls.jsx";
import WaveformVisualizer from "./WaveformVisualizer.jsx";

import returnImg from "../assets/return.svg";
import "./main.css";
import LocalMusicPlayer from "./LocalMusicPlayer.jsx";

// Debugging variables
import testPlaylistsData from "../test/test-playlist.jsx";
const debug = false;

function Main() {
  const { theme, mode } = useContext(ThemeContext);
  const { userPlaylistSpotify, currentPlayingSongData, logout, userProfileSpotify } = useContext(Context);
  const [localPlaylistsState, setLocalPlaylistsState] = useState([]);

  const {
    library,
    setLibrary,
    playlistIndex,
    libraryView,
    setLibraryView,
    currentSongSource,
    getPlaylistName,
  } = useContext(MusicPlayerStateContext);

  // Load the user's playlists from Spotify and local storage into the
  // library whenever it's updated
  useEffect(() => {
    if (debug) {
      setLibrary(testPlaylistsData);
    } else {
      if (localPlaylistsState && userPlaylistSpotify.items) {
        const joinedPlaylists = [
          ...userPlaylistSpotify.items,
          ...localPlaylistsState,
        ];
        setLibrary(joinedPlaylists);
      } else if (userPlaylistSpotify.items) {
        setLibrary(userPlaylistSpotify.items);
      }
    }
  }, [userPlaylistSpotify, localPlaylistsState]);

  useEffect(() => {
    fetchLocalPlaylists();
  }, [userProfileSpotify])

  async function fetchLocalPlaylists() {
    try {
      const response = await fetch(`http://localhost:3000/api/playlist/getPlaylists/${userProfileSpotify.email}`);
      const data = await response.json();
      setLocalPlaylistsState(data)
    } catch (error) {
      console.log(error)

      return [];
    }
  }

  return (
    <div className="container-fluid  h-100" id={`primary-${theme}-${mode}`}>
      <PlaylistControls
        setLocalPlaylistsState={setLocalPlaylistsState}
        fetchLocalPlaylists={fetchLocalPlaylists}
      />
      <div className="row h-100">
        {/* left column */}
        <div
          className={`col-12 col-md-6 h-100 ${libraryView ? "" : "d-none d-md-block"
            }`}
        >
          {/* Nav/search bar */}
          <div className="col-12 ns-bar text-center">
            <Nav />
          </div>
          <div className="col-12 lib-text playlist-bar">
            <h3 className="title">Library</h3>
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
        <div
          className={`col-12 col-md-6 h-100 ${!libraryView ? ""
            : "d-none d-md-block"
            }`}
        >
          <div className="col-12 d-flex cur-text align-items-center">
            <button
              className={`btn col-2 d-md-none element-${theme}-${mode} rounded`}
              onClick={() => setLibraryView(true)}
            >
              <img
                src={returnImg}
                alt="Return arrow"
                className={`svg-${theme}-${mode}`}
              ></img>
            </button>
            <div className="col-10 col-md-12 px-2">
              <h3 className="title">{getPlaylistName()}</h3>
            </div>
          </div>
          {/* Current playlist */}
          <div className="col-12 cur-list">
            <PlaylistContainer
              playlist={library.length > 0 ? library[playlistIndex] : []}
            />
          </div>
          {/* Music Visualizer */}
          <div className="col-12 cur-vis">
            {currentPlayingSongData && <WaveformVisualizer />}
          </div>
          {/* Current song bar */}
          <div className="col-12 cur-song-bar ">
            {/* < CurrentSong /> */}
            {currentSongSource === "spotify" ? (
              <Player />
            ) : (
              <LocalMusicPlayer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
