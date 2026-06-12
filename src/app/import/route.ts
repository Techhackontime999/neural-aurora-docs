import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>`,
    {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  );
}
