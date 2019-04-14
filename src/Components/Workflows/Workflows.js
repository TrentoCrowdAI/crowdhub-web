import React from "react";
import {Route, Switch} from "react-router-dom";
import WorkflowDashboard from "./WorkflowDashboard/WorkflowDashboard";


export const WORKFLOWS_PATH = "/workflows";


export default () => (
  <Switch>
    <Route path={`${WORKFLOWS_PATH}/:id`} exact component={WorkflowDashboard}/>
  </Switch>
);
