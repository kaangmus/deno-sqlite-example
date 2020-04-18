export { generateHtml, addTableRows, searchAndPaste }

function searchAndPaste(baseString: string, pattern: string, str: string) {
  const index = baseString.search(pattern)
  return baseString.slice(0, index) + str + baseString.slice(index)
}

async function generateHtml(html: Record<string, string>) {
  const file = await Deno.open("./index.html", { read: true })
  const baseHtml = new TextDecoder().decode(await Deno.readAll(file))

  const addedHtml = `
    <modal-window >
<table slot="modal-content" style="width:50em;border-spacing: 5px;visibility: hidden; opacity: 0">
            <caption>Deine aktualisierte Database</caption>
    <thead style="background-color:lightgrey;">
    <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>address</th>
            <th>phone</th>
            <th>product</th>
            </tr>
    </thead>
    <tbody>
${html.tableRows}
    </tbody>
</table>
    </modal-window>
  `
  return searchAndPaste(baseHtml, "</body>", addedHtml)
}

function addTableRows(data: string[][]) {
  return data
    .map(row =>
      row.reduce(
        (acc, el, i) =>
          i !== row.length - 1
            ? acc + "<td>" + el + "</td>"
            : acc + "<td>" + el + "</td>" + "</tr>\n",
        "<tr>"
      )
    )
    .reduce((acc, el) => (acc += el), "")
    .trim()
}
