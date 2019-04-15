import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {Projects, PROJECTS_PATH} from "./Projects/Projects";
import Workflows, {WORKFLOWS_PATH} from "./Workflows/Workflows";

export default () => (
  <Switch>
    <Route path={`${PROJECTS_PATH}`} component={Projects}/>
    <Route path={`${WORKFLOWS_PATH}`} component={Workflows}/>

    {/* default */}
    <Route render={() => (<Redirect to={`${PROJECTS_PATH}`}/>)}/>
  </Switch>
);
