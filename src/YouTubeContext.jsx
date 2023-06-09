import { useState, useEffect, createContext } from "react"
import config from "./apiConfig.js"

const YouTubeContext = createContext()

function YouTubeContextProvider({ children }) {
    // State Variables
    const [youTubeAccessToken, setYouTubeAccessToken] = useState("")
    const fragmentString = location.hash.substring(1)

    // API Config Consts
    const { youTubeConfig } = config
    const { clientId, apiKey } = youTubeConfig

    // Constants
    const redirectUri = "http://localhost:5173/callback"
    const scope = "https://www.googleapis.com/auth/youtube.readonly"
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"
    const youTubeApiPlaylistsUrl = "https://www.googleapis.com/youtube/v3/playlists?"
    const youTubeApiPlaylistItemsUrl = "https://www.googleapis.com/youtube/v3/playlistItems?"

    // Side effect for checking if an access token has been granted.
    // If it has, logs the user's playlists.
    useEffect(() => {
        const params = {}
        const regex = /([^&=]+)=([^&]*)/g
        let m

        while (m = regex.exec(fragmentString)) {
            params[decodeURIComponent(m[1])] = decodeURI(m[2])
        }

        if (Object.keys(params).length > 0) {
            localStorage.setItem("oauth2-test-params", JSON.stringify(params))
            if (params["access_token"]) {
                setYouTubeAccessToken(params["access_token"])
                console.log(`success, access token`)
            }
        }

    }, [])

    if (youTubeAccessToken) {
        loadYouTubePlaylists()
    }

    /**
     * Redirects user to OAuth2 page for YouTube, which determines the App's
     * access to the User's YouTube info
     */
    function loginYouTube() {
        // Performs GET request by making a form and requesting through it
        const form = document.createElement("form")
        form.setAttribute("method", "GET")
        form.setAttribute("action", oauth2Endpoint)

        const params = {
            "client_id": clientId,
            "redirect_uri": redirectUri,
            "response_type": "token",
            "scope": scope,
            "include_granted_scopes": "true"
        }

        for (const param in params) {
            const input = document.createElement("input")
            input.setAttribute("type", "hidden")
            input.setAttribute("name", param)
            input.setAttribute("value", params[param])
            form.appendChild(input)
        }

        document.body.appendChild(form)
        form.submit()
    }

    /**
     * Loads the user's playlists. Performs a fetch request then console logs the user's
     * playlists. 
     * 
     */
    async function loadYouTubePlaylists() {
        try {
            const playlistArgs = new URLSearchParams({
                "part": [
                    "snippet",
                    "contentDetails"
                ],
                "mine": "true",
                "access_token": youTubeAccessToken,
                "key": apiKey
            })

            const playlistItemsArgs = new URLSearchParams({
                "part": [
                    "snippet",
                    "contentDetails"
                ],
                "access_token": youTubeAccessToken,
                "key": apiKey
            })

            const playlistRes = await fetch(youTubeApiPlaylistsUrl + playlistArgs)
            const playlistData = await playlistRes.json()

            console.log("--------YouTube Playlists-------")
            for (let i = 0; i < playlistData.items.length; i++) {
                console.log(`${i}: ${playlistData.items[i].snippet.title}`)
                playlistItemsArgs.append("id", playlistData.items[i].contentDetails.id)
                const playlistItemsRes = await fetch(youTubeApiPlaylistItemsUrl + playlistItemsArgs)
                const playlistItemsData = await playlistItemsRes.json()
                console.log(playlistItemsData)

                playlistItemsArgs.delete("id")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <YouTubeContext.Provider value={{ youTubeAccessToken, loginYouTube }}>
            {children}
        </YouTubeContext.Provider>
    )
}

export { YouTubeContextProvider, YouTubeContext }

