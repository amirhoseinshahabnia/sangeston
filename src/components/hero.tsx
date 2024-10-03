"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Typography from "./typography";

const data = {
  title: "Sangestone",
  img: "/sangestone-crossing-street.jpg",
};

// wrapping title letters in spans for animation
let textWithSpans = "";

for (let letter of data.title) {
  textWithSpans += `<span style='animation-delay:${Math.random()}s'>${letter}</span>`;
  // i++;
}

const Hero = ({ noAnimation }: { noAnimation?: boolean }) => {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="hero-loader min-h-screen flex justify-center flex-col items-center">
        {/* <div className="glitch-logo mb-4"></div> */}
        <img
          src="/glitch-1.gif"
          alt="Sangstone Logo"
          className="mb-4 sang-gif"
        />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="hero relative">
      <div
        className="absolute bottom-0 left-0 right-0 md:inset-0 flex flex-col justify-center mx-auto w-full lg:max-w-full lg:w-11/12 "
        id="hero-body-ctn"
      >
        <Typography
          variant="h1"
          htmlCopy={textWithSpans}
          classes={classNames(
            "font-bold uppercase tracking-wider max-w-fit text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl",
            {
              animated: !noAnimation,
            }
          )}
        />
      </div>
      <Image
        priority
        width={1512}
        height={700}
        src={data.img}
        alt="Sangestone Crossing Street"
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
