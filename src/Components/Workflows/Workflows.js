import React from "react";
import {Route, Switch} from "react-router-dom";
import EditableWorkflowDashboard from "./WorkflowDashboard/EditableWorkflowDashboard";
import ReadOnlyWorkflowDashboard from "./WorkflowDashboard/ReadOnlyWorkflowDashboard";


export const WORKFLOWS_PATH = "/workflows";
export const PUBLIC_WORKFLOWS_PATH = "/public-workflows";


export const Workflows = () => (
  <Switch>
    <Route path={`${WORKFLOWS_PATH}/:id`} exact component={EditableWorkflowDashboard}/>
  </Switch>
);

export const PublicWorkflows = () => (
  <Switch>
    <Route path={`${PUBLIC_WORKFLOWS_PATH}/:id`} exact component={ReadOnlyWorkflowDashboard}/>
  </Switch>
);

