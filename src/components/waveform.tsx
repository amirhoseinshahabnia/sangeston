import { useState } from "react";
import WavesurferPlayer from "@wavesurfer/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
} from "@fortawesome/free-regular-svg-icons";
import Skeleton from "./skeleton";
import classNames from "classnames";

const Waveform = ({ audio }: { audio: string }) => {
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setLoadingPlayer(false);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div id="audio-player" className="flex">
      {loadingPlayer ? (
        <Skeleton />
      ) : (
        <>
          <button id="play-btn" onClick={onPlayPause}>
            {!isPlaying ? (
              <FontAwesomeIcon icon={faCirclePlay} />
            ) : (
              <FontAwesomeIcon icon={faCirclePause} />
            )}
          </button>
        </>
      )}
      <div
        id="waveform-ctn"
        className={classNames({ "sr-only": loadingPlayer })}
      >
        <WavesurferPlayer
          height={40}
          cursorColor="#B3C3BD"
          waveColor="#93feff"
          progressColor="#442728"
          url={audio}
          dragToSeek
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default Waveform;
