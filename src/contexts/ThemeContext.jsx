/* eslint react/prop-types: 0 */
import { useState, createContext } from "react"

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    const toggleDarkMode = () => {
        setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider }