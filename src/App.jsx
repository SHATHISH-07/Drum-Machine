import { useState, useEffect } from "react";

import KeyBoard from "./components/KeyBoard";

const firstSoundsGroup = [
  {
    keyCode: 81,
    key: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const secondSoundsGroup = [
  {
    keyCode: 81,
    key: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    key: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    key: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    key: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    key: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    key: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    key: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    key: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    key: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  const [soundGroup, setSoundGroup] = useState(firstSoundsGroup);
  const [powerOn, setPowerOn] = useState(true);
  const [audioId, setAudioId] = useState(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (powerOn) {
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.removeEventListener("keydown", handleKeyPress);
    }
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [powerOn, soundGroup]);

  const handleKeyPress = (event) => {
    if (powerOn) {
      const sound = soundGroup.find((sound) => sound.keyCode === event.keyCode);
      if (sound) {
        play(sound.key);
        setAudioId(sound.id);
      }
    }
  };

  const play = (key) => {
    if (powerOn) {
      const audio = document.getElementById(key);
      if (audio) {
        audio.currentTime = 0;
        audio.volume = volume; // Set volume from state
        audio.play();
        setAudioId(soundGroup.find((sound) => sound.key === key).id); // Update display
      }
    }
  };

  const handleShowTrack = (event) => {
    const audio = document.getElementById(event.target.id);
    if (audio) {
      setAudioId(audio.id);
    }
  };

  return (
    <>
      <KeyBoard
        firstSoundsGroup={firstSoundsGroup}
        secondSoundsGroup={secondSoundsGroup}
        play={play}
        setSoundGroup={setSoundGroup}
        soundGroup={soundGroup}
        powerOn={powerOn}
        setPowerOn={setPowerOn}
        handleShowTrack={handleShowTrack}
        setAudioId={setAudioId}
        volume={volume}
        setVolume={setVolume}
        audioId={audioId}
      />
    </>
  );
}

export default App;
