import { useState, useContext, useEffect } from "react";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext";
import { nanoid } from "nanoid";
import { Context } from "../contexts/Context";

import EditPlaylists from "./EditPlaylists";
import CreatePlaylist from "./CreatePlaylist";

import "./PlaylistControls.css";


const PlaylistControls = ({ setLocalPlaylistsState, fetchLocalPlaylists }) => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [selectedPlaylistSource, setSelectedPlaylistSource] = useState("");
  const [activeTab, setActiveTab] = useState("create");

  const { library } = useContext(MusicPlayerStateContext);
  const { updatePlaylistName } = useContext(Context);

  // Some of the functionality is based on whether the playlist was made locally or has been pulled from Spotify so giving it a
  // source of 'local' will help differentiate the two.
  const [playlistData, setPlaylistData] = useState({
    source: "local",
    id: nanoid(5),
  });

  useEffect(() => {
    resetInputs();
  }, [activeTab]);

  useEffect(() => {
    resetInputs();
    for (let song of library) {
      if (song.id === selectedPlaylistId) {
        if (song.source === "local") {
          setSelectedPlaylistSource("local");
        } else {
          setSelectedPlaylistSource("spotify");
        }
      }
    }
  }, [selectedPlaylistId]);


  // ========================================================================================================================
  // Helper Functions
  function setLocalStoragePlaylists(item) {
    localStorage.setItem("Local Music", JSON.stringify(item));
  }

  function handleChangeActiveTab(tabName) {
    setActiveTab(tabName);
  }

  function handleSelectionChange(event) {
    setSelectedPlaylistId(event.target.value);
  }

  function resetInputs() {
    setPlaylistData({
      images: [],
      name: "",
      tracks: [],
      source: "local",
      id: nanoid(5),
    });
  }

  function compressImage(base64String, callback) {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 100;
      canvas.height = 100;

      context.drawImage(image, 0, 0, 100, 100);

      const compressedBase64String = canvas.toDataURL("image/jpeg", 0.8);
      callback(compressedBase64String);
    };

    image.src = base64String;
  }

  // ========================================================================================================================

  function handlePlaylistCoverChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      let base64String = reader.result;
      compressImage(base64String, (compressedBase64String) => {
        setPlaylistData({
          ...playlistData,
          images: [{ url: compressedBase64String }],
        });
      });
    };

    reader.readAsDataURL(file);
  }

  function handlePlaylistChangeName(event) {
    setPlaylistData({
      ...playlistData,
      name: event.target.value,
    });
  }

  function convertAudioFileToString(file, callback) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      callback(base64String);
    };
    reader.readAsDataURL(file);
  }

  function handleFileUpload(event) {
    const jsMediaTags = window.jsmediatags;
    const files = [...event.target.files];

    const songFiles = files.map((song) => {
      const songData = {
        name: song.name,
        artist: "Unknown Artist",
        audioSource: convertAudioFileToString(
          song,
          (base64String) => base64String
        ),
        id: nanoid(5),
      };

      jsMediaTags.read(song, {
        onSuccess: function (tag) {
          if (tag.tags.title) {
            songData.name = tag.tags.title;
          }
          if (tag.tags.artist) {
            songData.artist = tag.tags.artist;
          }
          if (tag.tags.picture) {
            const pictureData = tag.tags.picture.data;
            const format = tag.tags.picture.format;
            let convertedString = "";

            for (let i = 0; i < pictureData.length; i++) {
              convertedString += String.fromCharCode(pictureData[i]);
            }

            let base64String = `data:${format};base64,${window.btoa(
              convertedString
            )}`;
            compressImage(base64String, (compressedBase64String) => {
              songData.songImage = compressedBase64String;
            });
          }
        },
        onError: function (error) {
          console.log(error);
        },
      });

      return songData;
    });
    setPlaylistData({
      ...playlistData,
      tracks: songFiles,
    });
  }

  function handleDeletePlaylist() {
    if (selectedPlaylistSource === 'local') {
      const localStorage = fetchLocalPlaylists();
      const updatedLocalStorage = localStorage.filter(playlist => playlist.id !== selectedPlaylistId);
      // This updates the local storage
      setLocalStoragePlaylists(updatedLocalStorage);
      // This updates the state of what the local storage is so that the useEffect in the parent component
      // can re-render the library with the changes
      setLocalPlaylistsState(fetchLocalPlaylists())
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (activeTab === "create") {
      if (
        playlistData.images &&
        playlistData.name &&
        playlistData.tracks.length
      ) {
        handleLocalStorage();
      }
      event.target.reset();
    } else if (activeTab === "edit") {
      if (selectedPlaylistSource === "local") {
        handleLocalStorage();
      } else if (selectedPlaylistSource === "spotify") {
        updatePlaylistName(selectedPlaylistId, playlistData.name);
      }
    }
  }

  function handleLocalStorage() {
    if (localStorage.getItem("Local Music")) {
      const localMusic = fetchLocalPlaylists();
      for (let i = 0; i < localMusic.length; i++) {
        // Making sure there aren't playlists with duplicate names
        if (localMusic[i].name === playlistData.name) {
          playlistData.name += "(1)";
          break;
        }
      }
      if (activeTab === "create") {
        localMusic.push(playlistData);
      } else if (activeTab === "edit") {
        for (let i = 0; i < localMusic.length; i++) {
          if (localMusic[i].id === selectedPlaylistId) {
            localMusic[i] = {
              ...localMusic[i],
              name:
                playlistData.name.length > 0
                  ? playlistData.name
                  : localMusic[i].name,
              images:
                playlistData.images.length > 0
                  ? playlistData.images
                  : localMusic[i].images,
              tracks:
                playlistData.tracks.length > 0
                  ? [...localMusic[i].tracks, ...playlistData.tracks]
                  : localMusic[i].tracks,
            };
          }
        }
      }
      setLocalStoragePlaylists(localMusic)
    } else {
      setLocalStoragePlaylists([playlistData])
    }
    resetInputs();
    setLocalPlaylistsState(fetchLocalPlaylists());
  }

  return (
    <>
      {/* Modal to alert user of playlist deletion */}
      <div
        className="modal fade"
        id="delete-playlist-modal"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Delete Playlist</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Deleting a playlist is permanent. Are you sure you want to delete
              this playlist?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#file-upload"
              >
                No
              </button>
              <button type="button" data-bs-dismiss="modal" className="btn btn-danger" onClick={handleDeletePlaylist}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for playlist controls*/}
      <form
        className="modal fade"
        id="file-upload"
        data-backdrop="static"
        aria-labelledby="file-upload-modal"
        aria-hidden="true"
        onSubmit={handleSubmit}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Local Playlist Controls
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" id="local-playlist-controls-body">
              <div className="d-flex align-items-start">
                <div
                  className="nav flex-column nav-pills me-3"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-create-tab"
                    onClick={() => handleChangeActiveTab("create")}
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-create"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-create"
                    aria-selected="true"
                  >
                    Create Local Playlist
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-edit-tab"
                    onClick={() => handleChangeActiveTab("edit")}
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-edit"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-edit"
                    aria-selected="false"
                  >
                    Edit Local Playlists
                  </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-create"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <CreatePlaylist
                      playlistData={playlistData}
                      handleFileUpload={handleFileUpload}
                      handlePlaylistChangeName={handlePlaylistChangeName}
                      handlePlaylistCoverChange={handlePlaylistCoverChange}
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-edit"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <EditPlaylists
                      playlistData={playlistData}
                      handleFileUpload={handleFileUpload}
                      handlePlaylistChangeName={handlePlaylistChangeName}
                      handlePlaylistCoverChange={handlePlaylistCoverChange}
                      handleSelectionChange={handleSelectionChange}
                      selectedPlaylistSource={selectedPlaylistSource}
                      library={library}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                form="file-upload"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaylistControls;
