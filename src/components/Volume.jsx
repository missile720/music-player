import { useContext } from "react";
import { SettingsStateContext } from "../contexts/SettingsStateContext";

const VolumeComponent = () => {
    

    const {volume, updateVolume} = useContext(SettingsStateContext)

    const handleVolumeChange = (event) => {
        const newVolume = parseInt(event.target.value)
        updateVolume(newVolume)
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