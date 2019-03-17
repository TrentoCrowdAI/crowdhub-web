import React from 'react';
import {Route, Switch} from "react-router-dom";
import {JobsList} from "./JobsList/JobsList";
import CreateJob from "./CreateJob/CreateJob";
import ViewJob from "./ViewJob/ViewJob";
import EditJob from "./EditJob/EditJob";

export const Jobs = () => (
  <Switch>
    <Route path="/jobs" exact component={JobsList}/>
    <Route path="/jobs/new" component={CreateJob}/>
    <Route path="/jobs/:id/edit" exact component={EditJob}/>
    <Route path="/jobs/:id" component={ViewJob}/>
  </Switch>
);
