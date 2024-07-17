import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// this route handler is responsible for setting preview cookie to show content that is NOT published on Contentful

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (!secret) {
    return Response.json({ msg: "Missing Token" });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return Response.json({ msg: "Invalid Token" });
  }

  //   enable draft mode;
  draftMode().enable();

  redirect("/");
}
