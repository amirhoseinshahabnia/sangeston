import { client } from "@/util/contentful";

export async function GET() {
  const data = await client.getEntries({
    content_type: "song",
  });

  return Response.json({ data });
}
