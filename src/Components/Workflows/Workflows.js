import React from "react";
import {Route, Switch} from "react-router-dom";
import EditWorkflowPage from "./WorkflowDashboard/EditWorkflowPage";


export const WORKFLOWS_PATH = "/workflows";


export default () => (
  <Switch>
    <Route path={`${WORKFLOWS_PATH}/:id`} exact component={EditWorkflowPage}/>
  </Switch>
);
