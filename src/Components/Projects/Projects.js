import React from 'react';
import {Route, Switch} from "react-router-dom";
import {JobsList} from "./ProjectsList/ProjectsList";
import CreateProject from "./CreateProject/CreateProject";
import ViewJob from "./ViewProject/ViewJob";
import EditProject from "./EditProject/EditProject";

export const PROJECTS_PATH = "/projects";

export const Projects = () => (
  <Switch>
    <Route path={`${PROJECTS_PATH}`} exact component={JobsList}/>
    <Route path={`${PROJECTS_PATH}/new`} component={CreateProject}/>
    <Route path={`${PROJECTS_PATH}/:id/edit`} exact component={EditProject}/>
    <Route path={`${PROJECTS_PATH}/:id`} component={ViewJob}/>
  </Switch>
);
