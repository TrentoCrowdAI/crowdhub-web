import React, {Component} from 'react';
import {Container, Row, Col, Breadcrumb, Form} from "react-bootstrap";

import './WorkflowEditor.css';
import {makeCancellable} from "../../../../Services/utils";
import ProjectsService from "../../../../Services/ProjectsService";
import {LinkBreadcrumb, SimpleBreadcrumb} from "../../../common/Breadcrumbs";
import {PROJECTS_PATH} from "../../../Projects/Projects";
import WorkflowGraphEditor from "./WorkflowGraphEditor";
import WorkflowTools from "./WorkflowTools";

export default class WorkflowEditor extends Component {

  state = {
    selectedNode: null
  };

  render() {
    return (
      <Container className="full-width" style={{'flex': 1, 'marginTop': '-1em'}}>
        <Row className="full-height">
          <Col xs={2} className="light-background">
            <WorkflowTools tools={this.props.tools}/>
          </Col>

          <Col xs={7} style={{'position': 'relative'}}>
            {/*<WorkflowBreadcrumb/>*/}
            <WorkflowGraphEditor onBlockSelected={console.log}
                                 onNoBlockSelected={console.log} />
          </Col>

          <Col xs={3} className="light-background">
            {
              this.state.selectedNode ?
                <WorkflowNodeProperties/> :
                <WorkflowProperties/>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}


const WorkflowBreadcrumb = () => (
  <Breadcrumb>
    <LinkBreadcrumb to={PROJECTS_PATH}>Projects</LinkBreadcrumb>
    <SimpleBreadcrumb>Hello world</SimpleBreadcrumb>
    <SimpleBreadcrumb>Workflows</SimpleBreadcrumb>
    <SimpleBreadcrumb>First</SimpleBreadcrumb>
  </Breadcrumb>
);

const WorkflowNodeProperties = () => (
  <p>Node Properties</p>
);
const WorkflowProperties = () => (
  <p>Properties</p>
);
