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

async function generateCodeChallenge(codeVerifier) {
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
        const codeVerifier = generateRandomString(128);
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
        console.log(authorizationUri)
        res.send({ codeVerifier: codeVerifier, authorizationUri: authorizationUri });

    } catch (error) {
        console.log(error);
    }
}

const exchangeAuthorizationCode = async (req, res) => {
    const codeVerifier = req.params.codeVerifier;
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
                code_verifier: codeVerifier,
            }),
        });

        if (!response.ok) {
            throw new Error({ message: "Failed to exchange authorization code for access token" });
        }

        const data = await response.json();
        res.send(data);

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
                Authorization: "Bearer " + accessToken,
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

}