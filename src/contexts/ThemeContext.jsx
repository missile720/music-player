/* eslint react/prop-types: 0 */
import { useState, useEffect, createContext } from "react"

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('royal')
    const [mode, setMode] = useState('light')

    useEffect(() => {
        const lastMode = localStorage.getItem("mode")
        if (lastMode !== null) {
            setMode(lastMode)
        }
    }, [])

    const toggleDarkMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light'
        localStorage.setItem("mode", newMode)
        setMode(newMode)
    }

    const toggleTheme = (chosenTheme) => {
        setTheme(chosenTheme)
    }

    const values = {
        theme,
        toggleTheme,
        mode,
        toggleDarkMode
    }
    

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider }