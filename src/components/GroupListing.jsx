import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import groups from '../data/index'

const GroupListing = () => (
  <Fragment>
    <h1>fiskel</h1>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Group</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(groups).map(k => {
          const g = groups[k]
          return (
            <tr key={k}>
              <td><Link to={`/group/${k}`}>{g.name}</Link></td>
              <td>{g.notes}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </Fragment>
)

export default GroupListing