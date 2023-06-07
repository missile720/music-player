import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const Context = React.createContext()

function ContextProvider({ children }) {
    const [accessToken, setAccessToken] = useState('');
    const [userProfileSpotify, setUserProfileSpotify] = useState({});
    const clientId = '146d22c1a56f4060939214df2f8b8ab4';
    const redirectUri = 'http://localhost:5173/callback';

    async function loginSpotify() {
        let codeVerifier = generateRandomString(128);

        generateCodeChallenge(codeVerifier).then(codeChallenge => {
            let state = generateRandomString(16);
            let scope = 'user-read-private user-read-email';

            localStorage.setItem('code_verifier', codeVerifier);

            let args = new URLSearchParams({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });

            window.location = 'https://accounts.spotify.com/authorize?' + args;
        });
    }

    async function generateCodeChallenge(codeVerifier) {
        function base64encode(string) {
            return window.btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);

        return base64encode(digest);
    }

    function generateRandomString(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    useEffect(() => {
        // Check if the current URL contains the authorization code and state
        const params = new URLSearchParams(window.location.search);
        const authorizationCode = params.get('code');
        const state = params.get('state');

        if (authorizationCode && state) {
            // Verify the state if needed

            // Exchange the authorization code for an access token
            exchangeAuthorizationCode(authorizationCode);
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            getProfile(accessToken);
        }
    }, [accessToken])

    const exchangeAuthorizationCode = async (code) => {
        const codeVerifier = localStorage.getItem('code_verifier');

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: redirectUri,
                    client_id: clientId,
                    code_verifier: codeVerifier
                })
            });

            if (!response.ok) {
                throw new Error('Failed to exchange authorization code for access token');
            }

            const data = await response.json();

            setAccessToken(data.access_token);
            // Store the access token in your application state or any other suitable location
            // Optionally, you can also store the refresh token, expiration time, and other relevant information

        } catch (error) {
            console.error('Error exchanging authorization code for access token:', error);
            // Handle the error in an appropriate way
        }
    };

    async function getProfile(accessToken) {
        console.log(accessToken)
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        const data = await response.json();
        console.log(data)
        setUserProfileSpotify(data);
    }


    return (
        <Context.Provider value={{ accessToken, userProfileSpotify, loginSpotify }}>
            {children}
        </Context.Provider>
    )
}

ContextProvider.propTypes = {
    children: PropTypes
}

export { ContextProvider, Context }