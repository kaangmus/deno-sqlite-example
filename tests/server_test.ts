import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { getContentTypeFromUrl } from "../server.ts"
import { makeObjectOfUrlParams } from "../handleRequests.ts"
import * as path from "https://deno.land/std/path/mod.ts"

const urls = [
  "/",
  "/view/styles.css",
  "/view/lib/modalWindow.js",
  "/view/lib/template.js",
  "/0.0.0.0:8000?name=xcv&email=gfv&address=gb&phone=y&product=fdg",
  "/favicon.ico",
  "/view/lib/modal.Window.js",
]

Deno.test(function shouldReturnObjectOfSearchParams(): void {
  assertEquals(makeObjectOfUrlParams("http:/" + urls[4]), {
    name: "xcv",
    email: "gfv",
    address: "gb",
    phone: "y",
    product: "fdg",
  })
})

Deno.test(function ShouldGetCorrectMimeType(): void {
  assertEquals(getContentTypeFromUrl(urls[5]), "image/x-icon")
  assertEquals(getContentTypeFromUrl(urls[6]), "text/javascript")
})

await Deno.runTests()
