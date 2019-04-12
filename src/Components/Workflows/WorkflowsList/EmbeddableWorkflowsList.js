import React, {Component} from 'react';
import {Container, Col, Row, Button, Alert, Table} from "react-bootstrap";

import {makeCancellable} from "../../../Services/utils";
import WorkflowsService from "../../../Services/WorkflowsService";

export default class EmbeddableWorkflowsList extends Component {


  constructor(props) {
    super(props);
    this.state = {};
    this.projectId = props.project.id;
  }

  componentDidMount = () => this.fetchWorkflows();

  componentWillUnmount = () => this.pendingWorkflowsRequest.cancel();


  async fetchWorkflows() {
    try {
      const promise = WorkflowsService.getWorkflowsOfProject(this.projectId);
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

  render() {
    return (
      <Container>
        <Row>
          <Col><h5>Workflows</h5></Col>
          <Col className="d-flex flex-row-reverse">
            <div>
              <Button>Add workflow</Button>
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
