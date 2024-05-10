"use client";

import { useEffect } from "react";
import Image from "next/image";
import { createMonochromPallete } from "@/util/colorsConversion";
import Waveform from "@/components/waveform";

export type SongProps = {
  global: {
    title: string;
    backgroundImg: string;
    numberOfCards: number;
    globalColor: string;
  };
  music: {
    title: string;
    artwork: string;
    musicName: string;
    artistNames: string[];
    composer?: string;
    lyricsBy: string[];
    coverArtBy?: string;
    tag?: string;
    songPath?: string;
  };
  lyrics: {
    title: string;
    farsi?: string;
    english?: string;
  };
  credit: {
    title: string;
    body?: string;
  };
  listen?: {
    title: string;
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
    appleMusic?: string;
  };
};

const Song = ({ data, id }: { data: SongProps; id: number }) => {
  const { global } = data;

  const pallete = createMonochromPallete(global.globalColor, 4);

  useEffect(() => {
    const allCards = document.querySelectorAll(`#card-${id} .card-body`);
    if (allCards.length !== 0) {
      allCards.forEach((card, i) => {
        card.addEventListener("click", (e: any) => {
          // remove active class from every div
          allCards.forEach((item) => {
            // @ts-ignore
            item.parentNode.classList.remove("active");
          });

          // @ts-ignore
          allCards[i].parentNode.classList.add("active");
        });
      });
    }
  }, []);

  const renderCards = () => {
    const components = [];
    let index = 0;
    for (let card in data) {
      if (card !== "global") {
        let cardData = data[card as keyof SongProps] as any;
        let xFactor = index > 2 ? 60 : index > 1 ? 20 : 0;
        components.push(
          <div
            className={`card rounded-2xl absolute ${
              index === 0 ? "active" : ""
            }`}
            key={index}
            id={`slide-${index}`}
            style={{
              zIndex: 10 - index,
              // transform: `translateX(${index * 85 + xFactor}px)`,
              // transform: `translate3d(${index * 85 + xFactor}px, 0px, ${
              //   index * -100
              // }px)`,
            }}
          >
            <Image
              src={global.backgroundImg}
              width={700}
              height={400}
              alt="artwork-a"
              priority
              className="opacity-15"
            />
            <div
              className="rounded-2xl absolute inset-0 color-overlay"
              style={{
                background: `hsl(${pallete[index].hue}, ${pallete[index].saturation}%, ${pallete[index].lightness}%)`,
              }}
            />

            <div className="card-body rounded-2xl absolute inset-0 py-8 px-16 flex">
              <div className="card-title absolute right-0">
                <p className="text-lg">{cardData.title}</p>
              </div>
              {cardData.title === "Music" && (
                <>
                  <div
                    className="flex items-center gap-x-4 mx-0 my-auto"
                    id="credit-ctn"
                  >
                    <div className="absolute top-6 right-10">
                      <p
                        className="main-color text-sm p-3 rounded-lg"
                        style={{
                          backgroundColor: global.globalColor,
                        }}
                      >
                        {cardData.tag}
                      </p>
                    </div>
                    <div className="img-ctn">
                      <Image
                        src={cardData.artwork}
                        alt={cardData.artwork}
                        width={256}
                        height={260}
                        priority
                      />
                    </div>
                    <div className="credit-body flex flex-col justify-around h-full">
                      <div className="top">
                        <h3>{cardData.musicName}</h3>
                        {cardData.artistNames.map(
                          (artist: string, i: number) => (
                            <span key={i}>{artist} </span>
                          )
                        )}
                      </div>
                      <div className="bottom">
                        {/* <p>{cardData.composer}</p>
                        {cardData.lyricsBy.map((artist: string, i: number) => (
                          <span key={i}>{artist} </span>
                        ))}
                        <p>Cover Art by: {cardData.coverArtBy}</p> */}
                        <Waveform audio={cardData.songPath} />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {cardData.title === "Lyrics" && (
                <div>
                  <div id="farsi-lyrics">{cardData.farsi}</div>
                  <div id="english-lyrics">{cardData.english}</div>
                </div>
              )}
              {cardData.title === "Credit" && (
                <div id="story">{cardData.body}</div>
              )}
              {cardData.title === "Listen" && (
                <div>
                  <h3>Listen</h3>
                </div>
              )}
            </div>
          </div>
        );
        index++;
      }
    }

    return components;
  };

  return (
    <div
      className="song-ctn flex items-center justify-center relative mb-24"
      id={`card-${id}`}
    >
      {renderCards()}
    </div>
  );
};

export default Song;
