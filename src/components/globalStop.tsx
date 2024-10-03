import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import { div } from "three/webgpu";
const GlobalStop = ({
  ws,
  setSongPlaying,
}: {
  ws: any;
  setSongPlaying: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    ws.pause();
    setSongPlaying(false);
  };

  return (
    <div className="mx-auto w-11/12 fixed z-20 left-0 bottom-5 right-0">
      <div
        className="cursor-pointer  w-10 h-10 rounded-full flex items-center justify-center lg:w-12 lg:h-12 hover:opacity-80"
        style={{ color: "#383f49", backgroundColor: "#c4cfe2" }}
        id="global-pause"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faStop} className="global-pause-icon" />
      </div>
    </div>
  );
};

export default GlobalStop;
