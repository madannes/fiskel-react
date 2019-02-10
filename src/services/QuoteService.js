import FundModel from '../models/FundModel'

class QuoteService {
  constructor() {
    this.quoteUrl = 'https://www.alphavantage.co/query?apikey=ZL45&function=TIME_SERIES_WEEKLY_ADJUSTED'
  }

  getWeeklyQuotes = (symbols, forceRefresh, success, error) => {
    // chain together synchronous promises to limit API calls to 5x min (free tier)
    // https://stackoverflow.com/a/40329190
    // this would be MUCH easier and cleaner if stackblitz enabled async & await
    for (let i = 0, p = Promise.resolve(); i < symbols.length; i++) {
      p = p.then(_ => new Promise(resolve => {
        const symbol = symbols[i]

        // first check the cache
        const cacheKey = `fiskel_${symbol}`
        const cached = JSON.parse(localStorage.getItem(cacheKey))
        if (!forceRefresh && cached && cached.expiry > new Date()) {
          console.log(`Returning quotes for ${symbol} from cache`)
          success(symbol, cached.quotes)
          resolve() // resolve iteration immediately since we didn't hit API
        }
        else {
          // if not in cache or expired, query API
          console.log(`Querying API for ${symbol}...`)
          fetch(`${this.quoteUrl}&symbol=${symbol}`)
            .then(response => response.json())
            .then(json => {
              // map the quotes
              const quotes = this.mapWeeklyQuotes(json)

              // cache the model so we don't hit API again for 4hrs
              let now = new Date()
              localStorage.setItem(cacheKey, JSON.stringify({ quotes, expiry: now.setHours(now.getHours() + 4) }))
              console.log(`Cached ${quotes.length} quotes for ${symbol}`)

              // fire the callback
              success(symbol, quotes)

              // wait 12sec before resolving to limit API calls to 5x min
              setTimeout(resolve, 12000)
            })
            .catch(err => {
              console.error(err)
              error(symbol, err)
            })
        } // end else
      })) // end Promise
    } // end for
  } // end function

  mapWeeklyQuotes(json) {
    const weeklyQuotes = json['Weekly Adjusted Time Series']
    const dates = Object.keys(weeklyQuotes).slice(0, 53)
    return dates.map(dt => {
      const price = weeklyQuotes[dt]['5. adjusted close']
      return { date: new Date(dt), price: parseFloat(price) }
    })
  }
}

export default QuoteService