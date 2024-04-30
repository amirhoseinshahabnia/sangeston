'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SideDrawer from './sideDrawer';
import NavLinks from './navLinks';

const Header = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const onMenuClick = () => {
    setSideDrawerOpen(true);
  };

  const onSideDrawerClick = () => {
    setSideDrawerOpen(false);
  };

  return (
    <>
      <header className="main-header sticky top-0 flex items-center">
        <nav className="flex items-center justify-between mx-auto w-11/12 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7x ">
          <div className="logo-ctn">
            <Link href="/">
              <Image
                src="/main-logo.png"
                width={75}
                height={47}
                alt="Sangeston main logo"
                className="hover:opacity-80"
              />
            </Link>
          </div>
          <div
            className="menu flex items-end gap-x-2 hover:opacity-80 cursor-pointer"
            onClick={onMenuClick}
          >
            <div className="line left-line"></div>
            <div className="line center-line"></div>
            <div className="line right-line"></div>
          </div>
        </nav>
      </header>
      <SideDrawer show={sideDrawerOpen} onClick={onSideDrawerClick}>
        <NavLinks />
      </SideDrawer>
    </>
  );
};

export default Header;
