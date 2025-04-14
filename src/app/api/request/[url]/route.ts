import { NextRequest } from "next/server";

const handler = async (
  request: NextRequest,
  { params }: { params: Promise<{ url: string }> },
) => {
  try {
    // throw Error('Upps...')
    const url = Buffer.from((await params).url, "base64").toString("utf-8");
    const headers = new Headers(
      Object.fromEntries(request.nextUrl.searchParams.entries()),
    );

    const options: RequestInit & { duplex?: string } = {
      headers,
      method: request.method,
      body: request.body,
      duplex: "half",
    };

    const response = await fetch(url, options);
    const { status, body, headers: responseHeaders } = response;
    const outHeaders = new Headers();
    responseHeaders.forEach((val, key) => {
      if (
        !["content-encoding", "content-length"].includes(
          key.toLocaleLowerCase(),
        )
      ) {
        outHeaders.set(key, val);
      }
    });

    return new Response(body, { status, headers: outHeaders });
  } catch (err) {
    console.log(err);
    let message = "Unknown error...";
    if (err instanceof Error) {
      message = err.message;
    }
    return new Response(null, {
      status: 500,
      headers: { "x-app-error": message },
    });
  }
};

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
