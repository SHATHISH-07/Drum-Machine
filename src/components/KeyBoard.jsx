import React from "react";
import "./KeyBoard.css";

const KeyBoard = ({
  firstSoundsGroup,
  secondSoundsGroup,
  play,
  setSoundGroup,
  soundGroup,
  powerOn,
  setPowerOn,
  handleShowTrack,
  setAudioId,
  volume,
  setVolume,
  audioId,
}) => {
  return (
    <div id="drum-machine" className="App">
      <h1>Drum Machine</h1>
      <button onClick={() => setPowerOn((prev) => !prev)}>
        {powerOn ? "OFF" : "ON"}
      </button>
      <div>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const newVolume = Number(e.target.value);
            setVolume(newVolume);
            setAudioId(`Volume: ${Math.round(newVolume * 100)}%`);
          }}
        />
      </div>

      <div id="display">
        <p>{audioId}</p>
      </div>

      <div className="controls">
        {soundGroup.map((sound) => (
          <button
            key={sound.id}
            id={sound.id} // Use sound.id as the button's id
            className="drum-pad" // Class name as required
            onClick={() => {
              play(sound.key);
              handleShowTrack({ target: { id: sound.id } }); // Correctly pass event to handleShowTrack
            }}
            tabIndex={0}
          >
            <audio className="clip" id={sound.key} src={sound.url} />
            {sound.key} {/* Display the key on the button */}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          const newSoundGroup =
            soundGroup === firstSoundsGroup
              ? secondSoundsGroup
              : firstSoundsGroup;
          setSoundGroup(newSoundGroup);
          setAudioId(
            newSoundGroup === firstSoundsGroup
              ? "Heater Kit"
              : "Smooth Piano Kit"
          );
        }}
      >
        Switch Sound
      </button>
    </div>
  );
};

export default KeyBoard;
