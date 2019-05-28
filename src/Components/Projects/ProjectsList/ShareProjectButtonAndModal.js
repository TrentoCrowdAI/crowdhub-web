/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {ignoreEventAnd} from "../../utils/events";
import {Modal} from "react-bootstrap";

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
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>Sharing preferences of project ...</Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}
