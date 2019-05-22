import React, {Component} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Editor} from "@tinymce/tinymce-react";

import {ignoreEventAnd} from "../../../../../../utils/events";
import RandomColorPicker from "./RandomColorPicker";
import {isBlockingContextValid} from "../../../WorkflowGraphEditor/models/BlockingContextsModel";

export class EditBlockingContextModalAndButton extends Component {

  state = {
    show: false
  };

  onShowModal = () => this.setState({show: true});

  onCloseModal = () => this.setState({show: false});

  render() {
    return (
      <span>
        <EditBlockingContextModal show={this.state.show}
                                  onClose={this.onCloseModal}
                                  context={this.props.context}
                                  onModelUpdate={this.props.onModelUpdate}/>

        <a className="icon-button" onClick={ignoreEventAnd(this.onShowModal)}>
          <i className="fas fa-edit"/>
        </a>
      </span>
    );
  }
}


class EditBlockingContextModal extends Component {

  state = {
    name: null,
    color: null,
    workerBlockedMessage: null
  };

  componentDidMount() {
    this.resetInputFields();
  }

  resetInputFields = () => this.setState({...this.props.context});

  onSave = () => {
    this.updatePropsContext();
    this.props.onClose();
  };

  updatePropsContext = () => {
    const {name, color, workerBlockedMessage} = this.state;
    const context = this.props.context;
    context.name = name;
    context.color = color;
    context.workerBlockedMessage = workerBlockedMessage;
    this.props.onModelUpdate();
  };

  onCancel = () => {
    this.resetInputFields();
    this.props.onClose();
  };

  onNameChange = (e) => this.setState({name: e.target.value});

  onColorChange = (color) => this.setState({color});

  onWorkerBlockedMessageChange = (workerBlockedMessage) => {
    this.setState({workerBlockedMessage});
  };

  getBlockingContextFromState = () => ({...this.state});

  render() {
    const {name, color, workerBlockedMessage} = this.state;
    // TODO: Handle disabled state
    return (
      <Modal show={this.props.show} size="xl">
        <Modal.Header>
          Blocking context editor
        </Modal.Header>

        <Modal.Body>
          <Form.Row>
            <Col xs="12" sm="9">
              <Form.Group>
                <Form.Control name="name"
                              type="text"
                              placeholder="Blocking context name"
                              value={name}
                              onChange={this.onNameChange}/>
              </Form.Group>
            </Col>
            <Col xs="12" sm="3">
              <RandomColorPicker color={color} onChange={this.onColorChange}/>
            </Col>
          </Form.Row>
          <Row>
            <Col>
              <Editor onEditorChange={this.onWorkerBlockedMessageChange}
                      initialValue={workerBlockedMessage}
                      init={{menubar: false}}/>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
          <Button className="confirm"
                  onClick={this.onSave}
                  disabled={!isBlockingContextValid(this.getBlockingContextFromState())}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  };

}
