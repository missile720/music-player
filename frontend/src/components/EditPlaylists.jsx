const EditPlaylists = ({
  playlistData,
  handlePlaylistChangeName,
  handlePlaylistCoverChange,
  handleSongMetaData,
  handleSelectionChange,
  selectedPlaylistSource,
  library,
}) => {
  const playlistsToEditOptions = library.map((playlist) => (
    <option key={playlist.id} value={playlist.id}>
      {playlist.name}
    </option>
  ));

  return (
    <>
      <div className="mb-3">
        <span id="inputGroup-sizing-default">Select a Playlist to Edit</span>
        <select
          className="form-select"
          data-live-search="true"
          onChange={handleSelectionChange}
        >
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          {playlistsToEditOptions}
        </select>
      </div>
      <div className=" mb-3">
        <span id="inputGroup-sizing-default">Edit Playlist Name</span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={playlistData.name}
          onChange={handlePlaylistChangeName}
        />
      </div>
      {selectedPlaylistSource === "local" && (
        <>
          <div className="mb-3">
            <span id="inputGroup-sizing-default">
              Edit Playlist Cover Image
            </span>
            <input
              type="file"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={handlePlaylistCoverChange}
              accept="image/*"
              name="add-image-edit"
            />
          </div>
          <div className="mb-3">
            <span id="inputGroup-sizing-default">Add Songs</span>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              accept="audio/*"
              multiple
              onChange={handleSongMetaData}
            />
          </div>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#delete-playlist-modal"
          >
            Delete Playlist
          </button>
        </>
      )}
    </>
  );
};

export default EditPlaylists;
