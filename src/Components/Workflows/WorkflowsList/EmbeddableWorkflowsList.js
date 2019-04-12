import React, {Component} from 'react';
import {Alert, Col, Container, Row, Table} from "react-bootstrap";

import {makeCancellable} from "../../../Services/utils";
import WorkflowsService from "../../../Services/WorkflowsService";
import {CreateWorkflowButton} from "./CreateWorkflow";

export default class EmbeddableWorkflowsList extends Component {


  constructor(props) {
    super(props);
    this.state = {
      projectId: props.project.id
    };
  }

  componentDidMount = () => this.fetchWorkflows();

  componentWillUnmount = () => this.pendingWorkflowsRequest.cancel();


  async fetchWorkflows() {
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
  }

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
              <WorkflowsTable workflows={this.state.workflows}/>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}


const FetchingWorkflows = () => <p>Fetching workflows...</p>;

const FetchingWorkflowsError = ({workflows}) => (
  <Col>
    <Container>
      <Alert variant="danger">
        There's been an error while fetching the workflows of the project
      </Alert>
    </Container>
  </Col>
);

const WorkflowsTable = ({workflows}) => (
  <Table hover>
    <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    {
      workflows.map(workflow => (
        <WorkflowsTableRow workflow={workflow} key={workflow.id}/>
      ))
    }
    </tbody>
  </Table>
);

const WorkflowsTableRow = ({workflow}) => (
  <tr>
    <td>{workflow.id}</td>
    <td>{workflow.data.name}</td>
    <td>{workflow.data.description}</td>
    <td></td>
  </tr>
);
