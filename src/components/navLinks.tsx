import Link from "next/link";

type Props = {
  isHomePage: boolean;
};

const NavLinks = ({ isHomePage }: Props) => {
  const handleMenuClick = (e: any) => {
    // e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    const targetId = target.dataset.id as string;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const y = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: "smooth",
      });
    }
  };

  if (!isHomePage) {
    return (
      <ul className="nav-links absolute flex flex-col top-8 right-8 lg:right-16 lg:top-16 text-center">
        <li className="mb-6">
          <Link href="/" className="text-lg hover:opacity-80">
            Return to Home
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="nav-links absolute flex flex-col top-8 right-8 lg:right-16 lg:top-16 text-center">
      <li className="mb-6">
        <a
          data-id="music"
          className="cursor-pointer text-lg hover:opacity-80"
          onClick={(e) => handleMenuClick(e)}
        >
          Music
        </a>
      </li>
      <li className="mb-6">
        <a
          data-id="bio"
          className="cursor-pointer text-lg hover:opacity-80"
          onClick={(e) => handleMenuClick(e)}
        >
          Bio
        </a>
      </li>
      <li>
        <a
          data-id="contact"
          className="cursor-pointer text-lg hover:opacity-80"
          onClick={(e) => handleMenuClick(e)}
        >
          Contacts
        </a>
      </li>
    </ul>
  );
};

export default NavLinks;
