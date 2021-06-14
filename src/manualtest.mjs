import getQuotes from "./services/YahooQuoteService.mjs"
import daa from "./data/daa.mjs"

let csvData = null


const quotes = getQuotes('GLD')
console.log(quotes.prices)
// Object.entries(quotes.prices).forEach(console.log)

// for (let item of daa) {
//   const quotes = getQuotes(item.symbol)
//   console.log(quotes)
// }
