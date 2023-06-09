import { useState, useEffect, createContext } from "react"

const YouTubeContext = createContext()

/**
 * A YouTube Context that allows a user to login to their YouTube and console 
 * log their playlists.
 * @param {ReactElement} children The children of the context provider 
 * @returns {ReactElement} A react element with the following provided as context:
 * -youTubeAccessToken {string} A string denoting a user's access token
 * -loginYouTube() {func} An event handler. Used to take the user to an OAuth2 
 * screen for YouTube
 */
function YouTubeContextProvider({ children }) {
    // State Variables
    const [youTubeAccessToken, setYouTubeAccessToken] = useState("")
    const fragmentString = location.hash.substring(1)

    // API Constants from env
    const {
        VITE_REACT_YOUTUBE_CLIENT_ID,
        VITE_REACT_YOUTUBE_API_KEY
    } = import.meta.env

    console.log(VITE_REACT_YOUTUBE_CLIENT_ID)
    console.log(VITE_REACT_YOUTUBE_API_KEY)

    // Constants
    const redirectUri = "http://localhost:5173/callback"
    const scope = "https://www.googleapis.com/auth/youtube.readonly"
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"
    const youTubeApiPlaylistsUrl = "https://www.googleapis.com/youtube/v3/playlists?"
    const youTubeApiPlaylistItemsUrl = "https://www.googleapis.com/youtube/v3/playlistItems?"

    // Effects
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

    // Event Handler
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
            "client_id": VITE_REACT_YOUTUBE_CLIENT_ID,
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

    // Functions
    /**
     * Loads the user's playlists. Performs a fetch request then console logs the user's
     * playlists. 
     */
    async function loadYouTubePlaylists() {
        try {
            // Used for API calls to get playlists
            const playlistArgs = new URLSearchParams({
                "part": [
                    "snippet",
                    "contentDetails"
                ],
                "mine": "true",
                "access_token": youTubeAccessToken,
                "key": VITE_REACT_YOUTUBE_API_KEY
            })

            // Used for API calls to get playlistItems (Effectivly the songs of a playlist)
            const playlistItemsArgs = new URLSearchParams({
                "part": "snippet",
                "access_token": youTubeAccessToken,
                "key": VITE_REACT_YOUTUBE_API_KEY
            })

            const playlistRes = await fetch(youTubeApiPlaylistsUrl + playlistArgs)
            const playlistData = await playlistRes.json()

            // If the API call returns an error, console logs the returned Error
            if (playlistData.error) {
                console.log(playlistData.error.message)
                return
            }

            console.log("--------YouTube Playlists-------")
            for (let i = 0; i < playlistData.items.length; i++) {
                await logPlaylist(playlistData.items[i], i, playlistItemsArgs)
            }

        } catch (error) {
            console.log(error)
        }
    }

    // Helper Functions
    /**
     * Logs a playlist and its contents to the console.
     * @param {Object} item An object representing an entry in the items
     * member of the playlist object from YouTube's Data API
     * @param {Number} i The index of the playlist in the user's playlists
     * @param {URLSearchParams} playlistItemsArgs The search params
     * for the fetch request of a playlist's playlistItems. Is missing
     * the playlistId param as that is appended and deleted in 
     * this call
     */
    async function logPlaylist(item, i, playlistItemsArgs) {
        console.log(`${i}: ${item.snippet.title}`)
        playlistItemsArgs.append("playlistId", item.id)

        const playlistItemsRes = await fetch(youTubeApiPlaylistItemsUrl + playlistItemsArgs)
        const playlistItemsData = await playlistItemsRes.json()

        if (playlistItemsData.error) {
            console.log(playlistItemsData.error.message)
        }

        const { items } = playlistItemsData
        for (let playlistItem of items) {
            logPlaylistItem(playlistItem)
        }

        playlistItemsArgs.delete("playlistId")
    }

    /**
     * Logs the title of a song in a YouTube playlist to the console, 
     * formatted to be displayed under a playlist name.
     * @param {Object} playlistItem A playlistItem object as denoted
     * in YouTube API's playlistItem documentation.
     */
    function logPlaylistItem(playlistItem) {
        console.log(`\t-${playlistItem.snippet.title}`)
    }

    return (
        <YouTubeContext.Provider value={{ youTubeAccessToken, loginYouTube }}>
            {children}
        </YouTubeContext.Provider>
    )
}

export { YouTubeContextProvider, YouTubeContext }

