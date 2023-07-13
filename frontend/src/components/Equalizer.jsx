import { useContext } from "react";
import { SettingsStateContext } from "../contexts/SettingsStateContext";

const EqualizerComponent = () => {

    const { bass, updateBass, treble, updateTreble, GAIN_MIN, GAIN_MAX } = useContext(SettingsStateContext)

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
                min={GAIN_MIN}
                max={GAIN_MAX}
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
                    // To prevent the user from typing in invalid values
                    onKeyDown={e => e.preventDefault()}
                    min={GAIN_MIN}
                    max={GAIN_MAX}
                />
                <p className="value value-text">Bass</p>
            </div>
            <input
                type="range"
                min={GAIN_MIN}
                max={GAIN_MAX}
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
                    // To prevent the user from typing in invalid values
                    onKeyDown={e => e.preventDefault()}
                    min={GAIN_MIN}
                    max={GAIN_MAX}
                />
                <p className="value value-text">Treble</p>
            </div>
        </div>
    )
}

export default EqualizerComponent