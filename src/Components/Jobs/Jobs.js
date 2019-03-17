import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import {JobsList} from "./JobsList/JobsList";
import CreateJob from "./CreateJob/CreateJob";
import ViewJob from "./ViewJob/ViewJob";

export class Jobs extends Component {


  constructor(props) {
    super(props);
    this.match = props.match;
  }

  render() {
    return (
      <Container>
        <Row>
          <Switch>
            <Route exact path={`${this.match.path}`} component={JobsList}/>
            <Route path={`${this.match.path}/new`} component={CreateJob}/>
            <Route exact path={`${this.match.path}/:id/edit`} component={EditJob}/>
            <Route path={`${this.match.path}/:id`} component={ViewJob}/>
          </Switch>
        </Row>
      </Container>
    );
  }
}