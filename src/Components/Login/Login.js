import React, {Component} from "react";
import AuthService from "../../Services/AuthService";
import {PROJECTS_PATH} from "../Projects/Projects";
import {Redirect} from "react-router-dom";

export const LOGIN_PATH = "/login";

export default class Login extends Component {

  signInButtonRendered = false;

  state = {
    loggedIn: false
  };

  render() {
    if (this.state.loggedIn) {
      return this.renderRedirect();
    }
    return this.renderLogin();
  }

  renderRedirect = () => (
    <Redirect to={PROJECTS_PATH}/>
  );

  renderLogin = () => {
    this.renderSignInButtonIfNeeded();
    return (
      <div>
        Login:
        <div id="google-signin-button"/>
      </div>
    );
  };

  renderSignInButtonIfNeeded = () => {
    if (!this.signInButtonRendered) {
      this.renderSignInButton();
      this.signInButtonRendered = true;
    }
  };

  renderSignInButton = () => setImmediate(() => {
    AuthService.renderSignInButton('google-signin-button', this.onSignedIn)
  });

  onSignedIn = () => this.setState({loggedIn: true});
}


