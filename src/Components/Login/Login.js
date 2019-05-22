import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Container, Jumbotron} from "react-bootstrap";

import AuthService from "../../Services/AuthService";
import {PROJECTS_PATH} from "../Projects/Projects";
import "./Login.css";

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
      <Container>
        <Jumbotron style={{marginTop: '3em', textAlign: 'center'}}>
          <h1>Welcome to Servant</h1>
          <p>
            Please login with your Google account to continue
          </p>
          <div id="google-signin-button"/>
        </Jumbotron>
      </Container>
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


