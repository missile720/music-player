import Card from "./Card"

function SongCard({ song }) {
    const songData = <span
        className="d-flex flex-column"
    >
        <h4>{song.title}</h4>
        <h5>{song.artist}</h5>
    </span>

    return <Card
        coverArt={{ url: song.coverArt, title: song.album }}
        metaData={songData}
    />
}

export default SongCard