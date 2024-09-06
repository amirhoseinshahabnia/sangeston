import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
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
    <div
      className="main-color cursor-pointer fixed z-20 w-10 h-10 left-2 bottom-2 rounded-full flex items-center justify-center lg:w-12 lg:h-12 lg:left-5 lg:bottom-5 hover:opacity-80"
      style={{ backgroundColor: "#383f49" }}
      id="global-pause"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faStop} className="global-pause-icon" />
    </div>
  );
};

export default GlobalStop;
