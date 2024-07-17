"use client";

import { useRef, useEffect } from "react";
import Song from "./song";

const Songs = ({ songs }: { songs: any }) => {
  const songsRef = useRef<HTMLDivElement>(null);
  const activeTimeline = useRef<HTMLDivElement>(null);

  // handle scroll functionality
  useEffect(() => {
    let allYearsIndicators = document.querySelectorAll(".year-ctn");
    function handleScroll(e: any) {
      if (songsRef.current && activeTimeline.current) {
        const tlrRefRect = songsRef.current.getBoundingClientRect();
        const activeTLRect = activeTimeline.current.getBoundingClientRect();
        if (tlrRefRect.y > 180) {
          activeTimeline.current.style.transform = "translateY(0)";
        } else if (
          tlrRefRect.y <= 180 &&
          tlrRefRect.y >= -1 * tlrRefRect.height
        ) {
          // move the active tl
          activeTimeline.current.style.transform = `translateY(${
            -1 * tlrRefRect.y + 180
          }px)`;
        }

        allYearsIndicators.forEach((year) => {
          if (
            year.getBoundingClientRect().y <=
              activeTLRect.y + activeTLRect.height - 220 &&
            year.getBoundingClientRect().y > -activeTLRect.height / 3
          ) {
            year.classList.add("active");
          } else {
            year.classList.remove("active");
          }
        });
      }
    }

    document.addEventListener("scroll", handleScroll);

    // clean up
    () => {
      return document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="songs py-20 lg:py-44" ref={songsRef}>
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
