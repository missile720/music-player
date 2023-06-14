import { useState } from 'react'
import './FileUpload.css'

const FileUpload = () => {
    const [playlistData, setPlaylistData] = useState({
        coverImage: '',
        name: '',
        songs: []
    });

    function handlePLaylistCoverChange(event) {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onload = (event) => {
            const image = event.target.result;
            setPlaylistData({
                ...playlistData,
                coverImage: image
            })
        };

        reader.readAsDataURL(file);
    }

    function handlePlaylistChangeName(event) {
        setPlaylistData({
            ...playlistData,
            name: event.target.value
        })
    }

    function handleFileUpload(event) {
        const jsMediaTags = window.jsmediatags;
        const files = [...event.target.files]
        console.log(files[0])
        const songFiles = files.map(song => {
            const songData = {
                name: song.name,
                artist: 'unknown',
                songImage: 'test',
                duration: '2',
            }

            jsMediaTags.read(song, {
                onSuccess: function (tag) {
                    console.log(tag.title)
                },
                onError: function (error) {
                    console.log(error)
                }
            })

            return songData
        })
        setPlaylistData({
            ...playlistData,
            songs: songFiles
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
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FileUpload