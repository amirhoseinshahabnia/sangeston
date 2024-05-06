'use client';

import { useEffect } from 'react';
import Image from 'next/image';
// @ts-ignore
import * as hexToHsl from 'hex-to-hsl';

type SongProps = {
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

type HSLColor = {
  hue: number;
  saturation: number;
  lightness: number;
};

const data: SongProps[] = [
  {
    global: {
      title: 'global',
      backgroundImg: '/artwork-bg.png',
      numberOfCards: 4,
      globalColor: '#051A27',
    },
    music: {
      title: 'Music',
      artwork: '/artwork.png',
      musicName: 'Song A',
      artistNames: ['Artist A', 'Artist B'],
      composer: 'Composer A',
      lyricsBy: ['Artist A', 'Artist B'],
      coverArtBy: 'Sahar',
      tag: 'Latest Release',
      songPath: '',
    },
    lyrics: {
      title: 'Lyrics',
      farsi:
        'این یک نوشته آزمایشی است که به طراحان و برنامه نویسان کمک میکند تا این عزیزان با بهره گیری از این نوشته تستی و آزمایشی بتوانند نمونه تکمیل شده از پروژه و طرح خودشان را به کارفرما نمایش دهند، استفاده از این متن تستی می تواند سرعت پیشرفت پروژه را افزایش دهد، و طراحان به جای تایپ و نگارش متن می توانند تنها با یک کپی و پست این متن را در کادرهای مختلف جایگزین نمائید. این نوشته توسط سایت لورم ایپسوم فارسی نگاشته شده است.',
      english:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    credit: {
      title: 'Credit',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    listen: {
      title: 'Listen',
      spotify: '#',
      soundcloud: '#',
      youtube: '#',
      appleMusic: '#',
    },
  },
];

export default function Song() {
  const sampleData = data[0];

  const createMonochromPallete = (baseColor: string) => {
    const pallete: HSLColor[] = [];
    const hslColor = hexToHsl(baseColor);
    pallete.push({
      hue: hslColor[0],
      saturation: hslColor[1],
      lightness: hslColor[2],
    });

    // TODO: get this number dynamically from data
    for (let i = 1; i < 4; i++) {
      const lightness = Math.round(hslColor[2] + ((40 - hslColor[2]) / 3) * i);
      const newColor = {
        hue: hslColor[0],
        saturation: hslColor[1],
        lightness,
      };
      pallete.push(newColor);
    }
    return pallete;
  };

  const pallete = createMonochromPallete(sampleData.global.globalColor);

  useEffect(() => {
    const allCards = document.querySelectorAll('.card-body');
    if (allCards.length !== 0) {
      allCards.forEach((card, i) => {
        card.addEventListener('click', (e: any) => {
          // remove active class from every div
          allCards.forEach((item) => {
            // @ts-ignore
            item.parentNode.classList.remove('active');
          });

          // @ts-ignore
          allCards[i].parentNode.classList.add('active');
        });
      });
    }
  }, []);

  const renderCards = () => {
    const components = [];
    let index = 0;
    for (let card in sampleData) {
      if (card !== 'global') {
        let cardData = sampleData[card as keyof SongProps] as any;
        let xFactor = index > 2 ? 60 : index > 1 ? 20 : 0;
        components.push(
          <div
            className={`card rounded-2xl absolute ${
              index === 0 ? 'active' : ''
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
              src="/artwork-bg.png"
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
              {cardData.title === 'Music' && (
                <>
                  <div
                    className="flex items-center gap-x-4 mx-0 my-auto"
                    id="credit-ctn"
                  >
                    <div className="absolute top-6 right-10">
                      <p
                        className="main-color text-sm p-3 rounded-lg"
                        style={{
                          backgroundColor: sampleData.global.globalColor,
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
                        height={259}
                        priority
                      />
                    </div>
                    <div className="credit-body flex flex-col justify-between h-full">
                      <div className="top">
                        <h3>{cardData.musicName}</h3>
                        {cardData.artistNames.map(
                          (artist: string, i: number) => (
                            <span key={i}>{artist} </span>
                          )
                        )}
                      </div>
                      <div className="bottom">
                        <p>{cardData.composer}</p>
                        {cardData.lyricsBy.map((artist: string, i: number) => (
                          <span key={i}>{artist} </span>
                        ))}
                        <p>Cover Art by: {cardData.coverArtBy}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {cardData.title === 'Lyrics' && (
                <div>
                  <div id="farsi-lyrics">{cardData.farsi}</div>
                  <div id="english-lyrics">{cardData.english}</div>
                </div>
              )}
              {cardData.title === 'Credit' && (
                <div id="story">{cardData.body}</div>
              )}
              {cardData.title === 'Listen' && (
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
    <main
      className="min-h-screen items-center justify-center py-16 flex"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {renderCards()}
    </main>
  );
}
