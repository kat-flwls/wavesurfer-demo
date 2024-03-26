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

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "rgb(200, 0, 200)",
      progressColor: "blue",
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 1,
      height: 50,
      responsive: true,
    });
    waveSurfer.load(audio);

    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
      updateZoom();
    });

    const handleResize = () => {
      updateZoom();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      waveSurfer.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [audio]);

  const updateZoom = () => {
    if (!waveSurferRef.current) return;
    const duration = waveSurferRef.current.getDuration();
    const containerWidth = containerRef.current.offsetWidth;
    const zoomFactor = containerWidth / duration;
    setZoomLevel(zoomFactor);
    waveSurferRef.current.zoom(zoomFactor);
  };

  const handlePlay = () => {
    waveSurferRef?.current.playPause();
    setIsPlaying(waveSurferRef?.current.isPlaying());
  };

  const handleZoomIn = () => {
    const newZoomLevel = zoomLevel * 2;
    setZoomLevel(newZoomLevel);
    waveSurferRef.current.zoom(newZoomLevel);
  };

  const handleZoomOut = () => {
    const newZoomLevel = zoomLevel / 2;
    setZoomLevel(newZoomLevel);
    waveSurferRef.current.zoom(newZoomLevel);
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
      <div style={{ width: "100%", paddingRight: "20px" }}>
        <div id="waveform" ref={containerRef} style={{ width: "100%" }} />
      </div>
    </div>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default Waveform;
