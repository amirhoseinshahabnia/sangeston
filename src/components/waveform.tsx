import { useState } from "react";
import WaveSurfer from "wavesurfer.js";
import WavesurferPlayer from "@wavesurfer/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
} from "@fortawesome/free-regular-svg-icons";

const Waveform = ({ audio }: { audio: string }) => {
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  //   useEffect(() => {
  //     const waveSurfer = WaveSurfer.create({
  //       container: containerRef.current as HTMLElement,
  //       cursorColor: "#B3C3BD",
  //       cursorWidth: 1,
  //       height: 40,
  //       waveColor: "#93feff",
  //       progressColor: "#442728",
  //     });
  //     waveSurfer.load(audio);
  //     waveSurfer.on("ready", () => {
  //       waveSurferRef.current = waveSurfer;
  //     });

  //     return () => {
  //       //   waveSurfer.destroy();
  //     };
  //   }, []);

  return (
    <div id="audio-player" className="flex">
      <button id="play-btn" onClick={onPlayPause}>
        {!isPlaying ? (
          <FontAwesomeIcon icon={faCirclePlay} />
        ) : (
          <FontAwesomeIcon icon={faCirclePause} />
        )}
      </button>
      <div id="waveform-ctn">
        <WavesurferPlayer
          height={40}
          cursorColor="#B3C3BD"
          waveColor="#93feff"
          progressColor="#442728"
          url={audio}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default Waveform;
