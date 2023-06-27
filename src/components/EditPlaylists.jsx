const EditPlaylists = ({
  playlistData,
  handlePlaylistChangeName,
  handlePlaylistCoverChange,
  handleFileUpload,
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
          {playlistsToEditOptions}
        </select>
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
              onChange={handleFileUpload}
            />
          </div>
        </>
      )}
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
    </>
  );
};

export default EditPlaylists;
