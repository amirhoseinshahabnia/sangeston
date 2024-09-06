"use client";

import { useRef, useEffect, useState } from "react";
import Song from "./song";
import GlobalStop from "./globalStop";

const MIN_SCREEN_WIDTH_FOR_SCROLL = 1024;

const Songs = ({ songs }: { songs: any }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [songPlaying, setSongPlaying] = useState(false);
  const [globalWaveSurfer, setGlobalWaveSurfer] = useState<any>(null);
  const songsRef = useRef<HTMLDivElement>(null);
  const activeTimeline = useRef<HTMLDivElement>(null);

  // handle scroll functionality
  useEffect(() => {
    setScreenWidth(window?.innerWidth);
    let allYearsIndicators = document.querySelectorAll(".year-ctn");
    function handleScroll(e: any) {
      if (screenWidth >= MIN_SCREEN_WIDTH_FOR_SCROLL) {
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
    }

    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // clean up
    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  return (
    <>
      <div className="songs py-20 lg:py-44" ref={songsRef}>
        <div className="absolute inset-0 mx-auto w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7x">
          <div className="timeline">
            <div className="timeline-active" ref={activeTimeline} />
          </div>
        </div>

        {songs.map((song: any, i: number) => (
          <Song
            key={i}
            data={song}
            id={i}
            setSongPlaying={setSongPlaying}
            globalWaveSurfer={globalWaveSurfer}
            setGlobalWaveSurfer={setGlobalWaveSurfer}
          />
        ))}
      </div>
      {songPlaying && (
        <GlobalStop ws={globalWaveSurfer} setSongPlaying={setSongPlaying} />
      )}
    </>
  );
};

export default Songs;
