import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    JSON.stringify({
      accountAssociation: {
        header: "eyJmaWQiOjI1NjAxNCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDU1OGY4OGZGYzU0Y0I5RjQ0QmExN2FmNDU5RDI2YzM3NTRmNEU3ZTYifQ",
        payload: "eyJkb21haW4iOiJ0aXAtb24tbW9uYWQudmVyY2VsLmFwcCJ9",
        signature: "KO8R75VAlYhN1W3FNRN2mgnhjQOj3G4-gMIfFeANUIRRaJKuJE6iuOzexQCDJlLKv674E9TLgP6dQKwvhomLgxs"
      },
      miniapp: {
        version: "1",
        name: "tip on monad",
        iconUrl: "https://tip-on-monad.vercel.app/images/icon.png",
        homeUrl: "https://tip-on-monad.vercel.app",
        imageUrl: "https://tip-on-monad.vercel.app/images/feed.png",
        buttonTitle: "Tip now",
        splashImageUrl: "https://tip-on-monad.vercel.app/images/splash.png",
        splashBackgroundColor: "#160B28",
        webhookUrl: "https://api.neynar.com/f/app/ac9a59a9-fec9-4c1e-8cdf-a81a853db0e3/event"
      },
      subtitle: "Tip MON instantly on Monad",
      description: "Send tips on Monad in one tap. Auto wallet balance and quick share.",
      primaryCategory: "finance"
    }),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
        "access-control-allow-origin": "*"
      }
    }
  );
}
