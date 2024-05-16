import Image from "next/image";
import { client } from "@/util/contentful";
import Typography from "@/components/typography";
import Song, { SongProps } from "@/components/song";

const hero = {
  title: "Sangestone",
  subtitle: "This is",
  img: "/hero-sang-2-min.png",
};

const artistBio = {
  htmlCopy:
    "Bijan, aka <span class='font-bold'>Sangstone</span>, was born in the summer of 1987 in Tehran, Iran. He grew up in Atisaz, spending most of his time playing soccer. His creativity was cultivated from an early age through different lessons in piano, painting and writing. When he was 13, his family and he migrated to the US. Shortly after, Bijan discovered poetry. Initially, he wrote poems and performed them for his family, who encouraged his new-found passion.",
  img: "/Sang_Portrait_flare1-min.png",
};

const data: SongProps[] = [
  {
    global: {
      title: "global",
      backgroundImg: "/artwork-bg.png",
      numberOfCards: 4,
      globalColor: "#442728",
    },
    music: {
      title: "Music",
      artwork: "/artwork.png",
      musicName: "Song B",
      artistNames: ["Sangstone", "Artist B"],
      composer: "Composer A",
      lyricsBy: ["Sangstone", "Artist B"],
      coverArtBy: "Sahar",
      tag: "Latest Release",
      songPath: "/song.mp3",
    },
    lyrics: {
      title: "Lyrics",
      farsi:
        "این یک نوشته آزمایشی است که به طراحان و برنامه نویسان کمک میکند تا این عزیزان با بهره گیری از این نوشته تستی و آزمایشی بتوانند نمونه تکمیل شده از پروژه و طرح خودشان را به کارفرما نمایش دهند، استفاده از این متن تستی می تواند سرعت پیشرفت پروژه را افزایش دهد، و طراحان به جای تایپ و نگارش متن می توانند تنها با یک کپی و پست این متن را در کادرهای مختلف جایگزین نمائید. این نوشته توسط سایت لورم ایپسوم فارسی نگاشته شده است.",
      english:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    credit: {
      title: "Credit",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    listen: {
      title: "Listen",
      spotify: "#",
      soundcloud: "#",
      youtube: "#",
      appleMusic: "#",
    },
  },
];

async function getData() {
  const data = await client.getEntries({
    content_type: "song",
  });

  return data;
}

// TODO: how does data fetching from contentful work on the client side??? Shouldn't we move it to server side?

export default async function Home() {
  const data = await getData();

  return (
    <main>
      {/* <section className="h-screen flex justify-center items-center shout">
        <h1 className="main-color text-4xl lg:text-5xl 2xl:text-7xl uppercase font-bold">
          Sangestone
        </h1>
      </section> */}

      <div className="hero relative">
        <div
          className="absolute bottom-0 left-0 right-0 md:inset-0 flex flex-col justify-center mx-auto w-full lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7x"
          id="hero-body-ctn"
        >
          <Typography
            htmlCopy={hero.subtitle}
            variant="p"
            classes="main-color mb-2 xl:mb-4 2xl:mb-6"
          />
          <Typography
            variant="h1"
            htmlCopy={hero.title}
            classes="main-color font-bold uppercase tracking-wider"
          />
        </div>
        <Image
          priority
          width={1512}
          height={700}
          src={hero.img}
          alt={hero.title}
          id="hero-img"
          className="block w-full"
        />
      </div>
      <section className="py-16 lg:py-24" id="music">
        {data.items.map((song: any, i: number) => (
          <Song key={i} data={song.fields} id={i} />
        ))}
      </section>
    </main>
  );
}
