/* eslint react/prop-types: 0 */
import { useState, createContext, useContext, useEffect } from "react"

import { MusicPlayerStateContext } from "./MusicPlayerStateContext"

const SettingsStateContext = createContext()

// Constants
const VOLUME_MIN = 0
const VOLUME_MAX = 100
const GAIN_MAX = 40
const GAIN_MIN = -40
const BASS_FREQ = 400
const TREBLE_FREQ = 1000

// Audio Context Variables for EQ Adjustment
const audioContext = new AudioContext()
const bassFilter = audioContext.createBiquadFilter()
const trebleFilter = audioContext.createBiquadFilter()
bassFilter.type = "lowshelf"
trebleFilter.type = "highshelf"
bassFilter.frequency.value = BASS_FREQ
trebleFilter.frequency.value = TREBLE_FREQ

bassFilter.connect(audioContext.destination)
trebleFilter.connect(bassFilter)

const SettingsStateContextProvider = ({ children }) => {
    // Context Values
    const { currentSongSource } = useContext(MusicPlayerStateContext)

    // States
    const [volume, setVolume] = useState(50)
    const [bass, setBass] = useState(0)
    const [treble, setTreble] = useState(0)
    const [audioSource, setAudioSource] = useState({})

    useEffect(() => {
        if (currentSongSource === "local") {
            const audio = document.querySelector("audio")
            if (audio !== audioSource) {
                setAudioSource(audio)
            }
        }
    }, [currentSongSource])

    useEffect(() => {
        if (Object.keys(audioSource).length) {
            const source = audioContext.createMediaElementSource(audioSource)

            source.connect(trebleFilter)
        }
    }, [audioSource])



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
            GAIN_MAX,
            GAIN_MIN
        }}>
            {children}
        </SettingsStateContext.Provider>
    )
}


export { SettingsStateContext, SettingsStateContextProvider }