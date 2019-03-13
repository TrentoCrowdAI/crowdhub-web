import React, {Component} from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default class Sidebar extends Component {

  render() {
    return (
      <nav id="sidebar" className={this.props.sidebarOpen ? 'open' : ''}>
        <ListGroup as="ul">
          <ListGroup.Item as="li" active>
            Jobs
          </ListGroup.Item>
        </ListGroup>
      </nav>
    );
  }
}
