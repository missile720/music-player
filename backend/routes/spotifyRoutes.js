const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.post("/loginSpotify", spotifyController.loginSpotify)
router.post("/exchangeAuthorizationCode", spotifyController.exchangeAuthorizationCode)
router.get("/getProfile", spotifyController.getProfile);
router.get('/getProfilePlaylist')
router.get('/getSongAudioAnalysis')
router.get('/getSpotifyPlaylistTracks')
router.get('/deletePlaylistTrack')
router.get('/updatePlaylistName')
router.get('/addPlaylistTrack')
router.get('/refreshToken')

module.exports = router;