import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaSearchPlus,
  FaSearchMinus,
} from "react-icons/fa";

const Waveform = ({ audio }) => {
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerWidth = 800; // Adjust this value to set the fixed width for the container

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "blue",
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 1,
      height: 50,
      width: containerWidth,
    });
    waveSurfer.load(audio);

    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
      const duration = waveSurferRef.current.getDuration();
      const zoomFactor = containerWidth / duration;
      setZoomLevel(zoomFactor);
      waveSurferRef.current.zoom(zoomFactor);
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio, containerWidth]);

  const handlePlay = () => {
    waveSurferRef?.current.playPause();
    setIsPlaying(waveSurferRef?.current.isPlaying());
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom * 2);
    waveSurferRef.current.zoom(zoomLevel * 2);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => prevZoom / 2);
    waveSurferRef.current.zoom(zoomLevel / 2);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handlePlay}
        type="button"
        style={{ marginRight: "10px" }}
      >
        {isPlaying ? <FaPauseCircle size="3em" /> : <FaPlayCircle size="3em" />}
      </button>
      <button
        onClick={handleZoomIn}
        type="button"
        style={{ marginRight: "10px" }}
      >
        <FaSearchPlus size="1.5em" />
      </button>
      <button
        onClick={handleZoomOut}
        type="button"
        style={{ marginRight: "10px" }}
      >
        <FaSearchMinus size="1.5em" />
      </button>
      <div style={{ width: containerWidth, paddingRight: "20px" }}>
        <div id="waveform" ref={containerRef} />
      </div>
    </div>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default Waveform;
