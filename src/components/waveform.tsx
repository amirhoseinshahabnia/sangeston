import { useState, useEffect, Dispatch, SetStateAction } from "react";
import WavesurferPlayer from "@wavesurfer/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
} from "@fortawesome/free-regular-svg-icons";
import Skeleton from "./skeleton";
import classNames from "classnames";

const Waveform = ({
  audio,
  setGlobalPlay,
  globalWaveSurfer,
  setGlobalWaveSurfer,
}: {
  audio: string;
  setGlobalPlay: Dispatch<SetStateAction<boolean>>;
  globalWaveSurfer: any;
  setGlobalWaveSurfer: any;
}) => {
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    function resizePlayerWidth() {
      setScreenWidth(window.innerWidth);
    }
    resizePlayerWidth();

    window.addEventListener("resize", resizePlayerWidth);

    return () => {
      resizePlayerWidth();
    };
  }, []);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setLoadingPlayer(false);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  const handleOnPlay = () => {
    if (globalWaveSurfer && globalWaveSurfer !== wavesurfer) {
      globalWaveSurfer.pause();
      setTimeout(() => {
        setGlobalPlay(true);
      }, 0.0000001);
    }
    setIsPlaying(true);
    setGlobalPlay(true);
    setGlobalWaveSurfer(wavesurfer);
  };

  const handleOnPause = () => {
    setIsPlaying(false);
    setGlobalPlay(false);
  };

  return (
    <div id="audio-player" className="flex items-center">
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
          height={screenWidth < 1024 ? 30 : 40}
          width={screenWidth < 1024 ? (screenWidth < 768 ? 110 : 200) : 250}
          cursorColor="#e7ecf3"
          waveColor="#626871"
          progressColor="#442728"
          url={audio}
          dragToSeek
          onReady={onReady}
          onPlay={handleOnPlay}
          onPause={handleOnPause}
        />
      </div>
    </div>
  );
};

export default Waveform;
