require('dotenv').config();
const crypto = require('crypto');
const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;

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
        res.cookie("code_verifier", generateRandomString(128), { httpOnly: true });

        const codeChallenge = await generateCodeChallenge(req.cookies.code_verifier);

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
        console.log(error);
    }
}

async function exchangeAuthorizationCode(req, res) {
    const code = req.body.code
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: req.cookies.code_verifier,
            }),
        });

        if (!response.ok) {
            throw new Error({ message: "Failed to exchange authorization code for access token" });
        }

        const data = await response.json();
        const { accessToken, refreshToken, expiresIn } = data;

        res.cookie("access_token", accessToken, { httpOnly: true });
        res.cookie("refresh_token", refreshToken, { httpOnly: true });
        res.cookie("expires_in", expiresIn, { httpOnly: true });
        res.send({ message: 'Login successful.' });

    } catch (error) {
        console.error(
            "Error exchanging authorization code for access token:",
            error
        );
    }
}

async function getProfile(req, res) {
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token,
            },
        });
        const data = await response.json();
        res.send(data);

    } catch (error) {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
                refresh_token: refreshToken,
                client_id: clientId,
            }),
        });
    } catch (error) {

    }
}

async function searchList(req, res) {
    const search = req.params.search
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track`, {
            headers: {
                Authorization: 'Bearer ' + req.cookies.access_token,
            }
        })
        const data = await response.json();
        res.send(data)
    } catch (error) {

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