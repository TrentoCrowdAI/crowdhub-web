import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import './Sidebar.css';

export default class Sidebar extends Component {

  render() {
    return (
      <nav id="sidebar" className={this.props.sidebarOpen ? 'open' : ''}>
        <h2 className="app-title">Servant</h2>

        <ListGroup as="ul">
          <ListGroup.Item as="li" className="sidebar-link">
            <NavLink to="/projects">
              Projects
            </NavLink>
          </ListGroup.Item>
        </ListGroup>
      </nav>
    );
  }
}
