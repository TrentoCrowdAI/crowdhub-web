import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

import Sidebar from './Sidebar/Sidebar';
import AppBar from "./AppBar";
import {Projects} from "./Projects/Projects";
import {PROJECTS_PATH} from "./Projects/Projects";

const BASENAME = process.env.REACT_APP_BASENAME || "";

export default class Layout extends Component {

  state = {
    sidebarOpen: false
  };

  render() {
    return (
      <Router basename={BASENAME}>
        <div className="wrapper">
          {/* Left collapsable sidebar */}
          <Sidebar sidebarOpen={this.state.sidebarOpen}/>

          {/* Main content */}
          <div className="content">
            <AppBar onToggleSidebar={this.onToggleSidebar}/>

            <Switch>
              <Route path={`${PROJECTS_PATH}`} component={Projects}/>
              <Route render={() => (<Redirect to={`${PROJECTS_PATH}`}/>)}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

  onToggleSidebar = () => this.setState(previousState => {
    return {sidebarOpen: !previousState.sidebarOpen}
  });

}
