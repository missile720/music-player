import testSong1Url from "../assets/02 - Guillotine.mp3"
import testSong2Url from "../assets/03 - Spread Eagle Cross the Block.mp3"
import testSong3Url from "../assets/05 - Takyon (Death Yon).mp3"
import testSong4Url from "../assets/05 - Risen King (feat. Cp).mp3"

// A sample set of test playlist data based on the schema 
// of local playlists defined by CreatePlaylist with each track
// in the tracks object having an extra attribute of "url" to specify
// where the track is from
export default [
    {
        id: "u49xO",
        name: "playlist 1",
        source: "local",
        tracks: [
            {
                artist: "Death Grips",
                id: "777",
                name: "Guillotine",
                url: testSong1Url
            },
            {
                artist: "Death Grips",
                id: "666",
                name: "Spread Eagle Cross the Block",
                url: testSong2Url
            },
            {
                artist: "Death Grips",
                id: "555",
                name: "Takyon (Death Yon)",
                url: testSong3Url
            }
        ]
    },
    {
        id: "39xoqq0",
        name: "playlist 2",
        source: "local",
        tracks: [
            {
                id: "999",
                name: "Risen King",
                url: testSong4Url
            }
        ]
    }
]