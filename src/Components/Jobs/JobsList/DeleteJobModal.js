import {Button, Modal} from "react-bootstrap";
import React, {Component} from 'react';
import {closeAndAfterAnimation} from "../utils/modal";

export default class DeleteJobModal extends Component {
  state = {
    show: true
  };

  onCancelPressed = closeAndAfterAnimation(this, () => this.props.onCancel());
  onConfirmPressed = closeAndAfterAnimation(this, () => this.props.onConfirmDeletion());

  render() {
    const job = this.props.jobToDelete;

    return (
      <Modal show={this.state.show}>
        <Modal.Header>
          <Modal.Title>Delete job <span className="job-id">#{job.id}</span></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete "<strong>{job.data.name}</strong>"?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.onCancelPressed}>Cancel</Button>
          <Button variant="danger" onClick={this.onConfirmPressed}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
