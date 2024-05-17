import Image from "next/image";
import { getAllSongs } from "@/lib/api";
import Typography from "@/components/typography";
import Song from "@/components/song";

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

export default async function Home() {
  const songs = await getAllSongs();

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
        {songs.map((song: any, i: number) => (
          <Song key={i} data={song} id={i} />
        ))}
      </section>
    </main>
  );
}
