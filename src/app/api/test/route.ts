import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // @ts-ignore
  console.log(request.body.customer);

  return NextResponse.json({ msg: "Webhook received!" });
}
