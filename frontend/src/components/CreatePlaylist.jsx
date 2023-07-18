const CreatePlaylist = ({ playlistData, handlePlaylistChangeName, handlePlaylistCoverChange, handleSongMetaData }) => {
    return (
        <>
            <div className="mb-3">
                <span id="inputGroup-sizing-default">Playlist Cover Image</span>
                <input
                    type="file"
                    className="form-control"
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
                    id="formFileMultiple"
                    accept="audio/*"
                    multiple
                    onChange={handleSongMetaData}
                />
            </div>
        </>
    )
}

export default CreatePlaylist