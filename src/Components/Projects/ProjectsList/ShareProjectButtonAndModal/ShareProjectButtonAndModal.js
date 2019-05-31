/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";

import {ignoreEventAnd} from "../../../utils/events";
import AddNewCollaboration from "./AddNewCollaboration";
import LoadingContainer from "../../../common/LoadingContainer";
import ProjectCollaborationsService from "../../../../Services/rest/ProjectCollaborationsService";
import CollaborationsList from "./CollaborationsList";
import "./ShareProjectButtonAndModal.css";

export default class ShareProjectButtonAndModal extends Component {

  state = {
    show: false
  };

  onShowModal = () => this.setState({show: true});

  onCloseModal = () => this.setState({show: false});

  render() {
    return (
      <span>
        <ShareProjectModal show={this.state.show}
                           onClose={this.onCloseModal}
                           {...this.props}/>

          <a className="icon-button" onClick={ignoreEventAnd(this.onShowModal)}>
          <i className="fas fa-share-alt"/>
        </a>
      </span>
    );
  }
}


class ShareProjectModal extends Component {

  state = {
    collaborations: null,
    isFetching: false,
    fetchError: false
  };

  componentDidMount = () => this.fetchCollaborations();

  fetchCollaborations = async () => {
    this.setState({collaborations: null, isFetching: true, fetchError: false});
    try {
      const collaborations = await ProjectCollaborationsService.getCollaborationsOfProject(this.getProject().id);
      this.setState({collaborations});
    } catch (e) {
      this.setState({fetchError: true});
    }
    this.setState({isFetching: false});
  };

  getProject = () => this.props.project;

  onClose = () => this.props.onClose();

  onCollaborationAdded = (collaboration) => this.setState({collaborations: [...this.state.collaborations, collaboration]});

  onCollaborationDeleted = (id) => {
    const {collaborations} = this.state;
    const index = collaborations.findIndex(collaboration => collaboration.id === id);
    if(index >= 0) {
      collaborations.splice(index, 1);
      this.setState({collaborations});
    }
  };

  render() {
    const {fetchError, collaborations, isFetching} = this.state;
    const project = this.getProject();
    return (
      <Modal show={this.props.show}>
        <Modal.Header>Sharing preferences of project #{project.id}</Modal.Header>
        <Modal.Body>
          <LoadingContainer loading={isFetching}>
            {
              fetchError &&
              <Alert variant="danger">
                An error occurred while fetching the sharing preferences.
              </Alert>
            }

            <AddNewCollaboration collaborations={collaborations}
                                 project={project}
                                 onCollaborationAdded={this.onCollaborationAdded}/>
            <CollaborationsList collaborations={collaborations}
                                onCollaborationDeleted={this.onCollaborationDeleted}/>
          </LoadingContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
