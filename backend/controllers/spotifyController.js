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

const loginSpotify = async (req, res) => {
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

const exchangeAuthorizationCode = async (req, res) => {
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

const getProfile = async (req, res) => {
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

const getProfilePlaylist = async (req, res) => {
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

const getSongAudioAnalysis = async (req, res) => {
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

const getSpotifyPlaylistTracks = async (req, res) => {
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

const deletePlaylistTrack = async (req, res) => {
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



module.exports = {
    loginSpotify,
    exchangeAuthorizationCode,
    getProfile,
    getProfilePlaylist,
    getSongAudioAnalysis,
    getSpotifyPlaylistTracks,
    deletePlaylistTrack
}