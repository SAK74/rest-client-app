import { NextRequest } from "next/server";

const handler = async (
  request: NextRequest,
  { params }: { params: Promise<{ url: string }> },
) => {
  const url = Buffer.from((await params).url, "base64").toString("utf-8");
  const headers = new Headers(
    Object.fromEntries(request.nextUrl.searchParams.entries()),
  );
  // console.log({ url, headers, method: request.method });

  const options: RequestInit & { duplex?: string } = {
    headers,
    method: request.method,
    body: request.body,
    duplex: "half",
  };

  const response = await fetch(url, options);
  const { status, body, headers: responseHeaders } = response;
  // console.log({ response });
  const outHeaders = new Headers();
  responseHeaders.forEach((val, key) => {
    if (
      !["content-encoding", "content-length"].includes(key.toLocaleLowerCase())
    ) {
      outHeaders.set(key, val);
    }
  });

  return new Response(body, { status, headers: outHeaders });
};

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
