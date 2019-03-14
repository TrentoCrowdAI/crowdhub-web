import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {Container, Row} from "react-bootstrap";
import {JobsList} from "./JobsList";
import {JobForm} from "./JobForm";

export class Jobs extends Component {


  constructor(props) {
    super(props);
    this.match = props.match;
  }

  render() {
    return (
      <Container>
        <h1>Jobs</h1>

        <Row>
          <Switch>
            <Route exact path={`${this.match.path}`} component={JobsList}/>
            <Route path={`${this.match.path}/new`} component={JobForm}/>
          </Switch>
        </Row>
      </Container>
    );
  }
}