/* eslint react/prop-types: 0 */
import { useState, createContext, useContext, useEffect } from "react"

import { MusicPlayerStateContext } from "./MusicPlayerStateContext"

const SettingsStateContext = createContext()

const audioContext = new AudioContext()

const SettingsStateContextProvider = ({ children }) => {
    // Constants
    const VOLUME_MIN = 0
    const VOLUME_MAX = 100
    const FREQ_MAX = 4000
    const FREQ_MIN = 20
    const GAIN_VAL = 0

    // Context Values
    const { currentSongSource } = useContext(MusicPlayerStateContext)

    // States
    const [volume, setVolume] = useState(50)
    const [bass, setBass] = useState(20)
    const [treble, setTreble] = useState(20)
    const [audioSource, setAudioSource] = useState({})

    if (Object.keys(audioSource).length) {
        const source = audioContext.createMediaElementSource(audioSource)
        const bassFilter = audioContext.createBiquadFilter()
        bassFilter.type = "lowshelf"
        bassFilter.frequency.value = bass
        bassFilter.gain.value = GAIN_VAL

        source.connect(bassFilter)
        bassFilter.connect(audioContext.destination)
    }

    useEffect(() => {
        if (currentSongSource === "local") {
            const audio = document.querySelector("audio")
            setAudioSource(audio)
        }
    }, [currentSongSource])



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
            VOLUME_MAX,
            FREQ_MAX,
            FREQ_MIN
        }}>
            {children}
        </SettingsStateContext.Provider>
    )
}


export { SettingsStateContext, SettingsStateContextProvider }