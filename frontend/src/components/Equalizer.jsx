import { useContext } from "react";
import { SettingsStateContext } from "../contexts/SettingsStateContext";

const EqualizerComponent = () => {

    const { bass, updateBass, treble, updateTreble } = useContext(SettingsStateContext)

    const handleBassChange = (event) => {
        const newBass = parseInt(event.target.value)
        updateBass(newBass)
    }

    const handleTrebleChange = (event) => {
        const newTreble = parseInt(event.target.value)
        updateTreble(newTreble)
        
    }

    return (
        <div className="equalizer-component">
            <input
                type="range"
                min={0}
                max={100}
                value={bass}
                onChange={handleBassChange}
                className="bass"
            />
            <div className="description">
                <input 
                    type="number"
                    className="value" 
                    value={bass}
                    onChange={handleBassChange}
                /> 
                <p className="value value-text">Bass</p>
            </div>
            <input
                type="range"
                min={0}
                max={100}
                value={treble}
                onChange={handleTrebleChange}
                className="treble"
            />
            <div className="description">
                <input 
                    type="number"
                    className="value" 
                    value={treble}
                    onChange={handleTrebleChange}
                /> 
                <p className="value value-text">Treble</p>
            </div>
        </div>
    )
}

export default EqualizerComponent