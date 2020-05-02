import { serve, ServerRequest } from "https://deno.land/std/http/server.ts"
import * as path from "https://deno.land/std/path/mod.ts"
import { encode, decode } from "https://deno.land/std/encoding/utf8.ts"
import { exists, existsSync } from "https://deno.land/std/fs/mod.ts"

type ResponseInput = [
  undefined | string | Uint8Array,
  undefined | string[][],
  undefined | number
]
type RequestHandlers = {
  handleGetRequest: (req: ServerRequest, args: Opts) => Promise<ResponseInput>
}
type Opts = Record<string, any> & { db?: any; reqBody?: string }

async function runServer(port: number, callbacks: RequestHandlers, args: Opts) {
  console.log(`Listening to port ${port}`)
  for await (const req of serve({ port })) {
    const [body, hPairs, status] = await makeResponseInput(req, callbacks, args)
    req.respond({ body, headers: generateHeaders(hPairs), status })
  }
}

function generateHeaders(hPairs: ResponseInput[1], headers = new Headers()) {
  if (hPairs) hPairs.forEach(([key, value]) => key && headers.set(key, value))
  return headers
}

async function makeResponseInput(
  req: ServerRequest,
  callbacks: RequestHandlers,
  args: Opts
): Promise<ResponseInput> {
  switch (req.method) {
    case "GET":
      // if is a directory search for index file matching the extention
      const pathname = req.url === "/" ? "./index.html" : "." + req.url
      return getContentTypeFromUrl(pathname)
        ? await handleFileRequest(pathname, req)
        : await callbacks.handleGetRequest(req, args)
      break
    // case "POST":
    // const reqBody = decode(await Deno.readAll(req.body))
    // return [undefined, undefined, 200]
    default:
      return [undefined, undefined, 200]
  }
}

async function handleFileRequest(
  pathname: string,
  req: ServerRequest
): Promise<ResponseInput> {
  if (!(await exists(pathname))) return [undefined, undefined, 404]
  return Deno.readFile(pathname)
    .then(
      (data: Uint8Array): ResponseInput => [
        data,
        [["Content-type", getContentTypeFromUrl(pathname) || "text/plain"]],
        200,
      ]
    )
    .catch(err => [undefined, undefined, 500])
}

function getContentTypeFromUrl(pathname: string): string | null {
  const fileTypes = new Map([
    [".ico", "image/x-icon"],
    [".html", "text/html"],
    [".js", "text/javascript"],
    [".json", "application/json"],
    [".css", "text/css"],
    [".png", "image/png"],
    [".jpg", "image/jpeg"],
    [".wav", "audio/wav"],
    [".mp3", "audio/mpeg"],
    [".svg", "image/svg+xml"],
    [".pdf", "application/pdf"],
    [".doc", "application/msword"],
  ])
  return fileTypes.get(path.posix.extname(pathname)) || null
}

export {
  runServer,
  ServerRequest,
  ResponseInput,
  Opts,
  handleFileRequest,
  getContentTypeFromUrl,
}
