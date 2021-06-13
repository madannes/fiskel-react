import getQuotes from "./services/YahooQuoteService.mjs"
import daa from "./data/daa.mjs"

for (let item of daa) {
  getQuotes(item.symbol)
}
