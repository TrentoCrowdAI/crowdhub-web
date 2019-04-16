/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import {ignoreEventAnd} from "../utils/events";


export class DeleteButtonAndModal extends Component {

  state = {
    show: false
  };

  onShowModal = () => this.setState({show: true});

  onCloseModal = () => this.setState({show: false});

  render() {
    return (
      <span>
        <DeleteModal show={this.state.show} onCancel={this.onCloseModal} {...this.props}/>

        <a className="icon-button delete" onClick={ignoreEventAnd(this.onShowModal)}>
          <i className="fas fa-trash-alt"/>
        </a>
      </span>
    );
  }
}

export class DeleteModal extends Component {

  state = {
    deleting: false,
    deleteError: false
  };

  onCancel = () => this.props.onCancel();

  onConfirmDeletion = async () => {
    this.onDeleting();
    try {
      await this.props.serviceCall();
      this.onDeleted();
    } catch (e) {
      this.onDeleteError();
    }
  };

  onDeleting = () => this.setState({
    deleting: true,
    deleteError: false
  });

  onDeleteError = () => this.setState({
    deleting: false,
    deleteError: true
  });

  onDeleted = () => {
    this.setState({
      deleting: false,
      deleteError: false
    });
    this.props.onDeleted();
  };

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          {this.props.header}
        </Modal.Header>

        <Modal.Body>
          {
            /* Deletion error */
            this.state.deleteError &&
            <Alert variant="danger">
              There's been an error with the deleting request.
            </Alert>
          }

          {this.props.body}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.onCancel} disabled={this.state.deleting}>Cancel</Button>
          <Button variant="danger" className="confirm" onClick={this.onConfirmDeletion} disabled={this.state.deleting}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
