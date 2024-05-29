import { getAllSongs, getGlobalConfig } from "@/lib/api";
import Hero from "@/components/hero";
import Song from "@/components/song";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const globalConfig = await getGlobalConfig();

  return (
    <main>
      {/* <section className="h-screen flex justify-center items-center shout">
        <h1 className="main-color text-4xl lg:text-5xl 2xl:text-7xl uppercase font-bold">
          Sangestone
        </h1>
      </section> */}

      <Hero />
      <section
        className="py-16 lg:py-24 bg-no-repeat bg-cover"
        id="music"
        style={{ backgroundImage: `url(${globalConfig.songsBackground.url})` }}
      >
        {songs.map((song: any, i: number) => (
          <Song key={i} data={song} id={i} />
        ))}
      </section>
    </main>
  );
}
