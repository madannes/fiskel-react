class QuoteService {
  constructor() {
    this.quoteUrl = 'https://www.alphavantage.co/query?apikey=ZL45&function=TIME_SERIES_WEEKLY_ADJUSTED'
  }

  async getWeeklyQuotes(symbol, forceRefresh) {
    // first check to see if we have valid cached quotes for the symbol
    const cacheKey = `fiskel_${symbol}`
    const cached = JSON.parse(localStorage.getItem(cacheKey))

    if (!forceRefresh && cached && cached.expiry > new Date()) {
      console.log(`Returning quotes for ${symbol} from cache`)
      return cached.quotes
    }

    // if not in cache or cache is expired, we have to query API
    console.log(`Querying API for ${symbol}...`)
    const response = await fetch(`${this.quoteUrl}&symbol=${symbol}`)
    const json = await response.json()

    // map the JSON (very ugly) to our quote models
    const quotes = this.mapWeeklyQuotes(json)

    // cache the quote models so we don't hit API needlessly
    let now = new Date()
    localStorage.setItem(cacheKey, JSON.stringify({
      quotes,
      expiry: now.setHours(now.getHours() + 8)
    }))
    console.log(`Cached ${quotes.length} quotes for ${symbol}`)

    // delay 11.5sec to allow ~5 API requests per minute (free rate limit)
    await new Promise(resolve => setTimeout(resolve, 11500))

    return quotes
  } // end function

  mapWeeklyQuotes(json) {
    const weeklyQuotes = json['Weekly Adjusted Time Series']
    const dates = Object.keys(weeklyQuotes).slice(0, 53)
    return dates.map(date => {
      const price = weeklyQuotes[date]['5. adjusted close']
      return {
        date,
        price: parseFloat(price)
      }
    })
  }
}

export default QuoteService