import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpotify,
  faSoundcloud,
  faYoutube,
  faItunes,
} from '@fortawesome/free-brands-svg-icons';

const FooterListenLinks = () => {
  return (
    <ul id="footer-listen-links" className="flex gap-x-6 items-center">
      <li>
        <a href="#" className="w-10 inline-block hover:opacity-80">
          <FontAwesomeIcon icon={faSpotify} />
        </a>
      </li>
      <li>
        <a href="#" className="w-10 inline-block hover:opacity-80">
          <FontAwesomeIcon icon={faSoundcloud} />
        </a>
      </li>
      <li>
        <a href="#" className="w-10 inline-block hover:opacity-80">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </li>
      <li>
        <a href="#" className="w-10 inline-block hover:opacity-80">
          <FontAwesomeIcon icon={faItunes} />
        </a>
      </li>
    </ul>
  );
};

export default FooterListenLinks;
