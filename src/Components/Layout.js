import React, {Component} from 'react';
import {HashRouter} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

import Sidebar from './Sidebar/Sidebar';
import AppBar from "./Appbar/AppBar";
import AppRouter from "./AppRouter";
import AuthService from "../Services/AuthService";

export default class Layout extends Component {

  state = {
    sidebarOpen: false
  };

  componentDidMount() {
    AuthService.addOnAuthChangeListener(() => this.forceUpdate());
  }

  render() {
    const showSidebarAndAppBar = AuthService.isInitialized() && AuthService.isSignedIn();
    return (
      <HashRouter>
        <div className="wrapper">
          {
            /* Left collapsable sidebar */
            showSidebarAndAppBar &&
            <Sidebar sidebarOpen={this.state.sidebarOpen}/>
          }

          {/* Main content */}
          <div className="content" style={{'display': 'flex', 'flexDirection': 'column'}}>
            {
              showSidebarAndAppBar &&
              <AppBar onToggleSidebar={this.onToggleSidebar}/>
            }

            <AppRouter/>
          </div>
        </div>
      </HashRouter>
    );
  }

  onToggleSidebar = () => this.setState(previousState => {
    return {sidebarOpen: !previousState.sidebarOpen}
  });

}
