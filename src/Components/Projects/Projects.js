import React from 'react';
import {Route, Switch} from "react-router-dom";
import {ProjectsList} from "./ProjectsList/ProjectsList";
import CreateProject from "./CreateProject/CreateProject";
import ProjectView from "./ProjectView/ProjectView";
import EditProject from "./EditProject/EditProject";

export const PROJECTS_PATH = "/projects";

export const Projects = () => (
  <Switch>
    <Route path={`${PROJECTS_PATH}`} exact component={ProjectsList}/>
    <Route path={`${PROJECTS_PATH}/new`} component={CreateProject}/>
    <Route path={`${PROJECTS_PATH}/:id/edit`} exact component={EditProject}/>
    <Route path={`${PROJECTS_PATH}/:id`} component={ProjectView}/>
  </Switch>
);
