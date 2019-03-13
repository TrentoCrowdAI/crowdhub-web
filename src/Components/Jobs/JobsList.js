import React, {Component} from 'react';
import Link from "react-router-dom/Link";

export class JobsList extends Component {


  constructor(props) {
    super(props);
    this.match = this.props.match;
  }

  render() {
    return (
      <div>
        <p>TODO: Implement jobs list</p>

        <Link to={`${this.match.url}/new`}>Add</Link>
      </div>
    )
  }
}
