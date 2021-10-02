import getQuotes from "./services/YahooQuoteService.mjs"
import daa from "./data/daa.mjs"

for (let item of daa) {
  const quotes = await getQuotes(item.symbol)
  console.log(quotes)
}
