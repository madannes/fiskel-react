export default class FundModel {
  constructor(symbol, quotes, error = null) {
    this.symbol = symbol
    this.error = error
    this.current = null
    this.momentum = null

    // the setter for quotes recalculates
    this.quotes = quotes
  }

  get quotes() { return this._quotes }
  set quotes(quotes) {
    this._quotes = quotes
    this.error = null
    this.recalculate()
  }

  recalculate = () => {
    const quotes = this._quotes
    this.current = null
    this.momentum = null

    if (quotes && quotes.length) {
      this.current = quotes[0]

      // calculate the percent increase or decrease per week based on latest price
      for (let wk in quotes)
        quotes[wk].value = (this.current.price / quotes[wk].price * 100) - 100

      // sum up the percentages for the specified weeks to get the momentum
      this.momentum = quotes[3].value + quotes[6].value + quotes[12].value + quotes[26].value
    }
  }
}