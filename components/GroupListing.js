import React from 'react';
import {Link} from 'react-router-dom'
import {LoadingMessage} from "./LoadingMessage.jsx"
import {DataService} from "../services/DataService.js"
import ReactTable from "react-table"

export class GroupListing extends React.Component {
  constructor() {
    super();
    
    this.state = {
      isLoading: true,
      groups: []
    };
    
    let dataService = new DataService();
    dataService.getGroups()
      .then(groups => this.setState({
        isLoading: false,
        groups: groups
      }));
  }
  
  render() {
    let groups = this.state.groups;
    
    if (this.state.isLoading)
      return (<LoadingMessage />);
    if (!groups || groups.length === 0)
      return (<p className="warning">No groups found</p>);

    return (
      <ReactTable
        data={groups}
        columns={[
          {
            Header: "Group",
            accessor: "name",
            Cell: g => <Link to={`/${g.value}`}>{g.value}</Link>
          },
          { Header: "Notes", accessor: "notes" },
        ]}
        className={"-striped -highlight"}
        defaultSorted={[{ id: "name" } ]}
        minRows={0}
        showPagination={false} />
    );
  }
}