import { useState } from 'react'
import songImage from '../assets/song.svg'
import './FileUpload.css'

const FileUpload = () => {
    const [playlistData, setPlaylistData] = useState({
        coverImage: '',
        playlistName: '',
        songs: []
    });

    function handlePLaylistCoverChange(event) {
        const file = event.target.files[0];
        const blob = new Blob([file], { type: 'image/*' })
        const imageUrl = URL.createObjectURL(blob);

        setPlaylistData({
            ...playlistData,
            coverImage: imageUrl
        })
    }

    function handlePlaylistChangeName(event) {
        setPlaylistData({
            ...playlistData,
            playlistName: event.target.value
        })
    }

    function handleFileUpload(event) {
        const jsMediaTags = window.jsmediatags;
        const files = [...event.target.files];

        const songFiles = files.map(song => {
            const blob = new Blob([song], { type: 'audio/*' })
            const songUrl = URL.createObjectURL(blob);

            // Some of files uploaded may not have all the metadata provided when 
            // retrieved by jsmediatags, so they are given the following default values
            const songData = {
                name: song.name,
                artist: 'unknown',
                songImage: songImage,
                duration: 'unknown',
                audioSource: songUrl
            }

            jsMediaTags.read(song, {
                onSuccess: function (tag) {
                    console.log(tag)
                    songData.name = tag.tags.title;
                    songData.artist = tag.tags.artist;
                    songData.duration = (tag.tags.TLEN.data / 60000);
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

    function handleSubmit(event) {
        event.preventDefault();
        if (playlistData.coverImage && playlistData.playlistName && playlistData.songs.length) {
            console.log(playlistData)
        }
    }

    return (
        <form className="modal fade" id="file-upload" data-backdrop="static" aria-labelledby="file-upload-modal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Upload Local Music</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <span id="inputGroup-sizing-default">Playlist Cover Image</span>
                            <input type="file" className="form-control" required aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" onChange={handlePLaylistCoverChange} accept='image/*' />
                        </div>
                        <div className=" mb-3">
                            <span id="inputGroup-sizing-default">Playlist Name</span>
                            <input type="text" className="form-control" required aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={playlistData.name} onChange={handlePlaylistChangeName} />
                        </div>
                        <div className="mb-3">
                            <span id="inputGroup-sizing-default">Songs</span>
                            <input className="form-control" type="file" required id="formFileMultiple" accept="audio/*" multiple onChange={handleFileUpload} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" form='file-upload' className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FileUpload