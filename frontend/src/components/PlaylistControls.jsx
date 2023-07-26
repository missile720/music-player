import { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../contexts/Context";
import { MusicPlayerStateContext } from "../contexts/MusicPlayerStateContext";
import { ThemeContext } from "../contexts/ThemeContext";

import EditPlaylists from "./EditPlaylists";
import CreatePlaylist from "./CreatePlaylist";

import "./PlaylistControls.css";

const PlaylistControls = () => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [selectedPlaylistSource, setSelectedPlaylistSource] = useState("");
  const [activeTab, setActiveTab] = useState("create");

  const {
    library,
    playlistIndex,
    choosePlaylist,
    setUpdating,
  } = useContext(MusicPlayerStateContext);
  const { theme, mode } = useContext(ThemeContext);
  const {
    updatePlaylistName,
    userProfileSpotify,
    updateLocalPlaylists
  } = useContext(Context);

  const [playlistData, setPlaylistData] = useState({});
  const formRef = useRef(null);

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
  }, [selectedPlaylistId, library]);

  function handleChangeActiveTab(tabName) {
    setActiveTab(tabName);
  }

  function handleSelectionChange(event) {
    setSelectedPlaylistId(event.target.value);
  }

  function resetInputs() {
    setPlaylistData({
      name: "",
      tracks: [],
      source: "local",
    });
  }

  function handleFormattingFilesForUpload() {
    const files = [...playlistData.tracks];
    return files;
  }

  async function handleUpload(filesToUpload) {
    const formData = new FormData();

    formData.append("email", userProfileSpotify.email);
    formData.append("playlistName", playlistData.name);
    formData.append("playlistImage", playlistData.image);
    filesToUpload.forEach((file) => {
      formData.append("songNames", file.name);
      formData.append("songArtists", file.artist);
      formData.append("songImages", file.songImage);
      formData.append("songSources", file.audioSource);
    });

    try {
      await fetch(
        `http://localhost:3000/api/playlist/uploadNewPlaylist`,
        {
          method: "POST",
          body: formData,
        }
      );
      await updateLocalPlaylists();
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePlaylistEdit(filesToUpload) {
    const formData = new FormData();

    formData.append("playlistName", playlistData.name);
    formData.append(
      "playlistImage",
      playlistData.image ? playlistData.image : ""
    );
    formData.append("playlistId", selectedPlaylistId);
    filesToUpload.forEach((file) => {
      formData.append("songNames", file.name);
      formData.append("songArtists", file.artist);
      formData.append("songImages", file.songImage);
      formData.append("songSources", file.audioSource);
    });

    try {
      await fetch(
        `http://localhost:3000/api/playlist/editPlaylist`,
        {
          method: "PUT",
          body: formData,
        }
      );
      await updateLocalPlaylists();
    } catch (error) {
      console.log({ "Error editing playlist": error });
    }
  }

  async function handleDeletePlaylist() {
    if (library[playlistIndex].id === selectedPlaylistId) {
      choosePlaylist(playlistIndex - 1);
    }
    if (selectedPlaylistSource === "local") {
      try {
        await fetch(
          `http://localhost:3000/api/playlist/deletePlaylist`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              playlistId: selectedPlaylistId,
              email: userProfileSpotify.email,
            }),
          }
        );
        setUpdating(true)
        formRef.current.reset();
        setSelectedPlaylistSource("");
        await updateLocalPlaylists();
      } catch (error) {
        console.log({ "Error editing playlist": error });
      }
    }

  }

  function handlePlaylistCoverChange(event) {
    const file = event.target.files[0];
    setPlaylistData({
      ...playlistData,
      image: file,
    });
  }

  function handlePlaylistChangeName(event) {
    setPlaylistData({
      ...playlistData,
      name: event.target.value,
    });
  }

  function handleSongMetaData(event) {
    const jsMediaTags = window.jsmediatags;
    const files = [...event.target.files];

    const songFiles = files.map((song) => {
      const songData = {
        name: song.name,
        artist: "Unknown Artist",
        audioSource: song,
        songImage: "",
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
            const fileData = new Uint8Array(pictureData);
            const file = new Blob([fileData], { type: format });

            songData.songImage = file;
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

  async function handleSubmit(event) {
    event.preventDefault();
    if (activeTab === "create") {
      if (
        playlistData.image &&
        playlistData.name &&
        playlistData.tracks.length
      ) {
        const files = handleFormattingFilesForUpload();
        await handleUpload(files);
      }
      event.target.reset();
    } else if (activeTab === "edit") {
      if (selectedPlaylistSource === "local") {
        const files = handleFormattingFilesForUpload();
        handlePlaylistEdit(files);
      } else if (selectedPlaylistSource === "spotify") {
        updatePlaylistName(selectedPlaylistId, playlistData.name);
      }
    }
    resetInputs();
    formRef.current.reset();
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
          <div className={`modal-content primary-${theme}-${mode}`}>
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
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-danger"
                onClick={handleDeletePlaylist}
              >
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
        ref={formRef}
      >
        <div className="modal-dialog">
          <div className={`modal-content primary-${theme}-${mode}`}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Playlist Controls
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
                    className={`nav-link active nav-link-${theme}-${mode}`}
                    id="v-pills-create-tab"
                    onClick={() => handleChangeActiveTab("create")}
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-create"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-create"
                    aria-selected="true"
                  >
                    Create a Playlist
                  </button>
                  <button
                    className={`nav-link nav-link-${theme}-${mode}`}
                    id="v-pills-edit-tab"
                    onClick={() => handleChangeActiveTab("edit")}
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-edit"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-edit"
                    aria-selected="false"
                  >
                    Edit Playlists
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
                      handleSongMetaData={handleSongMetaData}
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
                      handleSongMetaData={handleSongMetaData}
                      handlePlaylistChangeName={handlePlaylistChangeName}
                      handlePlaylistCoverChange={handlePlaylistCoverChange}
                      handleSelectionChange={handleSelectionChange}
                      selectedPlaylistSource={selectedPlaylistSource}
                      library={library}
                      formRef={formRef}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className={`btn element-${theme}-${mode}`}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                form="file-upload"
                className={`btn element-${theme}-${mode}`}
                data-bs-dismiss="modal"
                onClick={() => setUpdating(true)}
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
