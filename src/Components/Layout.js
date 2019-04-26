import React, {Component} from 'react';
import {HashRouter} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

import Sidebar from './Sidebar/Sidebar';
import AppBar from "./AppBar";
import AppRouter from "./AppRouter";

export default class Layout extends Component {

  state = {
    sidebarOpen: false
  };

  render() {
    return (
      <HashRouter>
        <div className="wrapper">
          {/* Left collapsable sidebar */}
          <Sidebar sidebarOpen={this.state.sidebarOpen}/>

          {/* Main content */}
          <div className="content" style={{'display': 'flex', 'flexDirection': 'column'}}>
            <AppBar onToggleSidebar={this.onToggleSidebar}/>

            <AppRouter />
          </div>
        </div>
      </HashRouter>
    );
  }

  onToggleSidebar = () => this.setState(previousState => {
    return {sidebarOpen: !previousState.sidebarOpen}
  });

}
