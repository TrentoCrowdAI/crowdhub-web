import React, {Component} from 'react';
import menu from "../../images/menu.svg";
import {Navbar} from "react-bootstrap";
import AccountInformation from "./AccountInformation";


export default class AppBar extends Component {
  render() {
    return (
      <Navbar className="light-background" expand="lg">
        <div className="mr-auto">
          <button className="navbar-toggle button-link" onClick={this.props.onToggleSidebar}>
            <img src={menu} className="menu-icon" alt="Toggle sidebar"/>
          </button>
        </div>

        <div>
          <AccountInformation/>
        </div>
      </Navbar>
    )
  }


}
