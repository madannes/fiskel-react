import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import FundModel from '../models/FundModel'
import QuoteService from '../services/QuoteService'
import groups from '../data/index'

const WEEKS = [1, 3, 6, 12, 26, 52]

class GroupDetail extends Component {
  constructor(props) {
    super(props)
    const groupName = props.match.params.name
    this.quoteService = new QuoteService()
    this.state = {
      groupName: groupName,
      funds: groups[groupName.toLowerCase()].funds.map(f => new FundModel(f.symbol))
    }
  }

  componentDidMount() {
    this.loadQuotes(false)
  }

  // call quote service and provide a progress callback to update state as quotes come in
  loadQuotes = forceRefresh =>
    this.quoteService.getWeeklyQuotes(
      this.state.funds.map(f => f.symbol),
      forceRefresh,
      this.quotesLoadedHandler,
      this.quotesErroredHandler)

  quotesLoadedHandler = (symbol, quotes) => this.updateFundModelInState(new FundModel(symbol, quotes))
  quotesErroredHandler = (symbol, error) => this.updateFundModelInState(new FundModel(symbol, [], error))

  updateFundModelInState = model => {
    console.log(`Updating fund model for ${model.symbol}`, model)
    const funds = this.state.funds.map(f => f.symbol === model.symbol ? model : f)
    this.setState({ funds })
  }

  render() {
    return (
      <Fragment>
        <h1>{this.state.groupName}</h1>
        <Link to="/" className="btn btn-link">Back to Groups</Link>
        <button className="btn btn-link" onClick={this.loadQuotes(true)}>Refresh Quotes</button>
        <table id="quoteTable" className="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Description</th>
              {WEEKS.map(wk => <th key={wk} scope="col">{wk}w</th>)}
              <th scope="col">Mom</th>
            </tr>
          </thead>
          <tbody>
            {this.state.funds.map(f => (
              <tr key={f.symbol} className='quoteRow'>
                <td>
                  {f.symbol}
                  {f.current && <small>{f.current.date.toString()} - ${f.current.price.toFixed(2)}</small>}
                </td>
                <td>{f.description}</td>
                {WEEKS.map(wk => {
                  let cellMarkup = null
                  if (f.quotes) {
                    const quote = f.quotes[wk]
                    if (quote && quote.value)
                      cellMarkup = (
                        <Fragment>
                          {quote.value.toFixed(1)}
                          <small>{quote.date.toString()} - ${quote.price.toFixed(2)}</small>
                        </Fragment>
                      )
                    else
                      cellMarkup = 'N/A'
                  }
                  return (<td key={wk}>{cellMarkup ? cellMarkup : <Loader />}</td>)
                })}
                <td>{f.momentum ? f.momentum.toFixed(1) : 'N/A'}</td>
              </tr>)
            )}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default GroupDetail