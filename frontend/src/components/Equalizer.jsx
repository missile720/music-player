import { useContext } from "react";
import { SettingsStateContext } from "../contexts/SettingsStateContext";

const EqualizerComponent = () => {

    const { bass, updateBass, treble, updateTreble, FREQ_MIN, FREQ_MAX } = useContext(SettingsStateContext)

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
                min={FREQ_MIN}
                max={FREQ_MAX}
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
                    min={FREQ_MIN}
                    max={FREQ_MAX}
                />
                <p className="value value-text">Bass</p>
            </div>
            <input
                type="range"
                min={FREQ_MIN}
                max={FREQ_MAX}
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
                    min={FREQ_MIN}
                    max={FREQ_MAX}
                />
                <p className="value value-text">Treble</p>
            </div>
        </div>
    )
}

export default EqualizerComponent