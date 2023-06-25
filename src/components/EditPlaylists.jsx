const EditPlaylists = ({ playlistData, handlePlaylistChangeName, handlePlaylistCoverChange, handleFileUpload, library }) => {

    return (
        <>
            <div className="btn-group">
                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Small button
                </button>
                <ul className="dropdown-menu">
                    One
                </ul>
            </div>
            <div className="mb-3">
                <span id="inputGroup-sizing-default">Edit Playlist Cover Image</span>
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
                <span id="inputGroup-sizing-default">Edit Playlist Name</span>
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
                <span id="inputGroup-sizing-default">Add Songs</span>
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
        </>
    )
}

export default EditPlaylists
