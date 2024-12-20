// Set a variable that contains all the fields needed for song when a fetch for
// content is performed
const SONGS_GRAPHQL_FIELDS = `
    songTitle
    globalSettings {
        globalColor
        backgroundImg {
            url
            width
            height
            title
            description
        }
        numberOfCards
        order
        year
        releaseDate
    }
    music {
        cardTitle
        title
        artists
        tags
        songPath {
            url
        }
        artwork {
            url
            title
            description
            width
            height
        }
        order
    }
    lyrics {
        cardTitle
        farsi
        english
        order
    }
    credit {
        cardTitle
        body {
            json
        }
        order
    }
    listen {
        cardTitle
        title
        spotify
        soundcloud
        youtube
        appleMusic
        order
    }
`;

const GLOBAL_CONFIG_ID = "3zK7PEPN5mfrId2yvQHD39";

const GLOBAL_CONFIG_FIELDS = `
    navLinks
    footer
    songsBackground {
      url
      title
      description
    }
`;

async function fetchGraphQL(query: string, preview = false, tags: string[]) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches with tags
      // be revalidated or updated from Contentful on publish
      next: { tags },
    }
  ).then((response) => response.json());
}

function extractSongEntries(fetchResponse: any) {
  return fetchResponse?.data?.songCollection?.items;
}

export async function getAllSongs(
  limit = 30,
  // By default this function will return published content but will provide an option to
  // return draft content for reviewing articles before they are live
  isDraftMode = false
) {
  const songs = await fetchGraphQL(
    `query {
        songCollection(limit: ${limit}, order: sys_firstPublishedAt_DESC, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${SONGS_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
    ["songs"]
  );
  return extractSongEntries(songs);
}

export async function getGlobalConfig(isDraftMode = false) {
  const globalConfig = await fetchGraphQL(
    `query {
    globalConfig(id: "${GLOBAL_CONFIG_ID}") {
      ${GLOBAL_CONFIG_FIELDS}
    }
  }`,
    isDraftMode,
    ["global"]
  );

  return globalConfig?.data?.globalConfig;
}
