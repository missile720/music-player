
const LocalMusicPlayer = ({ song }) => {
    return (
        <>
            <audio className="local-music-player" src={song} controls />
        </>
    )
}

export default LocalMusicPlayer