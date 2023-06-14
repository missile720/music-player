import { useState } from "react";

const EqualizerComponent = () => {

    const [bass, setBass] = useState(50)
    const [treble, setTreble] = useState(50)


    const handleBassChange = (event) => {
        const newBass = parseInt(event.target.value)
        setBass(newBass)
    }

    const handleTrebleChange = (event) => {
        const newTreble = parseInt(event.target.value)
        setTreble(newTreble)
        
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