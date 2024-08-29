"use client";

import Image from "next/image";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Typography from "./typography";

const data = {
  title: "Sangestone",
  img: "/hero-sang-2-min.png",
};

// wrapping title letters in spans for animation
let textWithSpans = "";

for (let letter of data.title) {
  textWithSpans += `<span style='animation-delay:${Math.random()}s'>${letter}</span>`;
  // i++;
}

const Hero = () => {
  useEffect(() => {
    const heroText = document.querySelector(".hero h1");
    setTimeout(() => {
      heroText?.classList.add("animated");
    }, 200);
  }, []);

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
        className="absolute bottom-0 left-0 right-0 md:inset-0 flex flex-col justify-center mx-auto w-full lg:max-w-full lg:w-11/12 "
        id="hero-body-ctn"
      >
        <Typography
          variant="h1"
          htmlCopy={textWithSpans}
          classes="font-bold uppercase tracking-wider max-w-fit text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
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
