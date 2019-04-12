import React, {Component} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import WorkflowsService from "../../../Services/WorkflowsService";

export default class DeleteWorkflowModal extends Component {

  state = {};

  onDeleteWorkflow = async () => {
    this.onDeleting();

    try {
      await WorkflowsService.deleteWorkflow(this.props.workflowToDelete);
      this.onDeleted()
    } catch (e) {
      this.onDeleteFailed();
    }

    this.onDeleteCompletedOrFailed();
  };

  onDeleting = () => this.setState({deleting: true});

  onDeleted = () => this.props.onWorkflowDeleted();

  onDeleteFailed = () => this.setState({deleteError: true});

  onDeleteCompletedOrFailed = () => this.setState({deleting: false});

  render() {
    const {show, workflowToDelete, onCancel} = this.props;

    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Delete worflow <span className="project-id">{show && workflowToDelete.name}</span></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            this.state.deleteError &&
            <DeleteWorkflowError/>
          }

          Are you sure you want to delete "<strong>{show && workflowToDelete.data.name}</strong>"?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel} disabled={this.state.deleting}>Cancel</Button>
          <Button variant="danger" onClick={this.onDeleteWorkflow} disabled={this.state.deleting}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


const DeleteWorkflowError = () => (
  <Alert variant="danger">
    There's been an error while deleting the workflow
  </Alert>
);
