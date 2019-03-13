import React, {Component} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import './Sidebar.css';

export default class Sidebar extends Component {

  render() {
    return (
      <nav id="sidebar" className={this.props.sidebarOpen ? 'open' : ''}>
        <h2 className="app-title">Servant</h2>

        <ListGroup as="ul">
          <ListGroup.Item as="li" className="sidebar-link" active>
            <a>Jobs</a>
          </ListGroup.Item>
        </ListGroup>
      </nav>
    );
  }
}
