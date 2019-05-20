import React, {Component} from 'react';
import {Alert, Col, Container, Row} from "react-bootstrap";

import {makeCancellable} from "../../../Services/rest/utils";
import WorkflowsService from "../../../Services/rest/WorkflowsService";
import {CreateWorkflowButton} from "./CreateWorkflow/CreateWorkflow";
import {WorkflowsTable} from "./WorkflowsTable";
import LoadingContainer from "../../common/LoadingContainer";

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
      const promise = WorkflowsService.getWorkflowsOfProject(this.props.project);
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
        <Row className="header-row">
          <Col><h3>Workflows</h3></Col>
          <Col className="d-flex flex-row-reverse">
            <div>
              <CreateWorkflowButton projectId={this.state.projectId} onWorkflowCreated={this.onWorkflowCreated}/>
            </div>
          </Col>
        </Row>

        <LoadingContainer loading={!this.state.workflows && !this.state.fetchError}>
          <Row>
            <Col>
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
        </LoadingContainer>
      </Container>
    );
  }
}

export const FetchingWorkflowsError = () => (
  <Col>
    <Container>
      <Alert variant="danger">
        There's been an error while fetching the workflows of the project
      </Alert>
    </Container>
  </Col>
);
