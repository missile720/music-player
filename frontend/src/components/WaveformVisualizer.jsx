import { useContext, useEffect, useRef } from "react";
import { Context } from "../contexts/Context";
import { ThemeContext } from "../contexts/ThemeContext.jsx";

function WaveformVisualizer() {
  const { currentPlayingSongData, currentPlayingSongCallback } = useContext(Context);
  const { theme, mode } = useContext(ThemeContext);
  const progressMs = currentPlayingSongCallback.progressMs;
  const isPlaying = currentPlayingSongCallback.isPlaying;
  const duration = currentPlayingSongCallback.track.durationMs;
  const timeSegments = currentPlayingSongData.segments.map((segment) => ({
    start: segment.start,
    duration: segment.duration,
    loudness: segment.loudness_max,
  }));

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the waveform visualization properties
    let color = "";

    if(theme === 'royal' && mode === 'light'){
      color = '#5CADF8';
    }
    else if(theme === 'royal' && mode === 'dark'){
      color = '#181964';
    }
    else if(theme === 'bvt' && mode === 'light'){
      color = '#FF5531';
    }
    else{
      color = '#8D918D';
    }

    const waveformColor = color;
    const waveformLineWidth = 2;
    const waveformHeight = canvas.height;

    // Calculate the scale factor for x-coordinates
    const scaleFactor = canvas.width / duration * 1000;

    // Draw the waveform
    ctx.beginPath();
    ctx.moveTo(0, waveformHeight / 2);

    timeSegments.forEach((segment) => {
      const { start, loudness } = segment;

      const x = start * scaleFactor;
      const y = waveformHeight / 2 - loudness;

      ctx.lineTo(x, y);
    });

    ctx.lineWidth = waveformLineWidth;
    ctx.strokeStyle = waveformColor;
    ctx.stroke();
  }, [duration, timeSegments]);

  return <canvas className="col-12 cur-vis-canvas" ref={canvasRef} />;
}

export default WaveformVisualizer;
