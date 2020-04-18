import { open, save } from "https://deno.land/x/sqlite/mod.ts"
import { generateHtml, addTableRows } from "./generateHtml.ts"
import { ResponseInput, Opts, ServerRequest } from "./server.ts"
import { DbOpen } from "./app.ts"

type Seller = {
  name: string | null
  email: string | null
  address: string | null
  phone: string | null
  product: string | null
}
type Search = {
  table: string | null
  column: string | null
  searchword: string | null
}

async function handleGetRequest(
  req: ServerRequest,
  addArgs: Opts
): Promise<ResponseInput> {
  if (!addArgs.db) return [, , 500]
  const db = addArgs.db
  const sellerOrSearch = makeObjectOfUrlParams("http:/" + req.url)
  const html = await generateHtml({
    tableRows:
      "display" in sellerOrSearch
        ? addTableRows(await displayTable(db, "seller"))
        : "reset" in sellerOrSearch
        ? addTableRows(await resetDb(db, "seller"))
        : "product" in sellerOrSearch
        ? addTableRows(await updateDb(db, "seller", sellerOrSearch as Seller))
        : addTableRows(await queryDb(db, sellerOrSearch as Search)),
  })
  return [html, [["Content-type", "text/html"]], 200]
}

function makeObjectOfUrlParams(reqUrl: string) {
  return Object.fromEntries([...new URL(reqUrl).searchParams.entries()])
}

async function displayTable(db: DbOpen, table: string) {
  return [...db.query(`SELECT * FROM ${table}`)]
}

async function resetDb(db: DbOpen, table: string) {
  const tables = [
    ...db.query("SELECT name FROM sqlite_master WHERE type='table'"),
  ]
  for (const table of tables) db.query(`delete FROM ${table}`)
  return [[]]
}

async function updateDb(db: DbOpen, table: string, obj: Seller) {
  db.query(
    `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, address TEXT, phone TEXT, product TEXT)`
  )
  db.query(
    `INSERT INTO ${table} (${Object.keys(obj).join(
      ", "
    )}) VALUES (?${", ?".repeat(Object.keys(obj).length - 1)})`,
    Object.values(obj)
  )
  const result = [...db.query(`SELECT * FROM ${table}`)]
  await save(db)
  return result
}

async function queryDb(db: DbOpen, { table, column, searchword }: Search) {
  try {
    return [
      ...db.query(`SELECT * FROM ${table} WHERE ${column} = '${searchword}'`),
    ]
  } catch {
    return [[]]
  }
}

export { handleGetRequest, makeObjectOfUrlParams }
