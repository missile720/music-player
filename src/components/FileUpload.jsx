import { useState } from 'react'
import './FileUpload.css'

const FileUpload = () => {
    const [playlistData, setPlaylistData] = useState({
        coverImage: '',
        name: '',
        songs: []
    });
    const [files, setFiles] = useState(['Song1', 'song2'])

    function handlePLaylistCoverChange(event) {
        setPlaylistData({
            ...playlistData,
            handlePLaylistCoverChange: event.target.value
        })
    }

    function handlePlaylistChangeName(event) {
        setPlaylistData({
            ...playlistData,
            name: event.target.value
        })
    }

    function handleFileUpload() {
        setPlaylistData({
            ...playlistData,
            songs: files
        })
    }

    function handleSubmit() {
        console.log(playlistData)
    }

    return (
        <div className="modal fade" id="file-upload" data-backdrop="static" aria-labelledby="file-upload-modal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Upload Local Music</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <span id="inputGroup-sizing-default">Playlist Cover Image</span>
                            <input type="file" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={handlePLaylistCoverChange} accept='image/*' />
                        </div>
                        <div className=" mb-3">
                            <span id="inputGroup-sizing-default">Playlist Name</span>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={playlistData.name} onChange={handlePlaylistChangeName} />
                        </div>
                        <div className="mb-3">
                            <span id="inputGroup-sizing-default">Songs</span>
                            <input className="form-control" type="file" id="formFileMultiple" accept="audio/*" multiple onChange={handleFileUpload} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileUpload