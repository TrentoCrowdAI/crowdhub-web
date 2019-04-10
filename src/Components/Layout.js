import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

import Sidebar from './Sidebar/Sidebar';
import AppBar from "./AppBar";
import {Jobs} from "./Jobs/Jobs";

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
              <Route path="/jobs" component={Jobs}/>
              <Route render={() => (<Redirect to="/jobs"/>)}/>
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
