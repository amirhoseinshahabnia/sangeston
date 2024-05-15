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

const Song = ({ data, id }: { data: any; id: number }) => {
  const { globalSettings } = data;

  const pallete = createMonochromPallete(
    globalSettings.fields.globalColor,
    Object.keys(data).length - 2
  );

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
      if (card !== "globalSettings" && card !== "songTitle") {
        let cardData = data[card].fields;
        let xFactor = index > 2 ? 60 : index > 1 ? 20 : 0;
        components.push(
          <div
            className={`card rounded-2xl absolute overflow-hidden ${
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
              src={`https:${globalSettings.fields.backgroundImg.fields.file.url}`}
              width={
                globalSettings.fields.backgroundImg.fields.file.details.image
                  .width
              }
              height={
                globalSettings.fields.backgroundImg.fields.file.details.image
                  .height
              }
              alt={`https:${globalSettings.fields.backgroundImg.fields.title}`}
              priority
              className="opacity-15 card-bg"
            />
            <div
              className="rounded-2xl absolute inset-0 color-overlay"
              style={{
                background: `hsl(${pallete[index].hue}, ${pallete[index].saturation}%, ${pallete[index].lightness}%)`,
              }}
            />

            <div className="card-body rounded-2xl absolute inset-0 flex overflow-x-hidden overflow-y-auto py-4 px-6 lg:py-8 lg:px-16">
              <div className="card-title absolute right-0">
                <p className="text-xs lg:text-lg -rotate-90">
                  {cardData.cardTitle}
                </p>
              </div>
              {card === "music" && (
                <>
                  <div
                    className="flex items-center gap-x-2 lg:gap-x-4 mx-0 my-auto"
                    id="credit-ctn"
                  >
                    <div className="absolute top-2 right-4 lg:top-6 lg:right-10">
                      {cardData.tags.map((tag: string, i: number) => (
                        <p
                          className="main-color text-xs lg:text-sm p-2 lg:p-3 rounded-lg"
                          style={{
                            backgroundColor: globalSettings.fields.globalColor,
                          }}
                          key={i}
                        >
                          {tag}
                        </p>
                      ))}
                    </div>
                    <div className="img-ctn">
                      <Image
                        src={`https:${cardData.artwork.fields.file.url}`}
                        alt={cardData.artwork.fields.description}
                        width={cardData.artwork.fields.file.details.image.width}
                        height={
                          cardData.artwork.fields.file.details.image.width
                        }
                        priority
                      />
                    </div>
                    <div className="credit-body flex flex-col justify-around h-full">
                      <div className="top">
                        <h3 className="text-sm lg:text-base">
                          {cardData.title}
                        </h3>
                        {cardData.artists.map((artist: string, i: number) => (
                          <span key={i} className="text-sm lg:text-base">
                            {artist}{" "}
                          </span>
                        ))}
                      </div>
                      <div className="bottom">
                        {/* <p>{cardData.composer}</p>
                        {cardData.lyricsBy.map((artist: string, i: number) => (
                          <span key={i}>{artist} </span>
                        ))}
                        <p>Cover Art by: {cardData.coverArtBy}</p> */}
                        <Waveform
                          audio={`https:${cardData.songPath.fields.file.url}`}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {card === "lyrics" && (
                <div>
                  <div id="farsi-lyrics" className="text-sm lg:text-base">
                    {cardData.farsi}
                  </div>
                  <div id="english-lyrics" className="text-sm lg:text-base">
                    {cardData.english}
                  </div>
                </div>
              )}
              {card === "credit" && (
                <div id="story">{JSON.stringify(cardData.body)}</div>
              )}
              {card === "listen" && (
                <div>
                  <h3>{cardData.title}</h3>
                  <p>{JSON.stringify(cardData)}</p>
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
      className="song-ctn flex relative mb-12 lg:mb-24 ml-1 lg:ml-0 lg:items-center lg:justify-center"
      id={`card-${id}`}
    >
      {renderCards()}
    </div>
  );
};

export default Song;
