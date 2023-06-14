import { useState } from "react";

const VolumeComponent = () => {
    const getFromLocalStorage = (key) => {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : 50
    }
    const [volume, setVolume] = useState(getFromLocalStorage('volume'))

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    const handleVolumeChange = (event) => {
        const newVolume = parseInt(event.target.value)
        setVolume(newVolume)
        saveToLocalStorage('volume', volume)
        console.log(volume)
    }

    return (
        <div className="volume-component">
            <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolumeChange}
                className="volume"
            />
            <div className="description">
                <input 
                    type="number"
                    className="value" 
                    value={volume}
                    onChange={handleVolumeChange}
                /> 
                <p className="value value-text">Volume</p>
            </div>
        </div>
    )
}

export default VolumeComponent