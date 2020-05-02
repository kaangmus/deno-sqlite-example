import { runServer } from "./server/server.ts"
import { handleGetRequest } from "./server/handleRequests.ts"
import { open, save } from "https://deno.land/x/sqlite/mod.ts"

type DbOpen = typeof db

const db = await open("test.db")
runServer(8000,{ handleGetRequest }, { db })

export { DbOpen }
