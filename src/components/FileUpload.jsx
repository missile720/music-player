import { useState } from "react";
import "./FileUpload.css";

const FileUpload = () => {

  const [playlistData, setPlaylistData] = useState({
    images: [],
    name: "",
    tracks: [],
    source: 'local'
  });

  function compressImage(base64String, callback) {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 100;
      canvas.height = 100;

      context.drawImage(image, 0, 0, 100, 100);

      const compressedBase64String = canvas.toDataURL('image/jpeg', 0.8);
      callback(compressedBase64String);
    };

    image.src = base64String;
  }

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

  // The song file is currently too big to be on local storage and since this is a web app
  // we can't access a folder every time the user visits the site. We can either convert this to a 
  // desktop application, or utilize a database to hold this data.
  function convertAudioFileToString(file, callback) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      callback(base64String);
    }
    reader.readAsDataURL(file)

  }

  function handleFileUpload(event) {
    const jsMediaTags = window.jsmediatags;
    const files = [...event.target.files];

    const songFiles = files.map((song) => {
      const songData = {
        name: song.name,
        artist: "Unknown Artist",
        audioSource: convertAudioFileToString(song, (base64String) => (
          base64String
        )),
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
            let convertedString = ''

            for (let i = 0; i < pictureData.length; i++) {
              convertedString += String.fromCharCode(pictureData[i]);
            }

            let base64String = `data:${format};base64,${window.btoa(convertedString)}`;
            compressImage(base64String, (compressedBase64String) => {
              songData.songImage = compressedBase64String
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

  function handleLocalStorage() {
    if (localStorage.getItem("Local Music")) {
      const localMusic = JSON.parse(localStorage.getItem("Local Music"));
      for (let i = 0; i < localMusic.length; i++) {
        if (localMusic[i].name === playlistData.name) {
          playlistData.name += "(1)";
          break;
        }
      }
      localMusic.push(playlistData);
      localStorage.setItem(`Local Music`, JSON.stringify(localMusic));
    } else {
      localStorage.setItem(`Local Music`, JSON.stringify([playlistData]));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      playlistData.images &&
      playlistData.name &&
      playlistData.tracks.length
    ) {
      handleLocalStorage();
    }
  }

  return (
    <form
      className="modal fade"
      id="file-upload"
      data-backdrop="static"
      aria-labelledby="file-upload-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Upload Local Music
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <span id="inputGroup-sizing-default">Playlist Cover Image</span>
              <input
                type="file"
                className="form-control"
                required
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={handlePlaylistCoverChange}
                accept="image/*"
              />
            </div>
            <div className=" mb-3">
              <span id="inputGroup-sizing-default">Playlist Name</span>
              <input
                type="text"
                className="form-control"
                required
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={playlistData.name}
                onChange={handlePlaylistChangeName}
              />
            </div>
            <div className="mb-3">
              <span id="inputGroup-sizing-default">Songs</span>
              <input
                className="form-control"
                type="file"
                required
                id="formFileMultiple"
                accept="audio/*"
                multiple
                onChange={handleFileUpload}
              />
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
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FileUpload;
