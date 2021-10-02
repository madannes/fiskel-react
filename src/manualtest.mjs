import getQuotes from "./services/YahooQuoteService.mjs"
import daa from "./data/daa.mjs"

let csvData = null


const quotes = await getQuotes('GLD')
console.log(quotes)
// Object.entries(quotes.prices).forEach(console.log)

// for (let item of daa) {
//   const quotes = getQuotes(item.symbol)
//   console.log(quotes)
// }
