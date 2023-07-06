const clientId = process.env.CLIENT_ID;

const exchangeAuthorizationCode = async (req, res) => {
    const redirectUri = req.params.redirectUri;
    const clientId = req.params.clientId;
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
            throw new Error(
                "Failed to exchange authorization code for access token"
            );
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
    exchangeAuthorizationCode: exchangeAuthorizationCode,
    getProfile: getProfile,

}