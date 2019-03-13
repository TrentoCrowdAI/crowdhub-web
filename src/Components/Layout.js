import React, {Component} from 'react';
import {Navbar, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './Sidebar/Sidebar';
import AppBar from "./AppBar";

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
          <AppBar onToggleSidebar={this.onToggleSidebar}/>

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
