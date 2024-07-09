import Link from "next/link";

type Props = {
  isHomePage: boolean;
  navLinks: any[];
};

const NavLinks = ({ isHomePage, navLinks }: Props) => {
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
      <ul className="nav-links absolute flex flex-col top-8 right-8 lg:right-14 lg:top-14 text-center main-color">
        <li className="mb-6">
          <Link href="/" className="text-lg hover:opacity-80">
            Return to Home
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="nav-links absolute flex flex-col top-8 right-8 lg:right-14 lg:top-14 text-center main-color">
      {navLinks.map((item: any, i: number) => {
        return (
          <li key={i} className="mb-6">
            <a
              data-id={item.dataId}
              className="cursor-pointer text-lg hover:opacity-80"
              onClick={(e) => handleMenuClick(e)}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
