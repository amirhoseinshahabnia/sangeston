"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SideDrawer from "./sideDrawer";
import NavLinks from "./navLinks";

type Props = {
  navLinks: any[];
};

const Header = ({ navLinks }: Props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const pathname = usePathname();

  const onSideDrawerClick = () => {
    setSideDrawerOpen(false);
  };

  // close side-drawer on anywhere click that is not in side-drawer or menu btn
  useEffect(() => {
    function hideDrawer(e: any) {
      if (
        e.target.id !== "side-drawer" &&
        ![...e.target.classList].includes("menu") &&
        ![...e.target.classList].includes("line")
      ) {
        setSideDrawerOpen(false);
      }
    }

    window.addEventListener("click", hideDrawer);

    // cleanup
    return () => {
      window.removeEventListener("click", hideDrawer);
    };
  }, []);

  return (
    <>
      <header className="main-header sticky top-0 flex items-center">
        <nav className="flex items-center justify-between mx-auto w-11/12  ">
          <div className="logo-ctn">
            <Link href="/">
              <Image
                src="/main-logo-updated.png"
                width={75}
                height={47}
                alt="Sangeston main logo"
                className="hover:opacity-80"
                id="main-logo"
                priority
              />
            </Link>
          </div>
          <div></div>
          <div
            className="menu flex items-end gap-x-2 hover:opacity-80 cursor-pointer"
            onClick={() => setSideDrawerOpen(true)}
          >
            <div className="line left-line"></div>
            <div className="line center-line"></div>
            <div className="line right-line"></div>
          </div>
        </nav>
      </header>
      <SideDrawer show={sideDrawerOpen} onClick={onSideDrawerClick}>
        <NavLinks isHomePage={pathname === "/"} navLinks={navLinks} />
      </SideDrawer>
    </>
  );
};

export default Header;
