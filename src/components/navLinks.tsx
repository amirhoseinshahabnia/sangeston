import Link from 'next/link';

type Props = {
  isHomePage: boolean;
};

const NavLinks = ({ isHomePage }: Props) => {
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
        <a href="#" className="text-lg hover:opacity-80">
          Music
        </a>
      </li>
      <li className="mb-6">
        <a href="#" className="text-lg hover:opacity-80">
          Bio
        </a>
      </li>
      <li>
        <a href="#" className="text-lg hover:opacity-80">
          Contacts
        </a>
      </li>
    </ul>
  );
};

export default NavLinks;
