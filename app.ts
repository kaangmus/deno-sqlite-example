import { runServer } from "./server.ts"
import { open, save } from "https://deno.land/x/sqlite/mod.ts"
import { handleGetRequest } from "./handleRequests.ts"

type DbOpen = typeof db

const db = await open("test.db")
runServer({ handleGetRequest }, { db })

export { DbOpen }
