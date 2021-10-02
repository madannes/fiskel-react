import fetch from "node-fetch"

const getQuotes = async (ticker) => {
  const result = {
    ticker,
    prices: {
      latest: null,
      oneWeek: null,
      threeWeek: null,
      sixWeek: null,
      threeMonth: null,
      sixMonth: null,
      twelveMonth: null,
    },
  }

  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1y`
  const options = { method: "GET", headers: { mode: "no-cors" } }

  try {
    const response = await fetch(url, options)
    const json = await response.json()
    const data = json.chart.result[0]
    const latestQuoteDate = new Date(data.meta.regularMarketTime * 1000)
    const latestQuotePrice = data.meta.regularMarketPrice
    result.prices.latest = {
      date: formatDate(latestQuoteDate),
      price: formatPrice(latestQuotePrice),
    }

    for (let idx = 0; idx < data.timestamp.length; idx++) {
      const closingDate = new Date(data.timestamp[idx] * 1000)
      const daysPast = Math.round((latestQuoteDate - closingDate) / (1000 * 60 * 60 * 24))
      const formatted = {
        date: formatDate(closingDate),
        daysPast,
        close: formatPrice(data.indicators.quote[0].close[idx]),
        adjusted: data.indicators.adjclose ? formatPrice(data.indicators.adjclose[0].adjclose[idx]) : null,
      }
      if (daysPast <= 7 && !result.prices.oneWeek) result.prices.oneWeek = formatted
      else if (daysPast <= 21 && !result.prices.threeWeek) result.prices.threeWeek = formatted
      else if (daysPast <= 42 && !result.prices.sixWeek) result.prices.sixWeek = formatted
      else if (daysPast <= 91 && !result.prices.threeMonth) result.prices.threeMonth = formatted
      else if (daysPast <= 182 && !result.prices.sixMonth) result.prices.sixMonth = formatted
      else if (idx === 0) result.prices.twelveMonth = formatted
    }
  } catch (err) {
    console.error(`Unable to load quotes for ${ticker}: ${err}`)
  }

  // console.log(JSON.stringify(result, null, 2))
  return result
}

const formatDate = (date) => date.toISOString().slice(0, 10)
const formatPrice = (price) => +price.toFixed(2)

export default getQuotes
