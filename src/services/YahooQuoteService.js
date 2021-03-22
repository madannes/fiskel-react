const fetch = require('node-fetch')

const getQuotes = async ticker => {
  const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1y`)

  let result = { ticker, prices: [] }
  try {
    const json = await response.json()
    const data = json.chart.result[0]
    quotes = data.indicators.quote[0].close

    for (let idx = quotes.length - 1; idx >= 0; idx--) {
      const closingDate = new Date(data.timestamp[idx] * 1000)
      result.prices.push({ closingDate, price: data.indicators.adjclose ? data.indicators.adjclose[0].adjclose[idx] : quotes[idx].close })
    }
  } catch (err) {
    console.error(`Unable to load quotes for ${ticker}: ${err}`)
  }

  console.log(`***** ${ticker} *****`)
  console.log(JSON.stringify(result, null, 2))
  // for (let idx = 0; idx < closingDates.length; idx++) {
  //   const closingDate = closingDates[idx]
  //   const closingPrice = closingPrices[idx]
  //   console.log(idx, closingDate, closingPrice)
  // }
}

getQuotes('GLD')
