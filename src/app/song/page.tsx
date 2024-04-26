import Image from 'next/image';
// @ts-ignore
import * as hexToHsl from 'hex-to-hsl';

type SongProps = {
  global: {
    backgroundImg: string;
    numberOfCards: number;
    globalColor: string;
  };
  credit: {
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
    farsi?: string;
    english?: string;
  };
  story: {
    body?: string;
  };
  listen: {
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
      backgroundImg: '/artwork-bg.png',
      numberOfCards: 4,
      globalColor: '#051A27',
    },
    credit: {
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
      farsi:
        'این یک نوشته آزمایشی است که به طراحان و برنامه نویسان کمک میکند تا این عزیزان با بهره گیری از این نوشته تستی و آزمایشی بتوانند نمونه تکمیل شده از پروژه و طرح خودشان را به کارفرما نمایش دهند، استفاده از این متن تستی می تواند سرعت پیشرفت پروژه را افزایش دهد، و طراحان به جای تایپ و نگارش متن می توانند تنها با یک کپی و پست این متن را در کادرهای مختلف جایگزین نمائید. این نوشته توسط سایت لورم ایپسوم فارسی نگاشته شده است.',
      english:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    story: {
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    listen: {
      spotify: '#',
      soundcloud: '#',
      youtube: '#',
      appleMusic: '#',
    },
  },
];

export default function Song() {
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

  const pallete = createMonochromPallete('#051A27');

  return (
    <main className="flex flex-col gap-y-5 min-h-screen items-center justify-center py-8">
      {Array(data[0].global.numberOfCards)
        .fill(true)
        .map((_, index) => (
          <div className="card rounded-2xl relative" key={index}>
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
            <div className="card-body absolute inset-0 z-10 flex justify-center items-center">
              <h3 className="text-2xl font-semibold">Card {index}</h3>
            </div>
          </div>
        ))}
    </main>
  );
}
