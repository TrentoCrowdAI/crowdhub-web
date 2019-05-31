import React, {Component} from 'react';
import {Alert, Button, Col, Modal, Row} from "react-bootstrap";

import WorkflowsService from "../../../../Services/rest/WorkflowsService";
import './CreateWorkflow.css';
import WorkflowForm from "./WorkflowForm";


export class CreateWorkflowButton extends Component {

  state = {showModal: false};

  showCreateWorkflowModal = () => this.setState({showModal: true});

  onWorkflowCreated = () => {
    this.hideCreateWorkflowModal();
    this.props.onWorkflowCreated();
  };

  hideCreateWorkflowModal = () => this.setState({showModal: false});

  render() {
    return (
      <div>
        <CreateWorkflowModal show={this.state.showModal} onCancel={this.hideCreateWorkflowModal}
                             projectId={this.props.projectId} onWorkflowCreated={this.onWorkflowCreated}/>

        <Button onClick={this.showCreateWorkflowModal}>Add workflow</Button>
      </div>
    );
  }
}


export class CreateWorkflowModal extends Component {

  state = {
    creationError: false
  };

  createNewWorkflow = async (workflow, {setSubmitting}) => {
    setSubmitting(true);

    try {
      await WorkflowsService.createWorkflow({
        ...workflow,
        projectId: this.props.projectId
      });
      this.onWorkflowCreated();
    } catch (e) {
      this.onWorkflowCreationError();
    }

    setSubmitting(false);
  };

  onWorkflowCreated = () => this.props.onWorkflowCreated();

  onWorkflowCreationError = () => this.setState({creationError: true});

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>Create new workflow</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            this.state.creationError &&
            <CreateWorkflowError/>
          }


          <WorkflowForm
            onCancel={this.props.onCancel}
            onSubmit={this.createNewWorkflow}/>
        </Modal.Body>
      </Modal>
    );
  }
}


export const CreateWorkflowError = () => (
  <Row>
    <Col>
      <Alert variant="danger">
        There's been an error while creating the new workflow.
      </Alert>
    </Col>
  </Row>
);

