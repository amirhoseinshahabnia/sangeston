import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import classNames from "classnames";
import {
  faSpotify,
  faSoundcloud,
  faYoutube,
  faItunes,
} from "@fortawesome/free-brands-svg-icons";
import { createMonochromPallete } from "@/util/colorsConversion";
import Typography from "./typography";
import Waveform from "@/components/waveform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const swipeableConfig = {
  preventScrollOnSwipe: true,
  trackMouse: false,
};

const Song = ({
  data,
  id,
  setSongPlaying,
  setGlobalWaveSurfer,
  globalWaveSurfer,
}: {
  data: any;
  id: number;
  setSongPlaying: Dispatch<SetStateAction<boolean>>;
  globalWaveSurfer: any;
  setGlobalWaveSurfer: any;
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { songTitle, globalSettings, music, lyrics, credit, listen } = data;
  const sortedComponents = {
    songTitle: 100,
    globalSettings: 99,
    music: music.order,
    lyrics: lyrics.order,
    credit: credit.order,
    listen: listen.order,
  };

  const cardTitles = ["Music", "Lyrics", "Credit", ""];

  const sliderWreapperRef = useRef<HTMLDivElement>(null);

  // @ts-ignore
  const sortable: any = Object.entries(sortedComponents)
    .sort(([, a], [, b]) => a - b)
    .reduce((r, [key, value]) => ({ ...r, [key]: value }), {});

  const pallete = createMonochromPallete(
    globalSettings.globalColor,
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

  const prevArrowClickHandler = () => {
    if (activeSlide !== 0) {
      setActiveSlide(activeSlide - 1);
      if (sliderWreapperRef.current) {
        sliderWreapperRef.current.style.transform = `translateX(calc(${-(
          activeSlide - 1
        )} * 100% - ${activeSlide - 1} * 75px))`;
      }
    }
  };

  const nextArrowClickHandler = () => {
    if (activeSlide !== globalSettings.numberOfCards - 2) {
      setActiveSlide(activeSlide + 1);
      if (sliderWreapperRef.current) {
        sliderWreapperRef.current.style.transform = `translateX(calc(${-(
          activeSlide + 1
        )} * 100% - ${activeSlide + 1} * 75px))`;
      }
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedRight: prevArrowClickHandler,
    onSwipedLeft: nextArrowClickHandler,
    ...swipeableConfig,
  });

  const renderOption = {
    renderText: (text: string) => {
      return text.split("\n").reduce((children: any, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        return (
          <Image
            src={node.data.target.fields.file.url}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.title}
          />
        );
      },
    },
  };

  const renderCards = () => {
    const components = [];
    let index = 0;
    for (let card in sortable) {
      if (card !== "globalSettings" && card !== "songTitle") {
        components.push(
          <div
            className={classNames(
              "card rounded-2xl lg:absolute overflow-hidden",
              {
                active: index === 0,
                "lyrics-wrapper": index === 1,
                "credit-wrapper": index === 2,
              }
            )}
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
              src={globalSettings.backgroundImg.url}
              width={globalSettings.backgroundImg.width}
              height={globalSettings.backgroundImg.height}
              alt={globalSettings.backgroundImg.title}
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
              <div className="card-title hidden absolute right-0 lg:block">
                <p className="text-xs lg:text-lg -rotate-90">
                  {data[card].cardTitle}
                </p>
              </div>
              {card === "music" && (
                <>
                  <div
                    className="flex items-center gap-x-2 lg:gap-x-4 mx-auto lg:my-auto flex-col lg:flex-row lg:mx-0"
                    id="music-ctn"
                  >
                    {music.tags && (
                      <div className="absolute top-4 right-4 lg:top-6 lg:right-10 flex gap-x-1">
                        {music.tags.map((tag: string, i: number) => (
                          <p
                            className="main-color text-xs lg:text-sm p-2 lg:p-3 rounded-lg"
                            style={{
                              backgroundColor: globalSettings.globalColor,
                            }}
                            key={i}
                          >
                            {tag}
                          </p>
                        ))}
                      </div>
                    )}
                    <div className="img-ctn">
                      <Image
                        src={music.artwork.url}
                        alt={music.artwork.description}
                        width={music.artwork.width}
                        height={music.artwork.width}
                        priority
                        className="rounded-xl lg:rounded-none"
                      />
                    </div>
                    <div
                      className="flex items-center justify-center gap-x-4 mt-7 lg:hidden"
                      id="listen-mobile"
                    >
                      {listen.spotify && (
                        <a
                          href={listen.spotify}
                          className="w-8 lg:w-12 inline-block hover:opacity-80"
                          target="_blank"
                        >
                          <FontAwesomeIcon
                            icon={faSpotify}
                            className="h-full w-full"
                          />
                        </a>
                      )}
                      {listen.soundcloud && (
                        <a
                          href={listen.soundcloud}
                          className="w-8 lg:w-12 inline-block hover:opacity-80"
                          target="_blank"
                        >
                          <FontAwesomeIcon
                            icon={faSoundcloud}
                            className="h-full w-full"
                          />
                        </a>
                      )}
                      {listen.youtube && (
                        <a
                          href={listen.youtube}
                          className="w-8 lg:w-12 inline-block hover:opacity-80"
                          target="_blank"
                        >
                          <FontAwesomeIcon
                            icon={faYoutube}
                            className="h-full w-full"
                          />
                        </a>
                      )}
                      {listen.appleMusic && (
                        <a
                          href={listen.appleMusic}
                          className="w-8 lg:w-12 inline-block hover:opacity-80"
                          target="_blank"
                        >
                          <FontAwesomeIcon
                            icon={faItunes}
                            className="h-full w-full"
                          />
                        </a>
                      )}
                    </div>
                    <div className="credit-body flex flex-col justify-around order-first text-center mb-5 lg:order-2 lg:text-left lg:h-full lg:mb-0">
                      <div className="top">
                        <h3 className="text-xl mb-3 lg:mb-0 lg:text-base">
                          {songTitle}
                        </h3>
                        {music.artists.map((artist: string, i: number) => (
                          <span key={i} className="text-base lg:text-base">
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
                          audio={music.songPath.url}
                          setGlobalPlay={setSongPlaying}
                          globalWaveSurfer={globalWaveSurfer}
                          setGlobalWaveSurfer={setGlobalWaveSurfer}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {card === "lyrics" && (
                <div>
                  {lyrics.farsi && (
                    <div id="farsi-lyrics" className="text-sm lg:text-base">
                      {lyrics.farsi}
                    </div>
                  )}
                  {lyrics.english && (
                    <div id="english-lyrics" className="text-sm lg:text-base">
                      {lyrics.english}
                    </div>
                  )}
                </div>
              )}
              {card === "credit" && (
                <div id="credit">
                  {documentToReactComponents(credit.body.json, renderOption)}
                </div>
              )}
              {card === "listen" && (
                <div className="flex flex-col items-center justify-center mx-auto">
                  <h3 className="mb-3 lg:mb-4">{listen.title}</h3>
                  <div className="flex gap-x-3 lg:gap-x-4 justify-center w-full">
                    {listen.spotify && (
                      <a
                        href={listen.spotify}
                        className="w-8 lg:w-12 inline-block hover:opacity-80"
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          icon={faSpotify}
                          className="h-full w-full"
                        />
                      </a>
                    )}
                    {listen.soundcloud && (
                      <a
                        href={listen.soundcloud}
                        className="w-8 lg:w-12 inline-block hover:opacity-80"
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          icon={faSoundcloud}
                          className="h-full w-full"
                        />
                      </a>
                    )}
                    {listen.youtube && (
                      <a
                        href={listen.youtube}
                        className="w-8 lg:w-12 inline-block hover:opacity-80"
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          icon={faYoutube}
                          className="h-full w-full"
                        />
                      </a>
                    )}
                    {listen.appleMusic && (
                      <a
                        href={listen.appleMusic}
                        className="w-8 lg:w-12 inline-block hover:opacity-80"
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          icon={faItunes}
                          className="h-full w-full"
                        />
                      </a>
                    )}
                  </div>
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
      className="song-ctn flex relative mb-20 mx-auto lg:mb-44 lg:items-center lg:justify-center"
      id={`card-${id}`}
      {...swipeHandlers}
    >
      <div
        className={classNames(
          "year-ctn absolute inset-0 flex flex-col justify-center mx-auto w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl"
        )}
      >
        <Typography
          htmlCopy={`${globalSettings.year}`}
          variant="p2"
          classes="max-w-fit"
        />
        <div className="hr-line" />
      </div>
      <div className="slider-wrapper" ref={sliderWreapperRef}>
        {renderCards()}
      </div>
      <div
        className="absolute pb-4 flex justify-between  mobile-slider-control lg:hidden"
        style={{ zIndex: 17 }}
      >
        <div
          className={classNames(
            "arrow-ctn flex items-center cursor-pointer hover:opacity-80",
            {
              disabled: activeSlide === 0,
            }
          )}
          onClick={prevArrowClickHandler}
        >
          <Image
            src="/arrow-prev.png"
            height={28}
            width={40}
            alt="Slider Previous Arrow"
            className="mr-2 arrow-icon"
          />
          <p className="text-sm" style={{ color: "#bcc5d3" }}>
            {cardTitles[activeSlide - 1]}
          </p>
        </div>
        <div
          className={classNames(
            "arrow-ctn flex items-center cursor-pointer hover:opacity-80",
            {
              disabled: activeSlide === globalSettings.numberOfCards - 2,
            }
          )}
          onClick={nextArrowClickHandler}
        >
          <p className="text-sm" style={{ color: "#bcc5d3" }}>
            {cardTitles[activeSlide + 1]}
          </p>
          <Image
            src="/arrow-next.png"
            height={28}
            width={40}
            alt="Slider Next Arrow"
            className="ml-2 arrow-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Song;
