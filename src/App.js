import React from 'react'
import Waveform from './Waveform.tsx'
import islandyClip from './media/islandy-loop.mp3'

const App = () => (
  <div style={{  margin: "20px"}}>
    <h1>WaveSurfer</h1>
    <Waveform audio={islandyClip} />
  </div>
)

export default App
