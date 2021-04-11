const fetch = require("node-fetch")

const getQuotes = async (ticker) => {
  const response = await fetch(`https://query2.finance.yahoo.com/v8/finance/chart/GLD?interval=1d&range=1y`).then(r => r.json().then(console.log))

  let result = {
    ticker,
    prices: {
      current: null,
      oneWeek: null,
      threeWeek: null,
      sixWeek: null,
      threeMonth: null,
      sixMonth: null,
      twelveMonth: null,
    },
  }
  try {
    const json = await response.json()
    const data = json.chart.result[0]
    const quotes = data.indicators.quote[0].close
    const currentQuoteDate = new Date(data.timestamp[0] * 1000)

    for (let idx = 0; idx < quotes.length; idx++) {
      const closingDate = new Date(data.timestamp[idx] * 1000)
      const closingPrice = data.indicators.adjclose ? data.indicators.adjclose[0].adjclose[idx] : quotes[idx].close
      const daysPastCurrent = Math.round(closingDate - currentQuoteDate)
      const formattedValue = { date: closingDate.toISOString().slice(0, 10), price: closingPrice.toFixed(2) }
      if (idx === 0) result.prices.current = formattedValue
      else if (daysPastCurrent > 7 && !result.prices.oneWeek) result.prices.oneWeek = formattedValue
      else if (daysPastCurrent > 21 && !result.prices.threeWeek) result.prices.threeWeek = formattedValue
      else if (daysPastCurrent > 42 && !result.prices.sixWeek) result.prices.sixWeek = formattedValue
      else if (daysPastCurrent > 91 && !result.prices.threeMonth) result.prices.threeMonth = formattedValue
      else if (daysPastCurrent > 182 && !result.prices.sixMonth) result.prices.sixMonth = formattedValue
      else if (idx === quotes.length - 1) result.prices.twelveMonth = formattedValue
    }
  } catch (err) {
    console.error(`Unable to load quotes for ${ticker}: ${err}`)
  }

  console.log(JSON.stringify(result, null, 2))
}

// getQuotes("MSFT")
