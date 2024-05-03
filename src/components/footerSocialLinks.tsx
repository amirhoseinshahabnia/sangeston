import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const FooterSocialLinks = () => {
  return (
    <ul id="footer-listen-links" className="flex gap-x-6 items-center">
      <li>
        <a href="#" className="w-10 inline-block hover:opacity-80">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </li>
      <li>
        <a href="#" className="w-10 inline-block hover:opacity-80">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </li>
    </ul>
  );
};

export default FooterSocialLinks;
