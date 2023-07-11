require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;
const jwtSecret = process.env.JWT_SECRET;
let codeVerifier = '';

function generateToken(jwtData) {
    const payload = {
        accessToken: jwtData.access_token,
        refreshToken: jwtData.refresh_token,
        expiresIn: jwtData.expires_in,
        codeVerifier: codeVerifier
    };

    return jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
}


function generateRandomString(length) {
    let text = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = crypto.createHash('sha256');
    const digest = hash.update(data).digest();

    return base64encode(digest);
}

function base64encode(string) {
    return string.toString('base64')
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function loginSpotify(req, res) {
    try {
        codeVerifier = generateCodeChallenge(128);

        const codeChallenge = await generateCodeChallenge(codeVerifier);
        const state = generateRandomString(16);
        const scope = `user-read-private user-read-email 
            playlist-read-private playlist-modify-public 
            playlist-modify-private streaming 
            user-read-playback-state
            user-modify-playback-state`;
        const args = new URLSearchParams({
            response_type: "code",
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
            code_challenge_method: "S256",
            code_challenge: codeChallenge,
        });
        const authorizationUri = "https://accounts.spotify.com/authorize?" + args;
        res.send({ authorizationUri: authorizationUri });

    } catch (error) {
        console.error("Error logging into Spotify:", error);
        res.status(500).send({ error: "Failed to login to Spotify" });
    }
}

async function exchangeAuthorizationCode(req, res) {
    const code = req.body.code
    res.cookie('teste', 'testset', { httpOnly: true });
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: true,
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: codeVerifier,
            }),
        });
        const data = await response.json();
        const token = generateToken(data);
        console.log(data)
        res.cookie('spotify_tokens', token, { httpOnly: true });

    } catch (error) {
        console.error("Error occurred when acquiring authorization:", error);
        res.status(500).send({ error: "Failed to acquire authorization" });
    }
}

async function getProfile(req, res) {
    console.log(req.cookies)
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + req.cookies.spotify_tokens.accessToken,
            },
        });

        const data = await response.json();
        res.send(data);

    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).send({ error: "Failed to fetch profile" });
    }
}

async function getProfilePlaylist(req, res) {
    try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token,
            },
        });

        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error("Error fetching playlists:", error);
        res.status(500).send({ error: "Failed to fetch playlists" });
    }
}

async function getSongAudioAnalysis(req, res) {
    const trackId = req.params.trackId;
    try {
        const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token,
            },
        });

        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error("Error fetching song audio analysis:", error);
        res.status(500).send({ error: "Failed to fetch song audio analysis" });
    }
}

async function getSpotifyPlaylistTracks(req, res) {
    const tracksUrl = req.params.tracksUrl;
    try {
        const response = await fetch(`${tracksUrl}`, {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token,
            },
        });

        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error("Error fetching playlist tracks:", error);
        res.status(500).send({ error: "Failed to fetch playlist tracks" });
    }
}

async function deletePlaylistTrack(req, res) {
    const trackUri = req.body.tracksUrl;
    const playlistId = req.params.playlistId;
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tracks: [{ uri: trackUri }],
            }),
        });

        if (response.ok) {
            if (req.cookies.access_token) {
                res.send(getProfilePlaylist(req.cookies.access_token))
            }
        }

        res.send(data);
    } catch (error) {
        console.error("Error deleting playlist track:", error);
        res.status(500).send({ error: "Failed to delete playlist track" });
    }
}

function checkForAccessToken(req, res) {
    try {
        if (req.cookies.access_token) {
            res.send({ isAccessTokenValid: true })
        } else {
            res.send({ isAccessTokenValid: false })
        }
    } catch (error) {
        console.error("Error checking access token:", error);
        res.status(500).send({ error: "Failed to check for access token" });
    }
}

async function refreshToken(req, res) {
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: req.cookies.refresh_token,
                client_id: clientId,
            }),
        });

        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error("Error refreshing access token:", error);
        res.status(500).send({ error: "Failed to refresh access token" });
    }
}

async function searchList(req, res) {
    const search = req.params.search
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track`, {
            headers: {
                Authorization: 'Bearer ' + req.cookies.access_token,
            }
        });

        const data = await response.json();
        res.send(data)
    } catch (error) {
        console.error("Error searching for song:", error);
        res.status(500).send({ error: "Failed to search for song" });
    }
}

module.exports = {
    loginSpotify,
    exchangeAuthorizationCode,
    getProfile,
    getProfilePlaylist,
    getSongAudioAnalysis,
    getSpotifyPlaylistTracks,
    deletePlaylistTrack,
    checkForAccessToken,
    refreshToken,
    searchList,
}