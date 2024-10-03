import { NextResponse, NextRequest } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (email) {
    const emailHash = md5(email);
    try {
      // Add the email to the Mailchimp list
      await mailchimp.lists.setListMember(
        process.env.MAILCHIMP_AUDIENCE_ID as string,
        emailHash,
        {
          email_address: email,
          status_if_new: "subscribed", // Will subscribe the user if they are new
          status: "subscribed", // Will update existing user status to "subscribed" if already exists
        }
      );
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { error: "Something went wrong, please try again." },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    {
      error: "Please put in a valid email address",
    },
    { status: 400 }
  );
}

export async function GET() {
  return NextResponse.json({ message: "Method not Allowed" });
}
