/* eslint react/prop-types: 0 */
import { useState, createContext } from "react"

const SettingsStateContext = createContext()

const SettingsStateContextProvider = ({ children }) => {
    // Constants
    const VOLUME_MIN = 0
    const VOLUME_MAX = 100

    // States
    const [volume, setVolume] = useState(50)
    const [bass, setBass] = useState(50)
    const [treble, setTreble] = useState(50)

    const updateVolume = (value) => {
        setVolume(value)
    }

    const updateBass = (value) => {
        setBass(value)
    }

    const updateTreble = (value) => {
        setTreble(value)
    }


    return (
        <SettingsStateContext.Provider value={{
            volume,
            bass,
            treble,
            updateVolume,
            updateBass,
            updateTreble,
            VOLUME_MIN,
            VOLUME_MAX
        }}>
            {children}
        </SettingsStateContext.Provider>
    )
}


export { SettingsStateContext, SettingsStateContextProvider }