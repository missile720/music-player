import { useContext, useState } from 'react';
import { Context } from "../contexts/Context";

function WaveformVisualizer() {
    const {currentPlayingSongData} = useContext(Context);
    

    return (
        <div>WaveformVisualizer</div>
    )
}

export default WaveformVisualizer