import { draftMode } from "next/headers";

export async function GET(req: Request) {
  const draft = await draftMode();
  draft.disable();

  console.log("[API]: disabling draft mode");

  return Response.json({ msg: "Successfully disabled draft mode" });
}
