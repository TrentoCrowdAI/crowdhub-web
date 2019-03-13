import React, {Component} from 'react';
import menu from "../images/menu.svg";
import {Navbar} from "react-bootstrap";


export default class AppBar extends Component {
  render () {
    return (
      <Navbar bg="light" expand="lg">
        <a className="navbar-toggle" onClick={this.props.onToggleSidebar}>
          <img src={menu} className="menu-icon"/>
        </a>
      </Navbar>
    )
  }
}
