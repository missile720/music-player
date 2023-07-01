import { useContext, useEffect, useRef } from "react";
import { Context } from "../contexts/Context";

function WaveformVisualizer() {
  const { currentPlayingSongData } = useContext(Context);
  const duration = currentPlayingSongData.track.duration;
  const timeSegments = currentPlayingSongData.segments.map((segment) => ({
    start: segment.start,
    duration: segment.duration,
    loudness: segment.loudness_max,
  }));

  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("test")
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the waveform visualization properties
    const waveformColor = "blue";
    const waveformLineWidth = 2;
    const waveformHeight = canvas.height;

    // Calculate the scale factor for x-coordinates
    const scaleFactor = canvas.width / duration;

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

  return <canvas className="col-12" height="80%" ref={canvasRef} />;
}

export default WaveformVisualizer;
