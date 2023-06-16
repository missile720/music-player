import { useState } from "react";

const VolumeComponent = () => {
    const [volume, setVolume] = useState(50)


    const handleVolumeChange = (event) => {
        const newVolume = parseInt(event.target.value)
        setVolume(newVolume)
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