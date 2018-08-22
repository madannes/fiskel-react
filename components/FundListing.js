import React from 'react'
import {Link} from 'react-router-dom'
import {LoadingMessage} from "./LoadingMessage.jsx"
//import {DataService} from "../services/DataService.js"
import ReactTable from "react-table"

export class FundListing extends React.Component {
  constructor(props) {
    super(props);
    
    this.name = props.match.params.name;
    this.state = { isLoading: true, group: [] };
    
    getGroupsWithQuotesAsync(this.name).then(group => { this.setState({ isLoading: false, group: group }); console.log(group); });
    
    /*
    let dataService = new DataService();
    dataService.getGroupWithQuotes().then(json => {
        let groups = json;
        let group = null;
        
        if (groups && groups.length > 0)
          group = groups.find(g => g.name === this.name);
          
        this.setState({ isLoading: false, group: group })
      });
      */
  }
  
  render() {
    let funds = this.state.group.funds;
    let fundListingContent = null;
    
    if (this.state.isLoading) {
      fundListingContent = (<LoadingMessage />);
    }
    if (funds && funds.length > 0) {
      fundListingContent = (
      <ReactTable
        data={funds}
        columns={[
          { Header: "Symbol", accessor: "fund.symbol" },
          { Header: "Description", accessor: "fund.description" },
          { Header: "Quotes", accessor: "quotes" },
        ]}
        className={"-striped -highlight"}
        defaultSorted={[{ id: "fund.symbol" } ]}
        minRows={0}
        showPagination={false} />
      );
    } else {
      fundListingContent = (
        <p className="warning">No funds</p>
      );
    }
    
    return (
      <div>
        <Link to="/">Back to Listing</Link>
        <h1>{this.name}</h1>
        {fundListingContent}
      </div>
    );
  }
}