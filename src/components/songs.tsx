"use client";

import { useRef, useEffect } from "react";
import Song from "./song";

let options = {
  root: null,
  rootMargin: "25px 0px -100px 0px",
  threshold: 0.75,
};

const Songs = ({ songs }: { songs: any }) => {
  const songsRef = useRef<HTMLDivElement>(null);
  const activeTimeline = useRef<HTMLDivElement>(null);

  // handle scroll functionality
  useEffect(() => {
    function handleScroll(e: any) {
      if (songsRef.current && activeTimeline.current) {
        const tlrRefRect = songsRef.current.getBoundingClientRect();
        if (tlrRefRect.y <= 0 && tlrRefRect.y >= -1 * tlrRefRect.height + 380) {
          // move the active tl
          activeTimeline.current.style.transform = `translateY(${
            -1 * tlrRefRect.y
          }px)`;
        }
      }
    }

    document.addEventListener("scroll", handleScroll);

    function handleYearAnimation(
      entries: IntersectionObserverEntry[],
      _observer: any
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    }

    let observer = new IntersectionObserver(handleYearAnimation, options);
    let allSongs = document.querySelectorAll(".year-ctn");

    allSongs.forEach((song) => observer.observe(song));

    // clean up
    () => {
      return document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="songs" ref={songsRef}>
      <div className="absolute inset-0 mx-auto w-full lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7x">
        <div className="timeline">
          <div className="timeline-active" ref={activeTimeline} />
        </div>
      </div>

      {songs.map((song: any, i: number) => (
        <Song key={i} data={song} id={i} />
      ))}
    </div>
  );
};

export default Songs;
