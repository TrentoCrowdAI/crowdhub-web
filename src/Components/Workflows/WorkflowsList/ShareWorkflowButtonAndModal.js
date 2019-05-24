/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from "react";
import {Alert, Button, Modal, Form} from "react-bootstrap";

import {ignoreEventAnd} from "../../utils/events";
import LoadingButton from "../../common/LoadingButton";
import LoadingContainer from "../../common/LoadingContainer";
import WorkflowsService from "../../../Services/rest/WorkflowsService";
import "./ShareWorkflowButtonAndModal.css";

export class ShareWorkflowButtonAndModal extends Component {

  state = {
    show: false
  };

  onShowModal = () => this.setState({show: true});

  onCloseModal = () => this.setState({show: false});

  render() {
    return (
      <span>
        <ShareModal show={this.state.show} onClose={this.onCloseModal} {...this.props}/>

        <a className="icon-button" onClick={ignoreEventAnd(this.onShowModal)}>
          <i className="fas fa-share-alt"/>
        </a>
      </span>
    );
  }
}

export class ShareModal extends Component {

  state = {
    workflow: null,

    isFetching: false,
    fetchError: false,

    isSaving: false,
    saveError: false
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.show && !prevProps.show) {
      this.fetchWorkflow();
    }
  }

  fetchWorkflow = async () => {
    try {
      this.setState({isFetching: true, fetchError: false});
      const workflow = await WorkflowsService.getWorkflow(this.getWorkflowId());
      this.setState({isFetching: false, fetchError: false, workflow});
    } catch (e) {
      this.setState({isFetching: false, fetchError: true});
    }
  };

  getWorkflowId = () => this.props.workflow.id;

  shareWorkflow = () => this.setState({workflow: {...this.state.workflow, shared: true}});

  unshareWorkflow = () => this.setState({workflow: {...this.state.workflow, shared: false}});

  onCancel = () => this.props.onCloseModal();

  onSave = async () => {
    try {
      this.setState({isSaving: true, saveError: false});
      await WorkflowsService.updateWorkflow(this.state.workflow);
      this.setState({isSaving: false, saveError: false});
      this.props.onClose();
    } catch (e) {
      this.setState({isSaving: false, saveError: true});
    }
  };

  render() {
    const {isFetching, fetchError, isSaving, saveError, workflow} = this.state;
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          Sharing preferences of workflow #{this.getWorkflowId()}
        </Modal.Header>

        <Modal.Body>
          <LoadingContainer loading={isFetching}>
            {
              fetchError &&
              <Alert variant="danger">
                An error occurred while fetching the sharing preferences.
              </Alert>
            }

            {
              saveError &&
              <Alert variant="danger">
                An error occurred while saving the sharing preferences.
              </Alert>
            }

            {
              workflow &&
              <SharingPreferenceControl shared={!!workflow.shared}
                                        shareWorkflow={this.shareWorkflow}
                                        unshareWorkflow={this.unshareWorkflow}/>
            }
          </LoadingContainer>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.onCancel} disabled={isSaving}>Cancel</Button>
          <LoadingButton onClick={this.onSave} disabled={isFetching} isSaving={isSaving}>Save</LoadingButton>
        </Modal.Footer>
      </Modal>
    );
  }
}


const SharingPreferenceControl = ({shared, shareWorkflow, unshareWorkflow}) => (
  <div>
    <Form.Group>
      <Form.Check
        checked={!shared}
        type="radio"
        label="Private Workflow"
        onChange={unshareWorkflow}
      />
      <span className="description-of-radio">Workflow visible and editable only by the owner and collaborators</span>
    </Form.Group>

    <Form.Group>
      <Form.Check
        checked={shared}
        type="radio"
        label="Public Workflow"
        onChange={shareWorkflow}
      />
      <span
        className="description-of-radio">Workflow visible by anyone and editable only by the owner and collaborators</span>
    </Form.Group>
  </div>
);
