import React, {Component} from 'react';
import {Navbar, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './Sidebar';
import menu from '../images/menu.svg'

export default class Layout extends Component {

  state = {
    sidebarOpen: false
  };

  render() {
    return (
      <div className="wrapper">
        {/* Left collapsable sidebar */}
        <Sidebar sidebarOpen={this.state.sidebarOpen}/>

        {/* Main content */}
        <div className="content">
          <Navbar bg="light" expand="lg">
            <a onClick={this.onToggleSidebar}>
              <img src={menu} className="menu-icon"/>
            </a>

            <Navbar.Brand href="#home">Servant</Navbar.Brand>
          </Navbar>

          <Container>
            <h1>Main content</h1>
          </Container>

        </div>
      </div>
    );
  }

  onToggleSidebar = () => {
    this.setState(previousState => {
      return {sidebarOpen: !previousState.sidebarOpen}
    });
  };
}
