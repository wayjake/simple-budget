import type { ServerBuild } from "@remix-run/server-runtime";
import { createRequestHandler, logDevReady } from "@remix-run/server-runtime";
import { resolve } from "node:path";
import * as build from "./build/index";
import { type Serve } from "bun";

if (Bun.env.NODE_ENV === "development") {
  logDevReady(build as unknown as ServerBuild);
}

const remix = createRequestHandler(
  build as unknown as ServerBuild,
  Bun.env.NODE_ENV
);

export default {
  port: Bun.env.PORT || 3000,
  async fetch(request) {
    // First we need to send handle static files
    let { pathname } = new URL(request.url);
    let file = Bun.file(resolve(__dirname, "../public/", `.${pathname}`));
    if (await file.exists()) return new Response(file);
    // Only if a file doesn't exists we send the request to the Remix request handler
    return remix(request);
  },
} satisfies Serve;