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
                console.log(`success, access token: ${youTubeAccessToken}`)
            }
        }

    }, [])

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

    return (
        <YouTubeContext.Provider value={{ youTubeAccessToken, loginYouTube }}>
            {children}
        </YouTubeContext.Provider>
    )
}

export { YouTubeContextProvider, YouTubeContext }

