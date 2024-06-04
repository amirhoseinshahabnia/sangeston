"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Typography from "./typography";

const data = {
  title: "Sangestone",
  subtitle: "Welcome to",
  img: "/hero-sang-2-min.png",
};

const Hero = () => {
  const handleScrollClick = () => {
    const id = "music";
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const y = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="hero relative">
      <div
        className="absolute bottom-0 left-0 right-0 md:inset-0 flex flex-col justify-center mx-auto w-full lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7x"
        id="hero-body-ctn"
      >
        <Typography
          htmlCopy={data.subtitle}
          variant="p"
          classes="main-color mb-2 xl:mb-4 2xl:mb-6 max-w-fit"
        />
        <Typography
          variant="h1"
          htmlCopy={data.title}
          classes="font-bold uppercase tracking-wider max-w-fit"
        />
      </div>
      <Image
        priority
        width={1512}
        height={700}
        src={data.img}
        alt={data.title}
        id="hero-img"
        className="block w-full"
      />
      <div
        className="scroll-hero main-color absolute bottom-1 hidden md:flex flex-col items-center hover:opacity-80 cursor-pointer"
        onClick={handleScrollClick}
      >
        <span className="animate-bounce">Enter the world</span>
        <FontAwesomeIcon icon={faChevronDown} size="3x" fontWeight={100} />
      </div>
    </div>
  );
};

export default Hero;
