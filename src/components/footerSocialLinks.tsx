import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

type Props = {
  links: any;
};

const FooterSocialLinks = ({ links }: Props) => {
  const iconMap = {
    instagram: faInstagram,
    twitter: faTwitter,
  };

  return (
    <ul id="footer-listen-links" className="flex gap-x-6 items-center">
      {links.map((item: any, i: number) => {
        return (
          <li key={i}>
            <a href={item.link} className="w-10 inline-block hover:opacity-80">
              <FontAwesomeIcon
                icon={iconMap[item.title as keyof typeof iconMap]}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterSocialLinks;
