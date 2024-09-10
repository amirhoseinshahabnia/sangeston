import Image from "next/image";
import { draftMode } from "next/headers";
import Hero from "@/components/hero";
import Songs from "@/components/songs";
import Typography from "@/components/typography";
import { getAllSongs, getGlobalConfig } from "@/lib/api";

const artistBio = {
  htmlCopy:
    "Bijan, aka <span class='font-bold'>Sangstone</span>, was born in the summer of 1987 in Tehran, Iran. He grew up in Atisaz, spending most of his time playing soccer. His creativity was cultivated from an early age through different lessons in piano, painting and writing. When he was 13, his family and he migrated to the US. Shortly after, Bijan discovered poetry. Initially, he wrote poems and performed them for his family, who encouraged his new-found passion.",
  img: "/sangestone-portait-flare.jpg",
};

export default async function Home() {
  const { isEnabled } = draftMode();

  // pass draftmode to fetch functions to show NOT published posts as well
  const songs = await getAllSongs(20, isEnabled);
  const globalConfig = await getGlobalConfig(isEnabled);

  return (
    <main>
      {/* <section className="h-screen flex justify-center items-center shout">
        <h1 className="main-color text-4xl lg:text-5xl 2xl:text-7xl uppercase font-bold">
          Sangestone
        </h1>
      </section> */}

      <Hero />
      <section
        className="bg-no-repeat bg-cover relative"
        id="music"
        style={{ backgroundImage: `url(${globalConfig.songsBackground.url})` }}
      >
        <Songs songs={songs} />
      </section>
      <section id="bio">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto w-full lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7x">
          <div className="flex items-center">
            <Typography
              htmlCopy={artistBio.htmlCopy}
              variant="p"
              classes="main-color 2xl:mb-6 max-w-fit py-16 lg:pr-16 w-11/12 mx-auto lg:w-full lg:mx-0"
            />
          </div>
          <Image
            priority
            width={627}
            height={940}
            src={artistBio.img}
            alt="Sangestone Portrait"
            className="block w-full"
          />
        </div>
      </section>
    </main>
  );
}
