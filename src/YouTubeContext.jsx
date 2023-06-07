import { createContext } from "react"

const YouTubeContext = createContext()

function YouTubeContextProvider({ children }) {
    return (
        <YouTubeContext.Provider>
            {children}
        </YouTubeContext.Provider>
    )
}

export { YouTubeContextProvider, YouTubeContext }

