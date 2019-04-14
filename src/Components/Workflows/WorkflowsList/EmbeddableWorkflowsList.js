/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Alert, Col, Container, Row, Table} from "react-bootstrap";

import {makeCancellable} from "../../../Services/utils";
import WorkflowsService from "../../../Services/WorkflowsService";
import {CreateWorkflowButton} from "./CreateWorkflow/CreateWorkflow";
import {WorkflowsTable} from "./WorkflowsTable";

export default class EmbeddableWorkflowsList extends Component {


  constructor(props) {
    super(props);
    this.state = {
      projectId: props.project.id
    };
  }

  componentDidMount = () => this.fetchWorkflows();

  componentWillUnmount = () => this.pendingWorkflowsRequest.cancel();

  fetchWorkflows = async () => {
    this.setState({workflows: null});

    try {
      const promise = WorkflowsService.getWorkflowsOfProject(this.state.projectId);
      this.pendingWorkflowsRequest = makeCancellable(promise);
      const workflows = await this.pendingWorkflowsRequest.result;

      this.setState({workflows});
    } catch (e) {
      this.setState({
        workflows: null,
        fetchError: true
      });
    }
  };

  onWorkflowCreated = () => this.fetchWorkflows();

  render() {
    return (
      <Container>
        <Row>
          <Col><h5>Workflows</h5></Col>
          <Col className="d-flex flex-row-reverse">
            <div>
              <CreateWorkflowButton projectId={this.state.projectId} onWorkflowCreated={this.onWorkflowCreated}/>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {
              !this.state.workflows &&
              <FetchingWorkflows/>
            }

            {
              this.state.fetchError &&
              <FetchingWorkflowsError/>
            }

            {
              this.state.workflows &&
              <WorkflowsTable workflows={this.state.workflows}
                              onWorkflowDeleted={this.fetchWorkflows}/>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}


const FetchingWorkflows = () => <p>Fetching workflows...</p>;

const FetchingWorkflowsError = () => (
  <Col>
    <Container>
      <Alert variant="danger">
        There's been an error while fetching the workflows of the project
      </Alert>
    </Container>
  </Col>
);
