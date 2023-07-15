import testSong1Url from "./assets/02 - Guillotine.mp3"
import testSong2Url from "./assets/03 - Spread Eagle Cross the Block.mp3"
import testSong3Url from "./assets/05 - Takyon (Death Yon).mp3"
import testSong4Url from "./assets/05 - Risen King (feat. Cp).mp3"

import testSongImageUrl from "./assets/00 - Death_Grips_Exmilitary-front-large.jpg"
import testPlaylistImageUrl from "./assets/with bro tonight.jpg"

// A sample set of test playlist data based on the schema 
// of local playlists defined by CreatePlaylist with each track
// in the tracks object having an extra attribute of "url" to specify
// where the track is from
export default [
    {
        id: "u49xO",
        name: "playlist 1",
        source: "local",
        coverImageSource: testPlaylistImageUrl,
        tracks: [
            {
                artist: "Death Grips",
                id: "000000000000",
                name: "Guillotine",
                songSource: testSong1Url,
                songImage: testSongImageUrl
            },
            {
                artist: "Death Grips",
                id: "111111111111",
                name: "Spread Eagle Cross the Block",
                songSource: testSong2Url,
                songImage: testSongImageUrl
            },
            {
                artist: "Death Grips",
                id: "222222222222",
                name: "Takyon (Death Yon)",
                songSource: testSong3Url,
                songImage: testSongImageUrl
            }
        ]
    },
    {
        id: "39xoqq0",
        name: "playlist 2",
        source: "local",
        tracks: [
            {
                artist: "Nehemiah",
                id: "333333333333",
                name: "Risen King",
                songSource: testSong4Url
            },
            // Test Case For Song on Backend
            {
                artist: "Alps",
                id: "444444444444",
                name: "Motorama",
                songSource: "https://bvt-music-player.s3.us-west-1.amazonaws.com/Motorama+-+Alps.mp3"
            }
        ]
    }
]