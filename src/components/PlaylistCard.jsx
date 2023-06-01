function PlaylistCard({ playlist }) {
    const randomTrackIndex = (playlist) => {
        return Math.floor(Math.random() * playlist.tracks.length)
    }

    const randomTrack = playlist.tracks[randomTrackIndex(playlist)]

    return (
        <div className="playlist-card bg-primary p-2 d-flex">
            <img
                src={randomTrack.coverArt}
                alt={`${randomTrack.title} Cover Art`}
            />
            <h4>{playlist.name}</h4>
        </div>
    )
}

export default PlaylistCard