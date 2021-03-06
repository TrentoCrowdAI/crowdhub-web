import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {Projects, PROJECTS_PATH} from "./Projects/Projects";
import {PUBLIC_WORKFLOWS_PATH, PublicWorkflows, Workflows, WORKFLOWS_PATH} from "./Workflows/Workflows";
import AuthService from '../Services/AuthService';
import Login, {LOGIN_PATH} from "./Login/Login";
import LoadingContainer from "./common/LoadingContainer";


export default class AuthenticatedAppRouter extends Component {

  state = {
    authServiceInitialized: false
  };

  componentDidMount = () => this.initAuthService();

  initAuthService = async () => {
    await AuthService.init();
    this.setState({authServiceInitialized: true});
  };

  render() {
    if (!this.state.authServiceInitialized) {
      return this.renderInitializingAuthService();
    }
    return this.renderRouter();
  }

  renderInitializingAuthService() {
    return (
      <div style={{height: '100vh'}}>
        <LoadingContainer loading/>
      </div>
    );
  }

  renderRouter() {
    return (
      <AppRouter/>
    );
  }
}

const AppRouter = () => (
  <Switch>
    {/* private routes */}
    <PrivateRoute path={PROJECTS_PATH} component={Projects}/>
    <PrivateRoute path={WORKFLOWS_PATH} component={Workflows}/>

    {/* only public routes */}
    <NotLoggedInRoute path={LOGIN_PATH} component={Login}/>

    {/* private or public routes */}
    <Route path={PUBLIC_WORKFLOWS_PATH} component={PublicWorkflows}/>

    <Route path="/semplice" component={() => <p>ok</p>}/>

    {/* default */}
    <Route render={() => (<Redirect to={PROJECTS_PATH}/>)}/>
  </Switch>
);

const PrivateRoute = ({path, component: Component}) => (
  <Route path={path}
         render={() => AuthService.isSignedIn() ?
           <Component/> :
           <Redirect to={LOGIN_PATH}/>
         }/>
);


const NotLoggedInRoute = ({path, component: Component}) => (
  <Route path={path}
         render={() => AuthService.isSignedIn() ?
           <Redirect to={PROJECTS_PATH}/> :
           <Component/>
         }/>
);


