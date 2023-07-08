const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.post("/loginSpotify", spotifyController.loginSpotify)
router.post("/exchangeAuthorizationCode", spotifyController.exchangeAuthorizationCode)
router.get("/getProfile", spotifyController.getProfile);
router.get('/getProfilePlaylist', spotifyController.getProfilePlaylist)
router.get('/getSongAudioAnalysis/:trackId', spotifyController.getSongAudioAnalysis)
router.get('/getSpotifyPlaylistTracks/:tracksUrl', spotifyController.getSpotifyPlaylistTracks)
router.delete('/deletePlaylistTrack/:playlistId/:trackUri', spotifyController.deletePlaylistTrack)
router.put('/updatePlaylistName/:playlistId/:newName')
router.post('/addPlaylistTrack/:playlistId/:trackUri')
router.post('/refreshToken')

module.exports = router;