/* eslint react/prop-types: 0 */
import { useState, useEffect, createContext } from "react"

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    const toggleDarkMode = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
    }

    useEffect(() => {
        const lastTheme = localStorage.getItem("theme")
        if (lastTheme !== null) {
            setTheme(lastTheme)
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider }